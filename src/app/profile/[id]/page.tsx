"use client";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  GlobeAltIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter, useParams } from "next/navigation";
import { Navbar, Footer } from "@/components";

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

export function Profile() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("User ID from URL:", id);
  // Function to fetch user data by ID
  const getUserById = async (id: string) => {
    try {
      const response = await axios.get<User>(
        `http://localhost:3000/api/users/${id}`
      );
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
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>No user found.</p>;
  }

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://i.imgur.com/RTE9LP3.jpeg')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>
      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
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
                  <Typography variant="h4" color="blue-gray">
                    {userData.name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="!mt-0 font-normal"
                  >
                    {userData.email}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="-mt-4 container space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.city ? `${userData.city}` : "City not specified"}{" "}
                  {userData.state ? `${userData.state}` : "State not specified"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.country
                    ? userData.country
                    : "Country not specified"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.university
                    ? userData.university
                    : "Education not specified"}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                <Typography className="font-medium text-blue-gray-500">
                  {userData.speciality && userData.role == "doctor"
                    ? userData.speciality
                    : "Speciality not specified"}
                </Typography>
              </div>
            </div>
            <div className="mb-10 py-6">
              <div className="flex w-full flex-col items-start lg:w-1/2">
                <Typography className="mb-6 font-normal text-blue-gray-500">
                  {userData.description}
                </Typography>
                {/* <Button variant="text">Show more</Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Footer omitSubscription={true} />
      </div>
    </>
  );
}

export default Profile;
