import { Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import apiClient from "@/lib/apiClient";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

export function SubscriptionCard() {
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await apiClient.post("/subscribe", {
          email: values.email,
        });

        if (response.status === 200) {
          enqueueSnackbar("Thank you for subscribing!", { variant: "success" });
          resetForm();
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        enqueueSnackbar(
          error?.response?.data?.message || "Subscription failed!",
          { variant: "error" }
        );
      }
    },
  });

  return (
    <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 container max-w-6xl mx-auto rounded-2xl p-5 ">
      <Typography
        className="text-2xl md:text-3xl text-center font-bold "
        color="white"
      >
        Join our community!
      </Typography>
      <Typography
        color="white"
        className=" md:w-7/12 text-center my-3 !text-base"
      >
        Get news in your inbox every week! We hate spam too, so no worries about
        this.
      </Typography>
      {/* <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="w-80">

          <Input label="Email" color="white" />
        </div>
        <Button size="md" className="lg:w-32" fullWidth color="white">
          subscribe
        </Button>
      </div> */}

      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row"
      >
        <div className="w-80">
          <Input
            label="Email"
            color="white"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <Button
          type="submit"
          size="md"
          className="lg:w-32"
          fullWidth
          color="white"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm mt-2">{formik.errors.email}</div>
      )}
    </div>
  );
}

export default SubscriptionCard;
