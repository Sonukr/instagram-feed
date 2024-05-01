import React from 'react';
import { StoryListProps } from '../types/types';
import './styles.css';

const StoryLists: React.FC<StoryListProps> = ({ stories, onStoryClick }) => {
  return (
    <div className='story-list-wrapper'>
      <div className="story-list">
        {stories.map((story) => (
          <div key={story.id} className="story-item" onClick={() => onStoryClick(story)}>
            {story.type === 'image' ?
              <img src={story.url} alt="" /> :
              <video src={story.url}></video>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryLists;
