"use client";

import { Navbar, Footer } from "@/components";
import React, { useEffect } from "react";
import Hero from "../../hero";
import AreaPosts from "../../../components/area-posts";
import AreaVideos from "../../../components/area-videos";
import { useUser } from "../../context/userContext";
import { AREA_IDS } from "../../constants/areaIds"; // Import AREA_IDS and AREA_DETAILS
import { AREA_DETAILS } from "../../constants/healthcareAreaDescriptions"; // Import AREA_IDS and AREA_DETAILS

const currentArea = "anxiety";
const areaHeroProps = AREA_DETAILS[currentArea].hero;
const areaPostsProps = AREA_DETAILS[currentArea].areaPosts;
const areaMostPopularPostsProps =
  AREA_DETAILS[currentArea].areaPosts.mostPopularPosts;
const areaVideosProps = AREA_DETAILS[currentArea].areaVideos;

export default function Campaign() {
  const { userContext, setUserContext } = useUser();

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
  }, [userContext]);

  return (
    <>
      <Navbar />
      <Hero
        imageUrl={areaHeroProps.imageUrl}
        title={areaHeroProps.title}
        description={areaHeroProps.description}
      />
      <AreaPosts
        areaId={areaPostsProps.areaId}
        title={areaPostsProps.latestPosts.title}
        description={areaPostsProps.latestPosts.description}
      />
      <AreaPosts
        areaId={areaMostPopularPostsProps.areaId}
        title={areaMostPopularPostsProps.title}
        description={areaMostPopularPostsProps.description}
        mostPopular
      />
      <AreaVideos
        areaId={areaVideosProps.areaId}
        title={areaVideosProps.title}
        description={areaVideosProps.description}
        bannerUrl={areaVideosProps.bannerUrl}
      />
      <Footer />
    </>
  );
}
