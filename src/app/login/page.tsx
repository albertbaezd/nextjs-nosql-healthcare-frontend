"use client";
// page.tsx
import { SignInRedirect } from "../../components/sign-in-redirect"; // Import the new redirect component
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useUser } from "../context/userContext";

interface userLoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignIn() {
  const router = useRouter();
  const { userContext, setUserContext } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post<userLoginResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          values
        );

        if (response.status === 200) {
          console.log(response.data);
          enqueueSnackbar("Login successful", { variant: "success" });

          // Updating global user context
          setUserContext({
            userId: response.data.user.id,
            userName: response.data.user.name,
            userEmail: response.data.user.email,
            userToken: response.data.token,
          });
          router.push("/");
        } else {
          enqueueSnackbar(`Login failed, status: ${response.status}`, {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar("Failed to sign in. Please try again.", {
          variant: "error",
        });
        console.error("Error during sign-in:", error);
      }
    },
  });

  return (
    <section className="m-8 flex gap-4">
      <div className="w-2/5 hidden lg:block">
        <img
          src="https://i.imgur.com/U3QktuO.jpeg"
          alt="Sign In Illustration"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <h2 className="font-bold mb-4 text-3xl">Sign In</h2>
          <p className="text-lg font-normal text-blue-gray-700">
            Enter your email and password to Sign In.
          </p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 w-full max-w-md mx-auto"
        >
          <div className="mb-4 flex flex-col gap-4">
            <label htmlFor="email" className="text-blue-gray-700 font-medium">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@email.com"
              className="border border-gray-300 focus:border-gray-600 focus:bg-white rounded-md p-2 w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}

            <label
              htmlFor="password"
              className="text-blue-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="border border-gray-300 focus:border-gray-600 rounded-md p-2 w-full"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Sign In
          </button>

          <div className="mt-8">
            <SignInRedirect />
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
