export interface BlogPostCardProps {
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
  comments: [
    {
      _id: string; // Unique ID for the comment
      author: {
        id: string;
        authorName: string;
      };
      body: string; // Content of the comment
      postId: string; // ID of the post this comment is associated with
      createdAt: string; // Timestamp of when the comment was created
    }
  ];
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
