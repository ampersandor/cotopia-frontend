import React, { useEffect, useState, useMemo } from 'react';
import StatGraph from './StatGraph';
import './Members.css';



const MemberList = () => {

  const [members, setMembers] = useState([]);
  const memoizedMembers = useMemo(() => members, [members]);

  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [dbLikes, setDbLikes] = useState({});
  const [storageLikes, setStorageLikes] = useState(() => {
    const saved = localStorage.getItem("pending_likes");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("pending_likes", JSON.stringify(storageLikes));
  }, [storageLikes]);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/members/like/subscribe');
    
    eventSource.addEventListener('like-update', event => {
      const likeCounts = JSON.parse(event.data);
      setDbLikes(likeCounts);
    });

    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []); 

  useEffect(() => {
    const fetchMembers = async () => {
      console.log("fetchMembers called")
      try {
        const response = await fetch('/api/members/get/all');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          console.error('Failed to fetch members');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchMemberLikes = async () => {
      console.log("call fetchMemberLikes")
      try {
        const memberIds = members.map(member => member.id); // Extract member IDs
        const response = await fetch('/api/members/like/count', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memberIds), // Assuming 'members' is an array of member IDs
        });

  
        if (!response.ok) {
          throw new Error('Failed to fetch like counts');
        }
  
        const data = await response.json();
        // const initialLikes = {};
        // data.forEach(memberLike => {
        //   initialLikes[memberLike.memberId] = memberLike.count || 0;
        // });
        setDbLikes(data);
        console.log(data); // Process like counts as needed
      } catch (error) {
        console.error('Error fetching like counts:', error);
      }
    };
  
    if (members && members.length > 0) {
      fetchMemberLikes();
    }
  }, [members]);

  const syncLikesToDatabase = async (memberId, count) => {
    if (count < 1) return;
    console.log("syncLikesToDatabase")

    try {
      const response = await fetch(`/api/members/like/${memberId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: count })
      });

      if (response.ok) {
        setStorageLikes(prev => ({
          ...prev,
          [memberId]: (prev[memberId] || 0) - count
        }));
      } else {
        console.error('Failed to sync likes');
      }
    } catch (error) {
      console.error('Error syncing likes:', error);
    } finally {
      setPending(false);
    }
  };
  // Use useEffect to watch for `pending` changes and run syncLikesToDatabase
  useEffect(() => {
    // Only call syncLikesToDatabase if pending is true
    if (pending) {
      const memberId = Object.keys(storageLikes).find(id => storageLikes[id] > 0);
      if (memberId) {
        syncLikesToDatabase(memberId, storageLikes[memberId]);
      }
    }
  }, [pending, storageLikes]); // Run effect when `pending` or `storageLikes` change


  const handleLike = (memberId) => {
    setStorageLikes(prev => ({
      ...prev,
      [memberId]: (prev[memberId] || 0) + 1
    }));

    setDbLikes(prev => ({
      ...prev,
      [memberId]: (prev[memberId] || 0) + 1
    }));

    if (!pending) {
      setPending(true);
      // syncLikesToDatabase(memberId, (storageLikes[memberId] || 0) + 1);
    }
  };

  const handleUpdateStats = async () => {
    console.log("Updating stats for all members");

    const memberIds = members.map(member => member.id);
    try {
      const response = await fetch('/api/stats/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberIds),
      });

      if (response.ok) {
        console.log("Stats updated successfully");
      } else {
        console.error("Failed to update stats");
      }
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };


  if (loading) {
    return <p> loading... </p>
  }
  return (
    <div>
      <h2>Member List</h2>
      <button onClick={handleUpdateStats} className="update-stats-button">
        Update Stats
      </button>
      {members.length > 0 && <div className="graph-container"><StatGraph members={memoizedMembers} /></div>}
      <ul>
        {members.map(member => (
          <div key={member.id}>
            <li>
              {member.name} ({member.username})
              <button 
                onClick={() => handleLike(member.id)}
                className="like-button"
              >
                👍
              </button>
              <span>
                {dbLikes[member.id] || 0} likes 
                {storageLikes[member.id] > 0 && ` (+${storageLikes[member.id]} pending)`}
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;