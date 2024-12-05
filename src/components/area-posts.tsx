"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/components/blog-post-card";

import axios from "axios";

import { Post, PostBackend, Author } from "../app/types/types";
import { formatDate } from "../app/constants/constants";
import { TailSpin } from "react-loader-spinner";

// Define the interface for props
interface AreaPostsProps {
  areaId: string; // or number, depending on your use case
  title: string;
  description: string;
  mostPopular?: boolean;
}

// Functional component that accepts the props
export function AreaPosts({
  areaId,
  title,
  description,
  mostPopular,
}: AreaPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]); // State to store the posts
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [page, setPage] = useState<number>(1); // Track the current page for pagination
  const [hasMore, setHasMore] = useState<boolean>(true); // To check if more posts are available

  useEffect(() => {
    const fetchPostsWithAuthors = async () => {
      try {
        // Fetch all posts from the new URL
        // const postsResponse = await axios.get<PostBackend>(
        //   `${process.env.NEXT_PUBLIC_API_URL}/posts/area/${areaId}?limit=6&page=${page}`
        // );

        const url = mostPopular
          ? `${process.env.NEXT_PUBLIC_API_URL}/posts/area/${areaId}/mostpopular?limit=6&page=${page}`
          : `${process.env.NEXT_PUBLIC_API_URL}/posts/area/${areaId}?limit=6&page=${page}`;

        const postsResponse = await axios.get<PostBackend>(url);
        const posts: any[] = postsResponse.data.posts;

        // If no posts were returned, stop further requests
        console.log("posts", postsResponse);
        if (posts.length === 0) {
          setHasMore(false);
        }

        // Fetch the authors for each post
        const mappedPosts = await Promise.all(
          posts.map(async (post: any) => {
            try {
              const authorResponse = await axios.get<Author>(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${post.authorId}`
              );
              const author = authorResponse.data;

              return {
                id: post.id,
                image: post.image,
                area: post.area,
                title: post.title,
                description: post.description,
                author: {
                  name: author.name,
                  id: post.authorId,
                  profilePicture: author.profilePicture || "",
                },
                createdAt: formatDate(post.createdAt),
                commentCount: post.commentCount || 0,
              };
            } catch (error) {
              console.error(
                `Error fetching author for post ${post.title}:`,
                error
              );
              return {
                image: post.image,
                area: post.area,
                title: post.title,
                description: post.description,
                author: {
                  name: "Unknown",
                  id: post.authorId,
                  profilePicture: "",
                },
                createdAt: post.createdAt,
                commentCount: post.commentCount || 0,
              };
            }
          })
        );

        // Append new posts to the existing list of posts
        setPosts((prevPosts) => [...prevPosts, ...mappedPosts]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false); // no more posts to load, then the show more is not shown
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPostsWithAuthors();
  }, [areaId, page]); // Empty dependency array ensures this runs only once on mount

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more posts
  };

  return (
    <section className="grid min-h-screen place-items-center p-8">
      <Typography variant="h6" className="mb-2">
        Newest posts
      </Typography>
      <Typography variant="h1" className="mb-2">
        {title}
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-36 text-center text-gray-500"
      >
        {description}
      </Typography>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
        </div>
      ) : (
        <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
          {posts.map(
            ({
              id,
              image,
              area,
              title,
              description,
              author,
              createdAt,
              commentCount,
            }) => (
              <BlogPostCard
                key={id}
                image={image}
                area={area}
                title={title}
                description={description}
                createdAt={createdAt}
                authorName={author.name}
                commentCount={commentCount}
              />
            )
          )}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            color="gray"
            onClick={handleShowMore}
            className="flex items-center gap-2"
          >
            Show More <ArrowSmallDownIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </section>
  );
}

export default AreaPosts;
