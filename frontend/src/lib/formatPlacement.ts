export const formatPlacement = (placement: number) => {
  switch (placement) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return `${placement}th`;
  }
};
