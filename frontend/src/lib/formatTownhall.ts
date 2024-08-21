export const formatTownhall = (townhall: number) => {
  if (townhall <= 8) return "bg-orange-200 ";
  if (townhall === 9) return "bg-gray-400";
  if (townhall === 10) return "bg-red-400";
  if (townhall === 11) return "bg-yellow-400";
  if (townhall === 12) return "bg-blue-300";
  if (townhall === 13) return "bg-blue-500";
  if (townhall === 14) return "bg-green-500";
  if (townhall === 15) return "bg-purple-500";
  if (townhall === 16) return "bg-orange-500";
  return "";
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
