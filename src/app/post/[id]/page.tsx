"use client";
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";
import {
  MapPinIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter, useParams } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { useFormik } from "formik";
import { TailSpin } from "react-loader-spinner";
import * as Yup from "yup";

import { useUser } from "@/app/context/userContext";
import { PostWithComments } from "@/app/types/types";
// import { Post, PostBackend, Author } from "../types/types";
// import { Post, PostBackend, Author } from "../../../app/types";

export const initialPostWithComments: PostWithComments = {
  id: "",
  image: "",
  area: "",
  title: "",
  description: "",
  author: {
    name: "",
    id: "",
    profilePicture: undefined,
    role: "",
  },
  createdAt: "",
  commentCount: 0,
  comments: [
    {
      _id: "",
      authorId: "",
      body: "",
      postId: "",
      createdAt: "",
    },
  ],
};

function Profile() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [postData, setPostData] = useState<PostWithComments>(
    initialPostWithComments
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { userContext, setUserContext } = useUser();

  console.log("Post ID from URL:", id);
  // Function to fetch post data by ID
  const getPostById = async (id: string) => {
    try {
      const response = await axios.get<PostWithComments>(
        `http://localhost:3000/api/posts/full/${id}`
      );
      setPostData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching post data");
      setLoading(false);
    }
  };

  // Fetch user data when the component is rendered
  useEffect(() => {
    if (id) {
      getPostById(id); // Call the function with the ID from the URL
    }
  }, [id]);

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
  }, [userContext]);

  // Redirect to /home if no user is found
  //   useEffect(() => {
  //     if (!loading && !postData) {
  //       const timer = setTimeout(() => {
  //         router.push("/home");
  //       }, 5000);

  //       return () => clearTimeout(timer); // Clean up the timer
  //     }
  //   }, [loading, postData, router]);

  // Handle cancel changes
  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode
  };

  // Formik form configuration

  //   const formik = useFormik({
  //     initialValues: {
  //       name: userData?.name || "",
  //       email: userData?.email || "",
  //       city: userData?.city || "",
  //       state: userData?.state || "",
  //       country: userData?.country || "",
  //       description: userData?.description || "",
  //       university: userData?.university || "",
  //       speciality: userData?.speciality || "",
  //     },
  //     enableReinitialize: true,
  //     validationSchema: Yup.object({
  //       name: Yup.string().required("Name is required"),
  //       city: Yup.string().optional(),
  //       state: Yup.string().optional(),
  //       country: Yup.string().optional(),
  //       description: Yup.string().optional(),
  //       university: Yup.string().optional(),
  //       speciality: Yup.string().optional(),
  //     }),
  //     onSubmit: async (values) => {
  //       try {
  //         await axios.put(
  //           `http://localhost:3000/api/users/${userContext.userId}`,
  //           values
  //         );
  //         setUserData({ ...userData, ...values } as User);
  //         setIsEditing(false);
  //       } catch (error) {
  //         console.error("Error updating user data");
  //       }
  //     },
  //   });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }

  //   if (!postData) {
  //     return (
  //       <div className="flex flex-col items-center justify-center min-h-screen">
  //         <Typography variant="h5" color="blue-gray">
  //           No post found.
  //         </Typography>
  //         <Typography color="gray" className="mt-6">
  //           Redirecting to home in 5 seconds...
  //         </Typography>
  //       </div>
  //     );
  //   }

  return (
    <>
      <Navbar />
      <section className="relative block h-[50vh]">
        <div
          className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${postData.image})` }}
        />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            // onSubmit={formik.handleSubmit}
          >
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="relative flex gap-6 items-start mb-10">
                  <div className="flex flex-col mt-2">
                    <Typography variant="h4" color="blue-gray">
                      {postData.title}
                    </Typography>

                    <Typography
                      variant="paragraph"
                      color="gray"
                      className="!mt-0 font-normal"
                    >
                      {postData.author.name}
                      {/* "postData.author.name" */}
                    </Typography>

                    {/* <Typography
                      variant="paragraph"
                      color="gray"
                      className="!mt-0 font-normal"
                    >
                      {postData.area}
                    </Typography> */}

                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="-mt-px h-5 w-5 text-blue-500" />
                      <Typography
                        variant="paragraph"
                        color="gray"
                        className="!mt-0 font-normal"
                      >
                        Verified professional
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mt-4 container space-y-2">
                <div className="flex items-center gap-2">
                  {/* <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" /> */}
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <div className="flex w-full gap-2">
                    <Typography className="font-medium text-blue-gray-500">
                      {postData.createdAt}
                      {/* postData.createdAt */}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    {postData.area}
                  </Typography>
                </div>

                {/* <div className="flex items-center gap-2">
                  <BookOpenIcon className="-mt-px h-4 w-4 text-blue-gray-500" />

                  {isEditing && userData.role === "doctor" ? (
                    <Input
                      size="lg"
                      placeholder="Speciality"
                      name="speciality"
                      value={formik.values.speciality}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${
                        formik.touched.speciality && formik.errors.speciality
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  ) : (
                    <Typography className="font-medium text-blue-gray-500">
                      {userData?.speciality || "Speciality not specified"}
                    </Typography>
                  )}
                </div> */}
              </div>
              <div className="mb-10 py-6">
                <div className="flex w-full flex-col items-start">
                  <Typography className="mb-2 font-normal text-black-800">
                    Weldome to this article:
                  </Typography>

                  <Typography className="font-medium text-blue-gray-500">
                    {postData.description ||
                      "Description missing... Hmmm... Would you like to share something interesting?"}
                  </Typography>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-4">
                {/* thats the post author, can delete */}
                {userContext.userId === postData.author.id && (
                  <Button onClick={() => {}}>Delete</Button>
                )}
                {/* <Button onClick={() => {}}>Delete</Button> */}
                {/* {isEditing && (
                  <>
                    <Button color="green" type="submit">
                      Save Changes
                    </Button>
                    <Button color="red" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto space-y-6">
          <Typography variant="h5" color="blue-gray">
            {postData.comments.length} comments
          </Typography>

          {postData.comments.length > 0 ? (
            postData.comments.map((comment) => (
              <div key={comment._id} className="border-b py-4">
                <div className="flex items-start gap-4">
                  <Avatar
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt={comment.author.id}
                  />
                  <div>
                    <Typography className="font-semibold">
                      {comment.author.authorName}
                    </Typography>
                    <Typography className="text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    <Typography className="mt-2">{comment.body}</Typography>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Typography color="gray">No comments yet.</Typography>
          )}
        </div>
      </section>

      <div className="bg-white">
        <Footer omitSubscription={true} />
      </div>
    </>
  );
}

export default Profile;
