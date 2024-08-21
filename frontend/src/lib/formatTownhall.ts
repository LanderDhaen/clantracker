export const colorTownhall = (townhall: number) => {
  switch (townhall) {
    case 9:
      return "bg-gray-400";
    case 10:
      return "bg-red-400";
    case 11:
      return "bg-yellow-400";
    case 12:
      return "bg-blue-300";
    case 13:
      return "bg-blue-500";
    case 14:
      return "bg-green-600";
    case 15:
      return "bg-purple-500";
    case 16:
      return "bg-orange-500";
    default:
      return "bg-orange-200";
  }
};

export const colorChart = (townhall: number) => {
  switch (townhall) {
    case 9:
      return "#B9B9B9";
    case 10:
      return "#FC8181";
    case 11:
      return "#F6E05E";
    case 12:
      return "#90CDF4";
    case 13:
      return "#3182CE";
    case 14:
      return "#48BB78";
    case 15:
      return "#9F7AEA";
    case 16:
      return "#ED8936";
    default:
      return "#FBD38D";
  }
};
