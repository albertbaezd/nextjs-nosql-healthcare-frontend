"use client";
import { Avatar, Typography, Button, Textarea } from "@material-tailwind/react";
import {
  ClockIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

import { useRouter, useParams } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TailSpin } from "react-loader-spinner";

import { useUser } from "@/app/context/userContext";
import { PostWithComments } from "@/app/types/types";
import Modal from "@/components/modal";
import { formatDate } from "../../constants/constants";

const initialPostWithComments: PostWithComments = {
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
      author: {
        id: "",
        authorName: "",
      },
      body: "",
      postId: "",
      createdAt: "",
    },
  ],
};

function Post() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [postData, setPostData] = useState<PostWithComments>(
    initialPostWithComments
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userContext } = useUser();

  // Modal utils

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});

  const openModal = (
    title: string,
    description: string,
    action: () => void
  ) => {
    setModalTitle(title);
    setModalDescription(description);
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  console.log("Post ID from URL:", id);
  // Function to fetch post data by ID
  const getPostById = async (id: string) => {
    try {
      const response = await apiClient.get<PostWithComments>(
        `/posts/full/${id}`
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

  const formik = useFormik({
    initialValues: {
      body: "", // Initial body for the comment
    },
    validationSchema: Yup.object({
      body: Yup.string().required("Comment is required"), // Validation for the comment body
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!values.body.trim()) return; // Prevent submitting empty comments
      try {
        // Send the comment to the API
        const response = await apiClient.post(`/comments`, {
          authorId: userContext.userId,
          body: values.body,
          postId: id,
        });

        // Optionally, update the post data with the new comment

        // @ts-ignore
        setPostData((prevPostData) => ({
          ...prevPostData,
          comments: [
            ...prevPostData.comments,
            {
              // @ts-ignore
              _id: response.data._id,
              author: {
                // @ts-ignore
                id: response.data.authorId,
                // @ts-ignore
                authorName: response.data.authorName,
              },
              // @ts-ignore
              body: response.data.body,
              // @ts-ignore
              postId: response.data.postId,
              // @ts-ignore
              createdAt: response.data.createdAt,
            },
          ],
        }));

        // Reset the form after successful submission
        resetForm();
      } catch (error) {
        setError("Error submitting comment");
      }
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    try {
      await apiClient.delete(`/comments/comment/${commentId}`);
      setPostData({
        ...postData,
        // @ts-ignore
        comments: postData.comments.filter(
          (comment) => comment._id !== commentId
        ),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await apiClient.delete(`/posts/${postId}`);
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }

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
                    {/* @ts-ignore */}
                    <Typography variant="h4" color="blue-gray">
                      {postData.title}
                    </Typography>
                    {/* @ts-ignore */}
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
                      {/* @ts-ignore */}
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
                  {/* <ClockIcon className="-mt-px h-4 w-4 text-blue-gray-500" /> */}
                  <ClockIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <div className="flex w-full gap-2">
                    {/* @ts-ignore */}
                    <Typography className="font-medium text-blue-gray-500">
                      {formatDate(postData.createdAt)}
                      {/* postData.createdAt */}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  {/* @ts-ignore */}
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
                  {/* @ts-ignore */}
                  <Typography className="mb-2 font-normal text-black-800">
                    Weldome to this article:
                  </Typography>
                  {/* @ts-ignore */}
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
                  // @ts-ignore
                  <Button
                    className="bg-black text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-600"
                    onClick={() =>
                      openModal(
                        "Delete Post",
                        "Are you sure you want to delete this post?",
                        () => handleDeletePost(id)
                      )
                    }
                  >
                    Delete
                  </Button>
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
          {/* @ts-ignore */}
          <Typography variant="h5" color="blue-gray">
            {postData.comments.length} comments
          </Typography>

          {postData.comments.length > 0 ? (
            postData.comments.map((comment) => (
              <div key={comment._id} className="border-b py-4">
                <div className="flex items-start gap-4">
                  {/* @ts-ignore */}
                  <Avatar
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt={comment.author.id}
                  />
                  <div className="flex-grow">
                    {/* @ts-ignore */}
                    <Typography className="font-semibold">
                      {comment.author.authorName}
                    </Typography>
                    {/* @ts-ignore */}
                    <Typography className="text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                    {/* @ts-ignore */}
                    <Typography className="mt-2">{comment.body}</Typography>
                  </div>
                  {/* Close Button */}
                  {userContext.userId !== null &&
                    comment.author.id === userContext.userId && (
                      // @ts-ignore
                      <Button
                        className="bg-black text-white hover:bg-red-500 focus:bg-red-500 active:bg-red-600"
                        onClick={() =>
                          openModal(
                            "Delete Comment",
                            "Are you sure you want to delete this comment?",
                            () => handleDeleteComment(comment._id)
                          )
                        }
                      >
                        Delete Comment
                      </Button>
                    )}
                </div>
              </div>
            ))
          ) : (
            // @ts-ignore
            <Typography color="gray">No comments yet.</Typography>
          )}
        </div>
      </section>

      {/* Add Comment Section with Formik */}
      <section className="bg-white py-6">
        <div className="container mx-auto">
          {/* @ts-ignore */}
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Add a comment
          </Typography>

          {/* Only logged in users can post comments */}
          {userContext.userId === null ? (
            // @ts-ignore
            <Button type="submit" disabled>
              Login to post a comment
            </Button>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              {/* @ts-ignore */}
              <Textarea
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="body"
                label="Your comment"
                rows={3}
                className="mb-4"
                error={formik.touched.body && formik.errors.body ? true : false}
              />

              {formik.touched.body && formik.errors.body && (
                // @ts-ignore
                <Typography color="red" className="mb-4 text-sm">
                  {formik.errors.body}
                </Typography>
              )}
              {/* @ts-ignore */}
              <Button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? "Submitting..." : "Post Comment"}
              </Button>
            </form>
          )}
        </div>
      </section>

      <div className="bg-white">
        <Footer omitSubscription={true} />
      </div>

      {/* Render Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        description={modalDescription}
        buttonLabel="Confirm"
        onButtonClick={() => {
          modalAction();
          setIsModalOpen(false); // Close the modal after the action
        }}
      />
    </>
  );
}

export default Post;
