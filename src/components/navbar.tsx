import React from "react";
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
} from "@heroicons/react/24/solid";

import Image from "next/image";
import Link from "next/link";
import logo from "../app/images/serenity-space-png.png";

const NAV_MENU = [
  {
    name: "Homepage",
    icon: RectangleStackIcon,
  },
  {
    name: "Articles",
    icon: Bars3Icon, // Icon for Sections
    isDropdown: true,
    dropdownOptions: [
      { name: "Sleep", href: "/#" },
      { name: "Anxiety", href: "/#" },
      { name: "Stress", href: "/#" },
      { name: "Eating Disorders", href: "/#" },
      { name: "Cognitive Health", href: "/#" },
    ],
  },
  {
    name: "About us",
    icon: InformationCircleIcon,
  },
  {
    name: "Contact",
    icon: EnvelopeIcon,
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="paragraph"
        color="gray"
        className="flex items-center gap-2 font-medium text-gray-900"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

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

        {/* <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              {name}
            </NavItem>
          ))}
        </ul> */}

        <ul className="ml-10 hidden items-center gap-8 lg:flex">
          {NAV_MENU.map(
            ({ name, icon: Icon, href, isDropdown, dropdownOptions }) => (
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
                            <NavItem key={option.name} href={option.href}>
                              <span className="pt-2.5 ">{option.name}</span>
                            </NavItem>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavItem>
                )}
              </li>
            )
          )}
        </ul>

        {/* Profile */}
        <div className="hidden items-center gap-2 lg:flex">
          <a href="https://www.material-tailwind.com/blocks" target="_blank">
            <Button color="gray">Profile</Button>
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
            <a href="https://www.material-tailwind.com/blocks" target="_blank">
              <Button color="gray">Profile</Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
