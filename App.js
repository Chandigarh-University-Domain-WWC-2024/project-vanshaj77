// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [hashtag, setHashtag] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/hashtag/${hashtag}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (hashtag) fetchPosts();
  }, [hashtag]);

  return (
    <div>
      <h1>Disaster Management Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Hashtag"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
      />
      <button onClick={fetchPosts}>Search</button>
      <div>
        <h2>Posts</h2>
        {posts.map((post, index) => (
          <div key={index}>
            <p><strong>Location:</strong> {post.location}</p>
            <p><strong>Sentiment:</strong> {post.sentiment}</p>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>Caption:</strong> {post.metadata.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
