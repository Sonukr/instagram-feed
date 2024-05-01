import React from 'react';
import PostItem from './PostItem';
import { PostListProps } from '../types/types';

const PostLists: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  );
};

export default PostLists;
