import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StoryList from './Components/StoryList';
import { PostItemProps, PostListProps, StoryItemProps } from './types/types';
import StoryViewer from './Components/StoryViewer';
import useFetch from './Hooks/useFetch';
import PostLists from './Components/PostList';

function App() {

  const [currentStory, setCurrentStory] = useState<StoryItemProps | null>(null);
  const [storyOpen, setStoryOpen] = useState(false)

  const handleStoryClick = (story: StoryItemProps) => {
    console.log(story);
    setCurrentStory(story);
    setStoryOpen(true)
  }


  // const stories = [{
  //   id: String(1),
  //   url: 'https://videos.pexels.com/video-files/4434150/4434150-hd_1080_1920_30fps.mp4',
  //   userId: 'user1',
  //   username:'User 1',
  //   duration: Math.floor(Math.random() * 2) + 3, // Random duration between 3 and 12 seconds
  //   type: 'video'
  // }]

  // for (let i = 2; i <= 22; i++) {
  //   stories.push({
  //     id: String(i),
  //     url: `https://picsum.photos/200/300?random=${i}`,
  //     userId: `user${i}`,
  //     username: `User ${i}`,
  //     duration: Math.floor(Math.random() * 10) + 3, // Random duration between 3 and 12 seconds
  //     type: 'image'
  //   });
  // }


  const handleCloseStory = () => {
    setStoryOpen(false);
    setCurrentStory(null);
  }

  // const { data, loading, error } = useFetch<StoryItem[]>('http://localhost:8000/stories');
  const { data: stories, loading, error } = useFetch<StoryItemProps[]>('http://localhost:8000/stories') as { data: StoryItemProps[]; loading: boolean; error: Error | null };
  const { data: posts, loading: postLoading, error: postError } = useFetch<PostItemProps[]>('http://localhost:8000/stories') as unknown as { data: PostItemProps[]; loading: boolean; error: Error | null };


  if (loading) {

    return (
      <div className='loader'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 100 100'
          preserveAspectRatio='xMidYMid'
          width={200}
          height={200}
          style={{
            shapeRendering: "auto",
            display: "block",
            background: "rgba(255, 255, 255, 0)",
          }}
          xmlnsXlink='http://www.w3.org/1999/xlink'

        >
          <g>
            <circle
              cx={50}
              cy={50}
              r={32}
              strokeWidth={8}
              stroke='#fe718d'
              strokeDasharray='50.26548245743669 50.26548245743669'
              fill='none'
              strokeLinecap='round'
            >
              <animateTransform
                attributeName='transform'
                type='rotate'
                repeatCount='indefinite'
                dur='1s'
                keyTimes='0;1'
                values='0 50 50;360 50 50'
              />
            </circle>
            <g />
          </g>
        </svg>
      </div>
    )
  }
  return (
    <>
      {stories && stories.length && <>
        <StoryList stories={stories} onStoryClick={handleStoryClick} />
        {currentStory &&
          <StoryViewer
            story={currentStory}
            stories={stories}
            onClose={handleCloseStory}
          />
        }
        <PostLists posts={posts}/>
      </>
      }
    </>
  );
}

export default App;
