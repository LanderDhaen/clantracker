export const months = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
};

export const monthLabel = {
  [months.JANUARY]: "Jan",
  [months.FEBRUARY]: "Feb",
  [months.MARCH]: "Mar",
  [months.APRIL]: "Apr",
  [months.MAY]: "May",
  [months.JUNE]: "Jun",
  [months.JULY]: "Jul",
  [months.AUGUST]: "Aug",
  [months.SEPTEMBER]: "Sep",
  [months.OCTOBER]: "Oct",
  [months.NOVEMBER]: "Nov",
  [months.DECEMBER]: "Dec",
};

export const formatMonth = (month) => monthLabel[month];
