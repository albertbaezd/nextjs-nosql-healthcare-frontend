"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/components/blog-post-card";

import { Post, PostBackend, Author } from "./types/types";
import { formatDate } from "./constants/constants";
import { TailSpin } from "react-loader-spinner";
import apiClient from "@/lib/apiClient";

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]); // State to store the posts
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  useEffect(() => {
    const fetchPostsWithAuthors = async () => {
      try {
        // Fetch posts from the API with the desired limit
        const postsResponse = await apiClient.get<PostBackend>(
          `/posts/latest?limit=6`
        );
        const posts = postsResponse.data.posts;

        // Map the posts and directly format them with the author included
        const mappedPosts = posts.map((post: any) => ({
          id: post._id,
          image: post.image,
          area: post.area,
          title: post.title,
          description: post.description,
          author: {
            name: post.author.name, // Directly use embedded author data
            id: post.author.id,
            profilePicture: post.author.profilePicture || "", // Fallback if no profile picture
          },
          createdAt: formatDate(post.createdAt),
        }));

        // Set the state with the formatted posts
        setPosts(mappedPosts);
        setLoading(false); // Set loading to false after posts are fetched

        console.log("posts with authors:", mappedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPostsWithAuthors();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Newest posts
      </Typography>

      <Typography variant="h1" className="mb-2">
        Read our latest stories!
      </Typography>

      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-36 text-center text-gray-500"
      >
        Dive into what our specialists have to say about your favorite topics.
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
        </div>
      ) : (
        <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
          {posts.map(
            ({ id, image, area, title, description, author, createdAt }) => (
              <BlogPostCard
                postId={id}
                key={id}
                image={image}
                area={area}
                title={title}
                description={description}
                createdAt={createdAt}
                authorName={author.name}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default Posts;
