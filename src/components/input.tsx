import React, { useState } from 'react';

const Input = () => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState<null | {
    username: string;
    bio: string;
    location: string;
    followers: number;
    following: number;
    avatar_url: string;
  }>(null);

  const fetchit = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserInfo({
        username: data.login,
        bio: data.bio || 'No bio available',
        location: data.location || 'No location available',
        followers: data.followers,
        following: data.following,
        avatar_url: data.avatar_url,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setUserInfo(null);
    }
  };

  return (
    <div>
      <div className="input-container">
        <p className="input-heading">Enter GitHub Username: </p>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={fetchit}>Fetch</button>
        <br />
        <br />
      </div>
      <div className="user-info-container">
        <h3 className="user-info-heading">User Info:</h3>
        {userInfo ? (
          <>
            <img src={userInfo.avatar_url} alt="Avatar" className="avatar" />
            <p id="username">Username: {userInfo.username}</p>
            <p id="bio">Bio: {userInfo.bio}</p>
            <p id="location">Location: {userInfo.location}</p>
            <p id="followers">Followers: {userInfo.followers}</p>
            <p id="following">Following: {userInfo.following}</p>
          </>
        ) : (
          <p>No user name entered !!</p>
        )}
      </div>
    </div>
  );
};

export default Input;
