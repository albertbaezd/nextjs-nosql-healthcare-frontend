"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import apiClient from "@/lib/apiClient";

import { Typography } from "@material-tailwind/react";
import VideoCard from "@/components/video-card";

import { Video, VideoBackend } from "./types/types";
import { TailSpin } from "react-loader-spinner";

export function Videos() {
  const [videos, setVideos] = useState<Video[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<VideoBackend>(
          `/video?limit=6&sortOrder=desc`
        );
        console.log(response.data);
        // setVideos(response.data.videos); // Store the data in the state
        const videos = response.data.videos;
        setVideos(
          videos.map((vid, idx) => {
            return {
              id: vid._id,
              area: vid.area.name,
              title: vid.title,
              description: vid.description,
              videoId: vid.videoId,
              thumbnail: vid.thumbnail,
              createdAt: vid.createdAt,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Call the fetch function
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-8 py-20">
      <div className="w-full lg:container lg:mx-auto mb-10">
        <Image
          width={1024}
          height={400}
          src="https://i.imgur.com/C26ulid.jpeg"
          alt="credit cards"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </div>
      <Typography variant="h2" color="blue-gray">
        Latest videos
      </Typography>
      <Typography
        variant="lead"
        className="my-2 w-full font-normal !text-gray-500"
      >
        Check out our latest selection of recommended videos and materials to
        boost your experience on assorted topics!
      </Typography>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {videos.map((video, idx) => {
          console.log(video);
          return (
            <VideoCard
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
              videoId={video.videoId}
              area={video.area}
            />
          );
        })}
      </div>
    </section>
  );
}
export default Videos;
