import React, { useState, useEffect, useRef } from 'react';
import Story from './Story';
import { StoryItemProps, StoryViewerProps } from '../types/types';
import { ChevronLeft, ChevronRight, CircleX } from 'lucide-react';



const StoryViewer: React.FC<StoryViewerProps> = ({ story: currentStory, onClose, stories, setShowUserProfile }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUserProfile, setShowUserProfileState] = useState(false);
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
    onClose && onClose(); // Call onClose here
  };

  // const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
  //   const startX = event.touches ? event.touches[0].clientX : event.clientX;
  //   const handleTouchMove = (moveEvent: React.TouchEvent<HTMLDivElement>) => {
  //     const deltaX = (moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX) - startX;
  //     if (deltaX > 50) { // Threshold for swipe left
  //       handlePreviousStory();
  //     } else if (deltaX < -50) { // Threshold for swipe right
  //       onClose(() => handleStoryOpen(stories[(currentStoryIndex + 1) % stories.length]));
  //     }
  //     document.removeEventListener('touchmove', handleTouchMove);
  //   };
  //   document.addEventListener('touchmove', handleTouchMove, { passive: true });
  // };

  // const handleTouchEnd = (endEvent: React.TouchEvent<HTMLDivElement>) => {
  //   const startY = endEvent.touches ? endEvent.touches[0].clientY : endEvent.clientY;
  //   const endY = endEvent.touches ? endEvent.touches[0].clientY : endEvent.clientY;
  //   if (startY - endY > 50) { // Threshold for swipe up
  //     setShowUserProfileState(true);
  //   }
  // };

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

  // if (videoRef.current) {
  //   videoRef.current.addEventListener('play', handlePlayPause);
  //   videoRef.current.addEventListener('pause', handlePlayPause);
  // }

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
      {showUserProfile && <div className="user-profile">{/* User profile content */}</div>}
    </div>
  );
};

export default StoryViewer;
