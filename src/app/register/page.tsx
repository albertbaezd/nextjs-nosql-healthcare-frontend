"use client";
// page.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import Modal from "../../components/Modal";

const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  userType: Yup.string().required("User type is required"),
});

export function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalButtonDescription, setModalButtonDescription] = useState("");
  const [modalCallRegister, setModalCallRegister] = useState<() => void>(
    () => {}
  );

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      userType: "",
    },
    validationSchema, // Adding Yup validation
    onSubmit: async (values) => {
      // Your submit logic goes here
      console.log("Form submitted", values);

      const handleRegister = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              name: values.userName,
              email: values.email,
              password: values.password,
              role: values.userType,
            }
          );

          if (response.status === 201) {
            enqueueSnackbar("Registration successful", { variant: "success" });
            router.push("/");
          } else {
            enqueueSnackbar(`Registration failed, status: ${response.status}`, {
              variant: "error",
            });
          }
        } catch (error) {
          console.log("Error:", error);
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
          {/* Email Input */}
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
              name="userName" // Bind the input to Formik's state
              value={formik.values.userName} // Formik's value
              onChange={formik.handleChange} // Formik's handleChange
              onBlur={formik.handleBlur} // Formik's handleBlur
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
              name="email" // Bind the input to Formik's state
              value={formik.values.email} // Formik's value
              onChange={formik.handleChange} // Formik's handleChange
              onBlur={formik.handleBlur} // Formik's handleBlur
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
              name="password" // Bind the input to Formik's state
              value={formik.values.password} // Formik's value
              onChange={formik.handleChange} // Formik's handleChange
              onBlur={formik.handleBlur} // Formik's handleBlur
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
          </div>

          {/* Submit Button */}
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
        </form>
      </div>

      <div className="w-2/5 max-h-[830px] hidden lg:block">
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
