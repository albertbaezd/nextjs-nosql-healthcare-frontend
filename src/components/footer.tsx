import { Typography, IconButton } from "@material-tailwind/react";

import SubscriptionCard from "./subscription-card";

const CURRENT_YEAR = new Date().getFullYear();

type FooterProps = {
  omitSubscription?: boolean; // Optional prop
};

export function Footer({ omitSubscription = false }: FooterProps) {
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        {!omitSubscription && <SubscriptionCard />}

        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography
            as="a"
            href="https://github.com/albertbaezd/nosql-healthcare-project-backend"
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
