export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Define the format options
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // "Mon", "Tue", etc.
    year: "numeric", // "2024"
    month: "short", // "Nov"
    day: "numeric", // "1"
  };

  // Use Intl.DateTimeFormat to format the date
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};
