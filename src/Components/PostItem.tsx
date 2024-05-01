import React from 'react';
import { PostProps } from '../types/types';


const PostItem: React.FC<PostProps> = ({post}) => {
  const { id, url, userId, username, duration, type } = post;

  return (
    <div className="post-item">
      
      <div className="post-info">
        <span>Post By - {username}</span>
        <span>{duration}</span>
      </div>
      <div className='post-imageWrapper'>
        {/* Display post content (title, image, etc.) based on type */}
        {type === 'image' && <img src={url} alt={username + ' post'} />}
        {type === 'video' && <video src={url} controls />}
      </div>
    </div>
  );
};

export default PostItem;
