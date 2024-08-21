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
