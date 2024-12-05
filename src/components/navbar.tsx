import React, { useEffect } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  XMarkIcon,
  Bars3Icon,
  DocumentPlusIcon,
} from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation"; // Use `next/navigation` in Next.js 13+

import Image from "next/image";
import Link from "next/link";
import logo from "../app/images/serenity-space-png.png";
import { useUser } from "@/app/context/userContext";

const NAV_MENU = [
  {
    name: "Homepage",
    icon: RectangleStackIcon,
    route: "/",
  },
  {
    name: "Articles",
    icon: Bars3Icon, // Icon for Sections
    isDropdown: true,
    dropdownOptions: [
      { name: "Sleep", route: "/feed/sleep" },
      { name: "Anxiety", route: "/feed/anxiety" },
      { name: "Stress", route: "/feed/stress" },
      { name: "Eating Disorders", route: "/feed/eating-disorders" },
      { name: "Cognitive Health", route: "/feed/cognitive-health" },
    ],
  },
  {
    name: "About us",
    icon: InformationCircleIcon,
    route: "/about",
  },
  {
    name: "Create a post",
    icon: DocumentPlusIcon,
    route: "/add-post",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

function NavItem({ children, href, onClick }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        // href={href || "#"}
        href={href}
        // target={href ? "_blank" : "_self"}
        onClick={onClick}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900 cursor-pointer"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { userContext, setUserContext } = useUser();

  const handleGoToAccountClick = () => {
    router.push(`/profile/${userContext.userId}`); // Navigate to the "create account" page
  };

  const handleGoToLogin = () => {
    router.push("/login"); // Navigate to the "create account" page
  };

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );

    if (!router) {
      console.error("Router not initialized");
    }
  }, [router]);

  return (
    <MTNavbar shadow={false} fullWidth className="border-0 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <div className="flex justify-center items-center">
            <Image
              src={logo} // Pass the imported logo here
              alt="Serenity Space"
              width={160} // Set the width
              className="object-contain mt-1" // Ensure the aspect ratio is preserved
            />
          </div>
        </Link>

        {/* Sections */}

        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(
            ({ name, icon: Icon, route, isDropdown, dropdownOptions }) => {
              // Check if the nav item is "Create a post" and if the user is not a doctor
              if (
                name === "Create a post" &&
                userContext.userRole !== "doctor"
              ) {
                return null; // Don't render the item
              }
              if (name === "About us") {
                return (
                  <NavItem
                    key={name}
                    href="https://github.com/albertbaezd/nosql-healthcare-project-backend"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{name}</span>
                  </NavItem>
                ); // Don't render the item
              }

              return (
                <li className="relative group" key={name}>
                  {isDropdown ? (
                    <>
                      <div className="relative group">
                        <div className="flex items-center space-x-2 cursor-pointer text-black">
                          <Icon className="h-5 w-5" />
                          <span>{name}</span>
                        </div>

                        {/* Dropdown menu */}
                        <div className="absolute left-0 hidden mt-2 w-40 bg-white rounded-md shadow-lg group-hover:flex flex-col top-[10px] pt-2.5 px-2.5">
                          <ul className="py-1">
                            {dropdownOptions.map((option) => (
                              <NavItem key={option.name}>
                                <span
                                  className="pt-2.5"
                                  onClick={() => handleNavigation(option.route)}
                                >
                                  {option.name}
                                </span>
                              </NavItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <NavItem key={name} onClick={() => handleNavigation(route)}>
                      <Icon className="h-5 w-5" />
                      <span>{name}</span>
                    </NavItem>
                  )}
                </li>
              );
            }
          )}
        </ul>

        {/* Profile */}
        <div className="hidden items-center gap-2 lg:flex">
          <a target="_blank">
            {userContext.userId !== null ? (
              <Button color="gray" onClick={handleGoToAccountClick}>
                Profile
              </Button>
            ) : (
              <Button color="gray" onClick={handleGoToLogin}>
                Login
              </Button>
            )}
          </a>
        </div>
        <IconButton
          variant="text"
          color="gray"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <ul className="flex flex-col gap-4">
            {NAV_MENU.map(({ name, icon: Icon }) => (
              <NavItem key={name}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 mb-4 flex items-center gap-2">
            <a target="_blank">
              {userContext.userId !== null ? (
                <Button color="gray" onClick={handleGoToAccountClick}>
                  Profile
                </Button>
              ) : (
                <Button color="gray" onClick={handleGoToLogin}>
                  Login
                </Button>
              )}
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
