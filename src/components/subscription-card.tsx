import {
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";

export function SubscriptionCard() {
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
  );
}

export default SubscriptionCard;
