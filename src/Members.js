import React, { useEffect, useState, useMemo } from 'react';
import StatGraph from './Stats';
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
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/members/get/all');
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
          const initialLikes = {};
          data.forEach(member => {
            initialLikes[member.id] = member.likes || 0;
          });
          setDbLikes(initialLikes);
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

  const syncLikesToDatabase = async (memberId, count) => {
    if (count < 1) return;
    console.log(memberId, count);

    try {
      const response = await fetch(`/api/members/${memberId}/like`, {
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

  if (loading) {
    return <p> loading... </p>
  }
  return (
    <div>
      <h2>Member List</h2>
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