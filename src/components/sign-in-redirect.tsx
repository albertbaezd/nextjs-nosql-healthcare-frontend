"use client"; // Ensure this component is client-side

import { useRouter } from "next/navigation"; // Use `next/navigation` in Next.js 13+
import { useEffect } from "react";
import { Typography } from "@material-tailwind/react";

export function SignInRedirect() {
  const router = useRouter();

  // We can safely use router only after the component has been mounted
  const handleCreateAccountClick = () => {
    router.push("/register"); // Navigate to the "create account" page
  };

  useEffect(() => {
    // Check if the router is ready before using it
    if (!router) {
      console.error("Router not initialized");
    }
  }, [router]); // Effect hook to ensure router is initialized

  return (
    <Typography
      variant="paragraph"
      className="text-center text-blue-gray-500 font-medium mt-4"
    >
      Not registered?{" "}
      <span
        onClick={handleCreateAccountClick}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        Create account
      </span>
    </Typography>
  );
}
