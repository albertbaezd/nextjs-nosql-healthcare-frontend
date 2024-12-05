"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { useSnackbar } from "notistack";
import { useUser } from "../context/userContext";

interface PostCreateResponse {
  post: {
    id: string;
    title: string;
    description: string;
    body: string;
    area: string;
    areaId: string;
    createdAt: string;
  };
}

const areaEnum = {
  Sleep: "673138f57ce2f8d342e4ab49",
  Anxiety: "673139057ce2f8d342e4ab4b",
  Stress: "6731390f7ce2f8d342e4ab4d",
  ["Eating disorders"]: "6731391e7ce2f8d342e4ab4f",
  ["Cognitive health"]: "6731392f7ce2f8d342e4ab51",
};

type AreaEnumKeys = keyof typeof areaEnumReversed;

const areaEnumReversed = {
  "673138f57ce2f8d342e4ab49": "Sleep",
  "673139057ce2f8d342e4ab4b": "Anxiety",
  "6731390f7ce2f8d342e4ab4d": "Stress",
  "6731391e7ce2f8d342e4ab4f": "Eating disorders",
  "6731392f7ce2f8d342e4ab51": "Cognitive health",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  body: Yup.string().required("Body is required"),
  area: Yup.string().required("Area is required"),
});

const CreatePost = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { userContext } = useUser();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      body: "",
      area: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const areaId = areaEnum[values.area as keyof typeof areaEnum];

      try {
        const response = await apiClient.post<PostCreateResponse>(`/posts/`, {
          title: values.title,
          description: values.description,
          body: values.body,
          area: areaEnumReversed[values.area as AreaEnumKeys],
          areaId: areaId,
          authorId: userContext.userId,
          image: "https://i.imgur.com/z2u8xvJ.jpeg",
        });

        if (response.status === 201) {
          enqueueSnackbar("Post created successfully", { variant: "success" });
          router.push("/"); // Redirect to the posts list or appropriate page
        } else {
          enqueueSnackbar("Post creation failed", { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar("An error occurred while creating the post", {
          variant: "error",
        });
        console.error(error);
      }
    },
  });

  useEffect(() => {
    console.log(userContext);
  }, [userContext]);

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          {/* @ts-ignore */}
          <Typography variant="h2" className="font-bold mb-4">
            Create a Post
          </Typography>
          {/* @ts-ignore */}
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Fill out the form to create a new post.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          {/* Title Input */}
          <div className="mb-6">
            {/* @ts-ignore */}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Title
            </Typography>
            {/* @ts-ignore */}
            <Input
              size="lg"
              placeholder="Post Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            )}
          </div>

          {/* Description Input */}
          <div className="mb-6">
            {/* @ts-ignore */}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Description
            </Typography>
            {/* @ts-ignore */}
            <Input
              size="lg"
              placeholder="Post Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>

          {/* Body Input */}
          <div className="mb-6">
            {/* @ts-ignore */}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Body
            </Typography>
            {/* @ts-ignore */}
            <Input
              size="lg"
              placeholder="Post Content"
              name="body"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.body && formik.errors.body
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.body && formik.errors.body && (
              <div className="text-red-500 text-sm">{formik.errors.body}</div>
            )}
          </div>

          {/* Area Select */}
          <div className="mb-6">
            {/* @ts-ignore */}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Area
            </Typography>
            {/* @ts-ignore */}
            <Select
              name="area"
              value={formik.values.area} // Store the areaId here
              onChange={(value) => {
                console.log("Selected area value:", value); // Check the selected value
                formik.setFieldValue("area", value); // Set the value in Formik
                formik.validateField("area"); // Optionally trigger validation
              }}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.area && formik.errors.area
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              {Object.keys(areaEnum).map((areaName) => {
                const areaId = areaEnum[areaName as keyof typeof areaEnum]; // Get the corresponding areaId
                // console.log(areaId);
                return (
                  <Option key={areaId} value={areaId}>
                    {areaName}
                  </Option>
                );
              })}
            </Select>

            {formik.touched.area && formik.errors.area && (
              <div className="text-red-500 text-sm">{formik.errors.area}</div>
            )}

            {/* <Select
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.area && formik.errors.area
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              {Object.keys(areaEnum).map((area) => (
                <Option key={area} value={area}>
                  {area}
                </Option>
              ))}
            </Select>
            {formik.touched.area && formik.errors.area && (
              <div className="text-red-500 text-sm">{formik.errors.area}</div>
            )} */}
          </div>

          {/* Submit Button */}
          {/* @ts-ignore */}
          <Button className="mt-6" fullWidth type="submit">
            Create Post
          </Button>
        </form>
      </div>

      <div className="w-2/5 max-h-[1300px] hidden lg:block">
        <img
          src="https://i.imgur.com/zykDNnE.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
};

export default CreatePost;
