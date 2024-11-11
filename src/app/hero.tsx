"use client";

import Image from "next/image";
import { Button, Typography, Input } from "@material-tailwind/react";

function Hero() {
  return (
    <header className="mt-5 bg-white p-8">
      {/* <div className="w-w-full container mx-auto pt-12 pb-24 text-center bg-[url('https://i.imgur.com/seVlXpQ.jpeg')] bg-cover bg-center">
        <Typography
          color="black"
          className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
        >
          <span className="text-black shadow-sm">
            Welcome to Serenity Space!
          </span>
        </Typography>
        <Typography
          variant="lead"
          color="black"
          className="mx-auto mt-8 mb-4 w-full px-8 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
        >
          <span className="bg-white text-black">
            Welcome to Serenity Space, your go-to resource for health and
            wellness tips. Explore our expert insights and practical advice to
            help you live a balanced and fulfilling life.
          </span>
        </Typography>
        <div className="grid place-items-start justify-center gap-2">
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row"></div>
        </div>
      </div> */}
      <div className="relative w-full container mx-auto pt-24 pb-24 text-center bg-[url('https://i.imgur.com/seVlXpQ.jpeg')] bg-cover bg-center">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-35 z-0"></div>{" "}
        <div className="relative z-10">
          {/* Make sure content stays above the overlay */}
          <Typography
            color="white"
            className="mx-auto w-full text-[30px] lg:text-[48px] font-bold leading-[45px] lg:leading-[60px] lg:max-w-2xl"
          >
            <span className="text-white shadow-sm">
              Welcome to Serenity Space!
            </span>
          </Typography>
          <Typography
            variant="lead"
            color="white"
            className="mx-auto mt-8 w-full px-8 lg:w-10/12 lg:px-12 xl:w-8/12 xl:px-20"
          >
            <span className="text-white">
              Welcome to Serenity Space, your go-to resource for health and
              wellness tips. Explore our expert insights and practical advice to
              help you live a balanced and fulfilling life.
            </span>
          </Typography>
        </div>
      </div>
      {/* Red banner */}
      {/* <div className="w-full lg:container lg:mx-auto">
        <Image
          width={1024}
          height={400}
          src="/image/blog-background.png"
          alt="credit cards"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </div> */}
    </header>
  );
}
export default Hero;
