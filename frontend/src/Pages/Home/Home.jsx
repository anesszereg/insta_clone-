import React from 'react';
import './Home.css';
import avatar1 from '../../assets/humain.jpg'
import avatar from '../../assets/avatar.jpg'
import nature from '../../assets/nature.jpg'
import nature1 from '../../assets/nature1.jpg'
import { useSelector } from 'react-redux';



function Home() {
  const posts = [
    {
      username: 'john_doe',
      imageUrl: nature,
      caption: 'Loving the view!',
      avatarUrl: avatar1,
    },
    {
      username: 'jane_doe',
      imageUrl: nature1,
      caption: 'Best vacation ever!',
      avatarUrl: avatar,
    },

  ];

    const user = useSelector((state) => state.user.user);
    console.log('this is me ' , user);

  return (



    
    <div className="feed-container">
      <header className="header">
        <div className="header-left">
          <h1 className="header-logo">Instagram</h1>
        </div>
        <div className="header-right">

          <p>{user.fullname}</p>
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="header-profile-pic"
          />
        </div>
      </header>

      <div className="feed">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="post-header">
              <img
                src={post.avatarUrl}
                alt={post.username}
                className="post-avatar"
              />
              <h2 className="post-username">{post.username}</h2>
            </div>
            <img src={post.imageUrl} alt="Post" className="post-image" />
            <p className="post-caption">
              <strong>{post.username}</strong> {post.caption}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Home;
