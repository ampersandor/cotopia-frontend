import React, { useState } from 'react';

function SignUpForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/members/create/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username }),
      });
      if (response.ok) {
        setMessage('Sign-up successful!');
        // 입력 필드 초기화
        setName('');
        setUsername('');
      } else {
        const errorData = await response.text();
        console.log(errorData)
        setMessage(`Sign-up failed: ${errorData}`);
      }
    } catch (error) {
      setMessage(`Something went wrong, Please try again later.`);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Member Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">LeetCode ID:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;