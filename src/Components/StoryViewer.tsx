import React, { useState, useEffect, useRef } from 'react';
import Story from './Story';
import { StoryItemProps, StoryViewerProps } from '../types/types';
import { ChevronLeft, ChevronRight, CircleX } from 'lucide-react';



const StoryViewer: React.FC<StoryViewerProps> = ({ story: currentStory, onClose, stories, setShowUserProfile }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [story, setStory] = useState(currentStory);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    const index=stories.findIndex(item => item.id === currentStory.id)
    setCurrentStoryIndex(index)
  }, [currentStory])

  const handleStoryEnd = () => {
    setIsPlaying(false);
    const nextIndex = (currentStoryIndex + 1) % stories.length;
    if(nextIndex === 0) {
      
      onClose && onClose();
    }else{
      handleStoryOpen(stories[nextIndex])
      
    }
    // onClose && onClose(() => handleStoryOpen(stories[nextIndex]));
  };

  const handleStoryOpen = (story: StoryItemProps) => {
    const index=stories.findIndex(item => item.id === story.id)
    setCurrentStoryIndex(index);
    setStory(story);
    setIsPlaying(true);
  };

  const handlePreviousStory = () => {
    const prevIndex = currentStoryIndex === 0 ? stories.length - 1 : currentStoryIndex - 1;
    if(prevIndex === stories.length - 1){
      onClose&& onClose();
    }else{
      handleStoryOpen(stories[prevIndex])
    }
  };

  const handleNextStory = () => {
    const nextIndex = currentStoryIndex === stories.length ? stories.length - 1 : currentStoryIndex + 1;
    if(nextIndex === 0){
      onClose&& onClose();
    }else{
      handleStoryOpen(stories[nextIndex])
    }
  };

  const handleCloseViewer = () => {
    onClose && onClose(); 
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose && onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

 

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      videoRef.current?.pause();
    }else{
      videoRef.current?.play();
    }
  }
  return (
    <div className="story-viewer" 
    // onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}
    >
      <Story
        story={story}
        isPlaying={isPlaying}
        onStoryEnd={handleStoryEnd}
        handlePlayPause={handlePlayPause}
        videoRef={videoRef}
      />
      
      <div className="previous-button" onClick={handlePreviousStory}>
        <ChevronLeft color='#fff'/>
      </div>
      <div className="next-button" onClick={handleNextStory}>
        <ChevronRight color='#fff'/>
      </div>
      <div onClick={handleCloseViewer} className="close-button"><CircleX color="#fff"/></div>
    </div>
  );
};

export default StoryViewer;
