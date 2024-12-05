// @ts-nocheck
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
import apiClient from "@/lib/apiClient";

import { useRouter, useParams } from "next/navigation";
import { Navbar, Footer } from "@/components";
import { useFormik } from "formik";
import { TailSpin } from "react-loader-spinner";
import * as Yup from "yup";
import { useUser } from "@/app/context/userContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  profilePictureUrl: string;
  city: string;
  state: string;
  country: string;
  description: string;
  university: string;
  speciality: string;
}

function Profile() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { userContext } = useUser();

  console.log("User ID from URL:", id);
  // Function to fetch user data by ID
  const getUserById = async (id: string) => {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      setUserData(response.data); // Set the user data (no type error now)
      setLoading(false);
    } catch (err) {
      setError("Error fetching user data");
      setLoading(false);
    }
  };

  // Fetch user data when the component is rendered
  useEffect(() => {
    if (id) {
      getUserById(id); // Call the function with the ID from the URL
    } else {
      console.log("There's not a profile ID specified");
      router.push("/login");
    }
  }, [id]);

  useEffect(() => {
    // This will run only once after the first render
    console.log("Current user context:", userContext);
  }, [userContext]);

  // Redirect to /home if no user is found
  useEffect(() => {
    if (!loading && !userData) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [loading, userData, router]);

  // Handle cancel changes
  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode
  };

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      city: userData?.city || "",
      state: userData?.state || "",
      country: userData?.country || "",
      description: userData?.description || "",
      university: userData?.university || "",
      speciality: userData?.speciality || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      city: Yup.string().optional(),
      state: Yup.string().optional(),
      country: Yup.string().optional(),
      description: Yup.string().optional(),
      university: Yup.string().optional(),
      speciality: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      try {
        await apiClient.put(`/users/${userContext.userId}`, values);
        setUserData({ ...userData, ...values } as User);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data");
      }
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin height="80" width="80" color="gray" ariaLabel="loading" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Typography variant="h5" color="blue-gray">
          No user found.
        </Typography>
        <Typography color="gray" className="mt-6">
          Redirecting to home in 5 seconds...
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://i.imgur.com/RTE9LP3.jpeg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={formik.handleSubmit}
          >
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="relative flex gap-6 items-start mb-10">
                  <div className="-mt-20 w-40">
                    <Avatar
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      alt="Profile picture"
                      variant="circular"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    {isEditing ? (
                      <Input
                        size="lg"
                        placeholder="John Doe"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${
                          formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    ) : (
                      <Typography variant="h4" color="blue-gray">
                        {userData?.name}
                      </Typography>
                    )}
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.name}
                      </div>
                    )}

                    <Typography
                      variant="paragraph"
                      color="gray"
                      className="!mt-0 font-normal"
                    >
                      {userData?.email}
                    </Typography>

                    {userData.role == "doctor" && (
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
                    )}
                  </div>
                </div>
              </div>
              <div className="-mt-4 container space-y-2">
                <div className="flex items-center gap-2">
                  {/* <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" /> */}
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <div className="flex w-full gap-2">
                    {isEditing ? (
                      <Input
                        size="lg"
                        placeholder="City"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${
                          formik.touched.city && formik.errors.city
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    ) : (
                      <Typography className="font-medium text-blue-gray-500">
                        {userData?.city || "City not specified"}
                      </Typography>
                    )}

                    {isEditing ? (
                      <Input
                        size="lg"
                        placeholder="State"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${
                          formik.touched.state && formik.errors.state
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    ) : (
                      <Typography className="font-medium text-blue-gray-500">
                        {userData?.state || "State not specified"}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  {isEditing ? (
                    <Input
                      size="lg"
                      placeholder="Country"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${
                        formik.touched.country && formik.errors.country
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  ) : (
                    <Typography className="font-medium text-blue-gray-500">
                      {userData?.country || "Country not specified"}
                    </Typography>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  {isEditing ? (
                    <Input
                      size="lg"
                      placeholder="Education"
                      name="university"
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${
                        formik.touched.university && formik.errors.university
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  ) : (
                    <Typography className="font-medium text-blue-gray-500">
                      {userData?.university || "Education not specified"}
                    </Typography>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="-mt-px h-4 w-4 text-blue-gray-500" />

                  {isEditing && userData.role == "doctor" ? (
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
                </div>
              </div>
              <div className="mb-10 py-6">
                <div className="flex w-full flex-col items-start">
                  <Typography className="mb-2 font-normal text-black-800">
                    Description
                  </Typography>

                  {isEditing ? (
                    <textarea
                      placeholder="Description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`${
                        formik.touched.description && formik.errors.description
                          ? "border-red-500"
                          : "border-2 border-gray-300"
                      } w-full p-3 rounded-lg text-gray-700`}
                      rows={4} // Optional: You can adjust the number of rows
                    />
                  ) : (
                    <Typography className="font-medium text-blue-gray-500">
                      {userData?.description ||
                        "Description missing... Hmmm... Would you like to share something interesting?"}
                    </Typography>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-4">
                {!isEditing && userContext.userId == id && (
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                )}
                {isEditing && (
                  <>
                    <Button color="green" type="submit">
                      Save Changes
                    </Button>
                    <Button color="red" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
      <div className="bg-white">
        <Footer omitSubscription={true} />
      </div>
    </>
  );
}

export default Profile;
