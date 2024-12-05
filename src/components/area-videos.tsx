"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import axios from "axios";

import { Typography, Button } from "@material-tailwind/react";
import VideoCard from "@/components/video-card";

import { Video, VideoBackend } from "../app/types/types";
import { TailSpin } from "react-loader-spinner";

interface AreaVideosProps {
  areaId: string; // or number, depending on your use case
  title: string;
  description: string;
  bannerUrl: string;
  mostPopular?: boolean;
}

export function AreaVideos({
  areaId,
  title,
  description,
  bannerUrl,
  mostPopular,
}: AreaVideosProps) {
  const [videos, setVideos] = useState<Video[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [page, setPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true); // State to track if there are more videos

  const fetchVideosData = async (page: number) => {
    try {
      // add url for get most popular videos by healthcare area
      const url = mostPopular
        ? `${process.env.NEXT_PUBLIC_API_URL}/video/area/${areaId}?limit=6&page=${page}`
        : `${process.env.NEXT_PUBLIC_API_URL}/video/area/${areaId}?limit=6&page=${page}`;

      const response = await axios.get<VideoBackend>(url);

      const fetchedVideos: any[] = response.data.videos;

      if (fetchedVideos.length === 0) {
        setHasMore(false); // No more videos to load
      } else {
        setVideos((prevVideos) => [
          ...prevVideos,
          ...fetchedVideos.map((vid) => ({
            id: vid._id,
            area: vid.area.name,
            title: vid.title,
            description: vid.description,
            videoId: vid.videoId,
            thumbnail: vid.thumbnail,
            createdAt: vid.createdAt,
          })),
        ]);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchVideosData(page); // Fetch the initial page of data
  }, [page]); // Re-fetch data when page changes

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page to fetch next set of videos
  };

  return (
    <section className="container mx-auto px-8 py-20">
      <div className="w-full lg:container lg:mx-auto mb-10">
        <Image
          width={1024}
          height={400}
          src={bannerUrl}
          alt="healthcarearea-banner"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </div>
      <Typography variant="h2" color="blue-gray">
        {title}
      </Typography>
      <Typography
        variant="lead"
        className="my-2 w-full font-normal !text-gray-500 "
      >
        {description}
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
        </div>
      ) : (
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
      )}

      {!loading && hasMore && (
        <div className="mt-8 flex justify-center">
          <Button variant="outlined" color="blue-gray" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </section>
  );
}
export default AreaVideos;
