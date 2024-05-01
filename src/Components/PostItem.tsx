import React from 'react';
import { PostProps } from '../types/types';
import { Bookmark, CircleUserRound, Heart, MessageCircle, Send } from 'lucide-react';


const PostItem: React.FC<PostProps> = ({ post }) => {
  const { id, url, userId, username, duration, type } = post;

  return (
    <div className="post-item">

      <div className="post-info">
        <CircleUserRound />
        <span>{username}</span>
      </div>
      <div className='post-imageWrapper'>
        {/* Display post content (title, image, etc.) based on type */}
        {type === 'image' && <img src={url} alt={username + ' post'} />}
        {type === 'video' && <video src={url} autoPlay muted />}
      </div>
      <div className="postDetails">
        <div>
          <Heart />
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />

      </div>
    </div>
  );
};

export default PostItem;
