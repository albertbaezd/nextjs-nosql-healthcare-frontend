import { useState } from "react";
import Image from "next/image";
import { Typography, Card, CardBody } from "@material-tailwind/react";

import Modal from "./modal";

interface VideoCardProps {
  thumbnail: string;
  title: string;
  description: string;
  videoId: string;
  area: string;
}

export function VideoCard({
  thumbnail,
  title,
  description,
  videoId,
  area,
}: VideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Card
        className="relative grid min-h-[30rem] items-end overflow-hidden rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
        color="transparent"
        onClick={openModal}
      >
        <Image
          width={768}
          height={768}
          src={thumbnail}
          alt="bg"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <CardBody className="relative flex flex-col justify-end">
          <Typography variant="h4" color="white">
            {title && title.length > 70 ? title.slice(0, 70) + "..." : title}
          </Typography>
          <Typography
            variant="paragraph"
            color="white"
            className="my-2 font-normal"
          >
            {description && description.length > 350
              ? description.slice(0, 350) + "..."
              : description}
          </Typography>
          <Typography
            variant="paragraph"
            color="blue"
            className="mb-2 font-medium"
          >
            <span>{area}</span>
          </Typography>
        </CardBody>
      </Card>

      {/* Modal to show YouTube video */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        description={description}
        buttonLabel="Learn More"
        onButtonClick={() => {}} // Can add extra functionality here if needed
        videoId={videoId} // Pass video ID to show YouTube video
      />
    </>
  );
}

export default VideoCard;
