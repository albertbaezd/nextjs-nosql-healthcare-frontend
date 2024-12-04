"use client";

import { Navbar, Footer } from "@/components";

import React, { useEffect } from "react";
import Hero from "../../hero";
import AreaPosts from "../../../components/area-posts";
import Videos from "../..//videos";
import { useUser } from "../../context/userContext";

export default function Campaign() {
  const { userContext, setUserContext } = useUser();

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
  }, []);

  return (
    <>
      <Navbar />
      <Hero
        imageUrl="https://i.imgur.com/0jyaAtG.jpeg"
        title="Anxiety"
        description="Feeling overwhelmed? You're not alone. In this space, we’ve gathered practical tips, expert advice, and calming videos designed to help you navigate anxiety. Whether you're seeking quick techniques to ease your mind or deeper insights into managing stress, we’ve got you covered."
      />
      <AreaPosts
        areaId="673139057ce2f8d342e4ab4b"
        title="Latest posts on Anxiety"
        description="This page offers practical strategies, including mindfulness, breathing exercises, and lifestyle changes, to help you regain control. You'll also find links to trusted resources and expert advice on coping with anxiety, empowering you to take proactive steps toward better mental health."
      />
      <Videos />
      <Footer />
    </>
  );
}
