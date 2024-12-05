"use client";

import Image from "next/image";
import { Button, Typography, Input } from "@material-tailwind/react";

interface HeroProps {
  imageUrl: string;
  title: string;
  description: string;
}

function Hero({ imageUrl, title, description }: HeroProps) {
  return (
    <header className="mt-5 bg-white p-8">
      <div
        className="relative w-full container mx-auto pt-24 pb-24 text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-35 z-0"></div>{" "}
        <div className="relative z-10">
          {/* Make sure content stays above the overlay */}
          {/* @ts-ignore */}
          <Typography
            color="white"
            className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
          >
            <span className="text-white shadow-sm">{title}</span>
          </Typography>
          {/* @ts-ignore */}
          <Typography
            variant="lead"
            color="white"
            className="mx-auto mt-8 w-full px-8 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
          >
            <span className="text-white">{description}</span>
          </Typography>
        </div>
      </div>
    </header>
  );
}
export default Hero;
