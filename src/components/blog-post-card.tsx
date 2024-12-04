import React from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import { BlogPostCardProps } from "@/app/types/types";

export function BlogPostCard({
  image,
  area,
  title,
  description,
  authorName,
  createdAt,
  commentCount,
}: BlogPostCardProps) {
  return (
    <Card
      shadow={true}
      className="transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <CardHeader>
        <Image
          width={768}
          height={768}
          src={image}
          alt={title}
          className="max-h-[450px] h-[300px] w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="small" color="blue" className="mb-2 !font-medium">
          {area}
        </Typography>
        <Typography
          as="a"
          href="#"
          variant="h5"
          color="blue-gray"
          className="mb-2 normal-case transition-colors hover:text-gray-900"
        >
          {title && title.length > 50 ? title.slice(0, 50) + "..." : title}
        </Typography>
        <Typography className="mb-6 font-normal !text-gray-500">
          {description && description.length > 350
            ? description.slice(0, 350) + "..."
            : description}
        </Typography>
        <div className="flex items-center gap-4">
          {/* <Avatar
            size="sm"
            variant="circular"
            src={author.img}
            alt={author.name}
          /> */}
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0.5 !font-medium"
            >
              {authorName}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs !text-gray-500 font-normal"
            >
              {createdAt}
            </Typography>
            {commentCount > 0 && (
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-0.5 !font-medium"
              >
                {commentCount} comments
              </Typography>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;
