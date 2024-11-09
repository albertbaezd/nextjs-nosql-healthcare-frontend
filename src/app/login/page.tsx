"use client";
// page.tsx
import { SignInRedirect } from "../../components/sign-in-redirect"; // Import the new redirect component
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Define your submit handler
const handleSubmit = async (values: { email: string; password: string }) => {
  try {
    // Use the environment variable for the API URL
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, // URL from env variable
      values // The payload (values) will automatically be sent as JSON
    );

    // Handle success (e.g., redirect, store token, etc.)
    console.log("Signed in successfully", response.data);
  } catch (error) {
    // Handle error
    if (axios.isAxiosError(error)) {
      // This is an Axios error
      console.error(
        "An error occurred during sign-in:",
        error.response?.data || error.message
      );
    } else {
      // This is not an Axios error (could be something else)
      console.error("Unexpected error during sign-in:", error);
    }
  }
};

export function SignIn() {
  return (
    <section className="m-8 flex gap-4">
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="https://i.imgur.com/U3QktuO.jpeg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        {/* <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
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
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth>
            Sign In
          </Button>

          <div className="space-y-4 mt-8"></div>
          <SignInRedirect />
        </form> */}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Your email
                </Typography>
                <Field
                  name="email"
                  type="email"
                  placeholder="name@mail.com"
                  className="border border-gray-300 focus:border-gray-500 rounded-md p-2 w-full" // Customize your class as needed
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Field
                  name="password"
                  type="password"
                  placeholder="********"
                  className="border border-gray-300 focus:border-gray-500 rounded-md p-2 w-full" // Customize your class as needed
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <Button className="mt-6" fullWidth type="submit">
                Sign In
              </Button>

              <div className="space-y-4 mt-8"></div>
              <SignInRedirect />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default SignIn;
