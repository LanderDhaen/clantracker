export const colorChart = (nationality: string) => {
  switch (nationality) {
    case "Belgian":
      return "#364F7C";
    case "Dutch":
      return "#0077FF";
    default:
      return "#000000";
  }
};
