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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// const handleSubmit = async (values: { email: string; password: string }) => {
//   try {
//     // Use the environment variable for the API URL
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/auth/login`, // URL from env variable
//       values // The payload (values) will automatically be sent as JSON
//     );

//     // Handle success (e.g., redirect, store token, etc.)
//     console.log("Signed in successfully", response.data);
//   } catch (error) {
//     // Handle error
//     if (axios.isAxiosError(error)) {
//       // This is an Axios error
//       console.error(
//         "An error occurred during sign-in:",
//         error.response?.data || error.message
//       );
//     } else {
//       // This is not an Axios error (could be something else)
//       console.error("Unexpected error during sign-in:", error);
//     }
//   }
// };

export function SignIn() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          values
        );

        if (response.status === 201) {
          enqueueSnackbar("Login successful", { variant: "success" });
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
    // <section className="m-8 flex gap-4">
    //   <div className="w-2/5 h-full hidden lg:block">
    //     <img
    //       src="https://i.imgur.com/U3QktuO.jpeg"
    //       className="h-full w-full object-cover rounded-3xl"
    //     />
    //   </div>

    //   <div className="w-full lg:w-3/5 mt-24">
    //     <div className="text-center">
    //       <Typography variant="h2" className="font-bold mb-4">
    //         Sign In
    //       </Typography>
    //       <Typography
    //         variant="paragraph"
    //         color="blue-gray"
    //         className="text-lg font-normal"
    //       >
    //         Enter your email and password to Sign In.
    //       </Typography>
    //     </div>

    //     <Formik
    //       initialValues={{ email: "", password: "" }}
    //       validationSchema={validationSchema}
    //     >
    //       {({ setFieldValue }) => (
    //         <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
    //           <div className="mb-1 flex flex-col gap-6">
    //             <Typography
    //               variant="small"
    //               color="blue-gray"
    //               className="-mb-3 font-medium"
    //             >
    //               Your email
    //             </Typography>
    //             <Field
    //               name="email"
    //               type="email"
    //               placeholder="name@mail.com"
    //               className="border border-gray-300 focus:border-gray-500 rounded-md p-2 w-full" // Customize your class as needed
    //             />
    //             <ErrorMessage
    //               name="email"
    //               component="div"
    //               className="text-red-500"
    //             />

    //             <Typography
    //               variant="small"
    //               color="blue-gray"
    //               className="-mb-3 font-medium"
    //             >
    //               Password
    //             </Typography>
    //             <Field
    //               name="password"
    //               type="password"
    //               placeholder="********"
    //               className="border border-gray-300 focus:border-gray-500 rounded-md p-2 w-full" // Customize your class as needed
    //             />
    //             <ErrorMessage
    //               name="password"
    //               component="div"
    //               className="text-red-500"
    //             />
    //           </div>

    //           <Button className="mt-6" fullWidth type="submit">
    //             Sign In
    //           </Button>

    //           <div className="space-y-4 mt-8"></div>
    //           <SignInRedirect />
    //         </Form>
    //       )}
    //     </Formik>
    //   </div>
    // </section>
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
