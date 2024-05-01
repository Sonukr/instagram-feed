import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StoryList from './Components/StoryList';
import { PostItemProps, PostListProps, StoryItemProps } from './types/types';
import StoryViewer from './Components/StoryViewer';
import useFetch from './Hooks/useFetch';
import PostLists from './Components/PostList';
import Loader from './Components/loader';

let url = 'http://localhost:8000';

function App() {

  const [currentStory, setCurrentStory] = useState<StoryItemProps | null>(null);
  const [storyOpen, setStoryOpen] = useState(false)

  const searchParams = new URLSearchParams(window.location.search);
  const server = searchParams.get('server');
  const handleStoryClick = (story: StoryItemProps) => {
    console.log(story);
    setCurrentStory(story);
    setStoryOpen(true)
  }

  const handleCloseStory = () => {
    setStoryOpen(false);
    setCurrentStory(null);
  }

  if(server === 'rest'){
    url = 'https://rest-server-28ps.onrender.com';
  }

  const { data: stories, loading, error } = useFetch<StoryItemProps[]>(`${url}/stories`) as { data: StoryItemProps[]; loading: boolean; error: Error | null };
  const { data: posts, loading: postLoading, error: postError } = useFetch<PostItemProps[]>(`${url}/stories`)  as { data: PostItemProps[]; loading: boolean; error: Error | null };


  if (loading) {

    return (
      <Loader title="Loading..."/>
    )
  }

 if(!stories || !posts){
  return(
   <Loader title={'Please start the server, Check Readme.'}/>
    
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
