"use client";

import { Navbar, Footer } from "@/components";

import React, { useEffect } from "react";
import Hero from "./hero";
import Posts from "./posts";
import Videos from "./videos";
import { useUser } from "../app/context/userContext";
import { useRouter } from "next/navigation";

export default function Campaign() {
  const { userContext } = useUser();

  const router = useRouter();

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
    if (userContext.userId === null) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero
        imageUrl="https://i.imgur.com/seVlXpQ.jpeg"
        title="Welcome to Serenity Space!"
        description="Welcome to Serenity Space, your go-to resource for health and
      wellness tips. Explore our expert insights and practical advice to
      help you live a balanced and fulfilling life."
      />
      <Posts />
      <Videos />
      <Footer />
    </>
  );
}
