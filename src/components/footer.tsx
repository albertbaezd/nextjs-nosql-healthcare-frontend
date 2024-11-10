import {
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";

import { CommandLineIcon } from "@heroicons/react/24/solid";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
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
            Get news in your inbox every week! We hate spam too, so no worries
            about this.
          </Typography>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="w-80">
              {/* @ts-ignore */}
              <Input label="Email" color="white" />
            </div>
            <Button size="md" className="lg:w-32" fullWidth color="white">
              subscribe
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography
            as="a"
            href="https://www.material-tailwind.com"
            target="_blank"
            variant="h6"
            className="text-gray-900"
          >
            Serenity Space
          </Typography>

          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-youtube text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-instagram text-lg" />
            </IconButton>
            <a
              href="https://github.com/albertbaezd/nosql-healthcare-project-backend"
              target="_blank"
              className="flex items-center"
            >
              <IconButton size="sm" color="gray" variant="text">
                <i className="fa-brands fa-github text-lg" />
              </IconButton>
            </a>
          </div>
        </div>

        <Typography
          color="blue-gray"
          className="flex justify-center items-center text-center mt-1 font-normal !text-gray-700"
        >
          &copy; {CURRENT_YEAR} Made with
          <a
            href="https://www.material-tailwind.com"
            target="_blank"
            className="mx-2 text-blue-700"
          >
            React JS, Material Tailwind
          </a>
          <span>by</span>
          <a
            href="https://github.com/albertbaezd/nosql-healthcare-project-backend"
            target="_blank"
            className="flex items-center"
          >
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-github text-lg" />
            </IconButton>
            <span className="text-blue-700">Carlos, Saira and Albert</span>
          </a>
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
