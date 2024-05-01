export interface StoryItemProps {
  id: string;
  url: string;
  userId: string;
  username: string;
  duration: number; // in seconds
  type: string
}

export interface StoryProps {
  story: StoryItemProps;
  isPlaying: boolean;
  onStoryEnd?: () => void;
  handleProgressBarClick?: (progress: number) => void;
  handlePlayPause?: () => void;
  videoRef? : React.RefObject<HTMLVideoElement>;
}

export interface StoryListProps {
  stories: StoryItemProps[];
  onStoryClick: (story: StoryItemProps) => void;
}

export interface StoryViewerProps {
  story: StoryItemProps;
  stories: StoryItemProps[];
  handleProgressBarClick?: (progress: number) => void;
  handlePlayPause?: () => void;
  setShowUserProfile?: (show: boolean) => void;
  onClose?: (nextStoryCallback?: () => void) => void;
}

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface PostItemProps {
  id: string;
  url: string;
  userId: string;
  username: string;
  duration: number; // in seconds
  type: string
}
export interface PostProps {
  post: PostItemProps
}
export interface PostListProps {
  posts: PostItemProps[];
}

export interface LoaderProps {
  title: string
}