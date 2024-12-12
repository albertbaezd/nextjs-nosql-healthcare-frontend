export interface BlogPostCardProps {
  postId: string;
  image: string;
  area: string;
  title: string;
  description: string;
  authorName: string;
  createdAt: string;
  commentCount?: number;
}

export interface Post {
  id: string;
  image: string;
  area: string;
  title: string;
  description: string;
  author: {
    name: string;
    id: string;
    profilePicture?: string;
  };
  createdAt: string;
  commentCount?: number;
}

export interface AreaPost {
  _id: string;
  image: string;
  area: string;
  title: string;
  description: string;
  author: {
    name: string;
    id: string;
    profilePicture?: string;
  };
  createdAt: string;
  commentCount?: number;
}

interface Comment {
  _id: string;
  author: {
    id: string;
    authorName: string;
  };
  body: string;
  postId: string;
  createdAt: string;
}

export interface PostWithComments {
  id: string;
  image: string;
  area: string;
  title: string;
  description: string;
  author: {
    name: string;
    id: string;
    profilePicture?: string;
    role: string;
  };
  createdAt: string;
  commentCount?: number;
  comments: Comment[];
}

export interface PostBackend {
  id: string;
  page: number;
  limitOrTotal: number;
  totalPages: number;
  totalPosts: number;
  posts: [
    {
      _id: string;
      image: string;
      area: string;
      title: string;
      description: string;
      author?: {
        name: string;
        id: string;
        profilePicture?: string;
      };
      authorId: string;
      createdAt: string;
      commentCount?: number;
    }
  ];
}

export interface Author {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface Video {
  id: string;
  area: string;
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
  createdAt: string;
}

export interface VideoBackend {
  page: number;
  limitOrTotal: number;
  totalPages: number;
  totalVideos: number;
  videos: [
    {
      _id: string;
      area: {
        name: string;
        description: string;
      };
      title: string;
      description: string;
      body: string;
      videoId: string;
      thumbnail: string;
      createdAt: string;
      comments: string[];
    }
  ];
}
