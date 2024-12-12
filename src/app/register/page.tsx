// @ts-nocheck
"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import { Input, Button, Typography } from "@material-tailwind/react";
import Modal from "../../components/modal";
import { useUser } from "../context/userContext";
import { setToken } from "@/lib/authToken";

interface userRegisterResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
    profilePictureUrl?: string;
    city?: string;
    state?: string;
    country?: string;
    description?: string;
    university?: string;
    speciality?: string;
  };
  token: string;
}

const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  userType: Yup.string().required("User type is required"),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  country: Yup.string().optional(),
  description: Yup.string().optional(),
  university: Yup.string().optional(),
  speciality: Yup.string().optional(),
});

function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalButtonDescription, setModalButtonDescription] = useState("");
  const [modalCallRegister, setModalCallRegister] = useState<() => void>(
    () => {}
  );
  const { userContext, setUserContext } = useUser();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      userType: "",
      city: "",
      state: "",
      country: "",
      description: "",
      university: "",
      speciality: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted", values);

      const handleRegister = async () => {
        try {
          const response = await apiClient.post<userRegisterResponse>(
            `/auth/register`,
            {
              name: values.userName,
              email: values.email,
              password: values.password,
              role: values.userType,
              city: values.city,
              state: values.state,
              country: values.country,
              description: values.description,
              university: values.university,
              speciality: values.speciality,
            }
          );

          if (response.status === 201) {
            console.log(response.data);
            enqueueSnackbar("Registration successful", { variant: "success" });

            // Updating global user context
            setUserContext({
              userId: response.data.user._id,
              userName: response.data.user.name,
              userEmail: response.data.user.email,
              userToken: response.data.token,
              userRole: response.data.user.role,
              createdAt: response.data.user.createdAt,
              profilePictureUrl: response.data.user.profilePictureUrl,
              city: response.data.user.city,
              state: response.data.user.state,
              country: response.data.user.country,
              description: response.data.user.description,
              university: response.data.user.university,
              speciality: response.data.user.speciality,
            });
            setToken(response.data.token);
            router.push("/");
          } else {
            enqueueSnackbar(`Registration failed, status: ${response.status}`, {
              variant: "error",
            });
            console.log("Error found: ", response.data);
          }
        } catch (error) {
          console.log("Error catched :", error);
          enqueueSnackbar("An error occurred during registration", {
            variant: "error",
          });
        }
      };

      if (values.userType == "individual") {
        handleRegister();
      } else if (values.userType == "doctor") {
        setIsModalOpen(true);
        setModalDescription(
          "Your account is detected to be of type doctor. If you agree, this means, that our team will be in touch with you through email to confirm some further information to validate your account."
        );
        setModalButtonDescription("Understood, create my account");
        setModalCallRegister(() => handleRegister);
        console.log("Form submitted", values);
      }
    },
  });

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Register
          </Typography>

          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={formik.handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="John Doe"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.userName && formik.errors.userName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="text-red-500 text-sm">
                {formik.errors.userName}
              </div>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            {/* Password Input */}
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Select User Type
            </Typography>
            <select
              name="userType"
              value={formik.values.userType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-gray-400 ${
                formik.touched.userType && formik.errors.userType
                  ? "border-red-500"
                  : ""
              } p-[0.8rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="individual" label="Individual" />
              <option value="doctor" label="Doctor" />
            </select>
            {formik.touched.userType && formik.errors.userType && (
              <div className="text-red-500 text-sm">
                {formik.errors.userType}
              </div>
            )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              City
            </Typography>
            <Input
              size="lg"
              placeholder="Optional (San Diego)"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={"border-gray-300"}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              State
            </Typography>
            <Input
              size="lg"
              placeholder="Optional (California)"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={"border-gray-300"}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Country
            </Typography>
            <Input
              size="lg"
              placeholder="Optional (United States)"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={"border-gray-300"}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              University
            </Typography>

            <Input
              size="lg"
              placeholder="Optional (Fordham University)"
              name="university"
              value={formik.values.university}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={"border-gray-300"}
            />

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Description
            </Typography>

            <Input
              size="lg"
              placeholder="Optional (...)"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={"border-gray-300"}
            />

            {formik.values.userType === "doctor" && (
              <>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Speciality
                </Typography>

                <Input
                  size="lg"
                  placeholder="Optional (Therapist)"
                  name="speciality"
                  value={formik.values.speciality}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={"border-gray-300"}
                />
              </>
            )}
          </div>

          {/* Submit Button */}
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
        </form>
      </div>

      <div className="w-2/5 max-h-[1300px] hidden lg:block">
        <img
          src="https://i.imgur.com/zykDNnE.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

      {/* Render the modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Additional steps to create a Doctor's account"
        description={modalDescription}
        buttonLabel={modalButtonDescription}
        onButtonClick={modalCallRegister}
      />
    </section>
  );
}

export default Register;
