"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import BlogPostCard from "@/components/blog-post-card";

import axios from "axios";

import { Post, PostBackend, Author } from "./types/types";
import { formatDate } from "./constants/constants";

// const fetchPostsWithAuthors = async () => {
//   try {
//     // Fetch all posts from the new URL
//     const postsResponse = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/posts`
//     );
//     const posts = postsResponse.data;

//     // For each post, fetch the author using the authorId
//     // const postsWithAuthors = await Promise.all(
//     //   posts.map(async (post) => {
//     //     const authorResponse = await axios.get(
//     //       `${process.env.NEXT_PUBLIC_API_URL}/authors/${post.authorId}`
//     //     );
//     //     const author = authorResponse.data;

//     //     // Return the post with the author's name added
//     //     return {
//     //       ...post,
//     //       authorName: author.name, // Assuming the author has a 'name' field
//     //     };
//     //   })
//     // );

//     // return postsWithAuthors;
//     console.log(posts);
//     return posts;
//   } catch (error) {
//     console.error("Error fetching posts or authors:", error);
//   }
// };

// const POSTS = [
//   {
//     img: `/image/blogs/blog2.svg`,
//     tag: "Enterprise",
//     title: "The key new features and changes in Tailwind CSS",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "10 September 2022",
//     author: {
//       img: `/image/avatar1.jpg`,
//       name: "Ryan Samuel",
//     },
//   },
//   {
//     img: `/image/blogs/blog6.svg`,
//     tag: "Startups",
//     title: "Lyft launching cross-platform service this week",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "12 September 2022",
//     author: {
//       img: `/image/blogs/blog2.svg`,
//       name: "Nora Hazel",
//     },
//   },
//   {
//     img: `/image/blogs/blog3.svg`,
//     tag: "Trending",
//     title: "6 insights into the French Fashion landscape",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "16 September 2022",
//     author: {
//       img: `/image/avatar2.jpg`,
//       name: "Otto Gonzalez",
//     },
//   },
//   {
//     img: `/image/blogs/blog4.svg`,
//     tag: "Lifestyle",
//     title: "Autodesk looks to future of 3D printing with Project",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "18 September 2022",
//     author: {
//       img: `/image/avatar3.jpg`,
//       name: "Ryan Samuel",
//     },
//   },
//   {
//     img: `/image/blogs/blog5.svg`,
//     tag: "Enterprise",
//     title: "Autodesk looks to future of 3D printing with Project",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "10 September 2022",
//     author: {
//       img: `/image/avatar3.jpg`,
//       name: "Ryan Samuel",
//     },
//   },
//   {
//     img: `/image/blogs/blog6.svg`,
//     tag: "Startups",
//     title: "Lyft launching cross-platform service this week",
//     desc: "Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens bed design but the back is too high for the beams and angle of the ceiling I also wanted to point out.",
//     date: "12 September 2022",
//     author: {
//       img: `/image/avatar2.jpg`,
//       name: "Nora Hazel",
//     },
//   },
// ];

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]); // State to store the posts
  const [loading, setLoading] = useState<boolean>(true); // State for loading status

  useEffect(() => {
    const fetchPostsWithAuthors = async () => {
      try {
        // Fetch all posts from the new URL
        const postsResponse = await axios.get<PostBackend[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`
        );
        const posts = postsResponse.data;

        // Fetch the authors for each post
        const mappedPosts = await Promise.all(
          posts.map(async (post: any) => {
            try {
              // Fetch the author by their ID from the correct route
              const authorResponse = await axios.get<Author>(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${post.authorId}`
              );
              const author = authorResponse.data;

              // Return the post with the updated author information
              return {
                id: post.id,
                image: post.image,
                area: post.area,
                title: post.title,
                description: post.description,
                author: {
                  name: author.name, // Assuming author has a 'name' field
                  id: post.authorId,
                  profilePicture: author.profilePicture || "", // Assuming author has a 'profilePicture' field
                },
                createdAt: formatDate(post.createdAt),
              };
            } catch (error) {
              console.error(
                `Error fetching author for post ${post.title}:`,
                error
              );
              // Handle the case where author fetching fails, you might set default values
              return {
                image: post.image,
                area: post.area,
                title: post.title,
                description: post.description,
                author: {
                  name: "Unknown", // Fallback if author data isn't found
                  id: post.authorId,
                  profilePicture: "", // Default if no profile picture found
                },
                createdAt: post.createdAt,
              };
            }
          })
        );

        // Set the mapped posts with author details
        setPosts(mappedPosts);

        console.log("posts with authors:", mappedPosts);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchPostsWithAuthors();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return (
      <Typography
        variant="lead"
        color="gray"
        className="max-w-3xl mb-36 text-center text-gray-500"
      >
        Loading posts...
      </Typography>
    ); // You can customize the loading state
  }

  return (
    <section className="grid min-h-screen place-items-center p-8">
      {/* <Tabs value="trends" className="mx-auto max-w-7xl w-full mb-16 ">
        <div className="w-full flex mb-8 flex-col items-center">
          <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90">
            <Tab value="trends">Trends</Tab>
            <Tab value="frontend">Frontend</Tab>
            <Tab value="backend">Backend</Tab>
            <Tab value="cloud">Cloud</Tab>
            <Tab value="ai">AI</Tab>
            <Tab value="tools">Tools</Tab>
          </TabsHeader>
        </div>
      </Tabs> */}
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
      <div className="container my-auto grid grid-cols-1 gap-x-8 gap-y-16 items-start lg:grid-cols-3">
        {posts.map(
          ({ id, image, area, title, description, author, createdAt }) => (
            <BlogPostCard
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
    </section>
  );
}

export default Posts;
