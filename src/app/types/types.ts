export interface BlogPostCardProps {
  image: string;
  area: string;
  title: string;
  description: string;
  authorName: string;
  createdAt: string;
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
}

export interface PostBackend {
  page: number;
  limitOrTotal: number;
  totalPages: number;
  totalPosts: number;
  posts: [
    {
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
