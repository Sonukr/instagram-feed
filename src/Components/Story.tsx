import React, { useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { StoryProps } from '../types/types';
import { CirclePlay } from 'lucide-react';



const Story: React.FC<StoryProps> = ({ story, isPlaying, onStoryEnd, handlePlayPause, videoRef }) => {
  const [progress, setProgress] = React.useState(0);
  

  useEffect(()=> {
    if(story) setProgress(0);
  }, [story])
  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => Math.min(prevProgress + 1, 100));
      }, story.duration * 100);

      return () => clearInterval(intervalId);
    }
  }, [isPlaying, story.duration]);

  if (progress === 100 && onStoryEnd) {
    setProgress(0);
    onStoryEnd();
  }

  return (
    <div className="story">
      <div className="image-wrapper" onClick={handlePlayPause}>
          {story.type === 'image' ?
              <img src={story.url} alt="" /> :
              <video src={story.url} autoPlay ref={videoRef}></video>
          }
        <div className="image-mask"></div>
        <div className="mediaIcon">
          {!isPlaying && <CirclePlay color="#fff" />}
        </div>
      </div>
      <div className="user-info">
        
        {isPlaying && (
          <ProgressBar now={progress} striped animated variant="primary" />
        )}
       <p>{story.username}</p>
      </div>
      
      {/* <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button> */}
    </div>
  );
};

export default Story;
