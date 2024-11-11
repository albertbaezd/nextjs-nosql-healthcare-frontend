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
