"use client";

import { Navbar, Footer } from "@/components";

import React, { useEffect } from "react";
import Hero from "./hero";
import Posts from "./posts";
import Videos from "./videos";
import { useUser } from "../app/context/userContext";

export default function Campaign() {
  const { userContext, setUserContext } = useUser();

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Posts />
      <Videos />
      <Footer />
    </>
  );
}
