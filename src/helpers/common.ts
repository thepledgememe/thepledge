import BigNumber from "bignumber.js";

export function timeLeftBetweenDates(startDate: Date, endDate: Date): string {
  // Convert dates to timestamps
  const start = startDate.getTime();
  const end = endDate.getTime();

  // Calculate the time difference in seconds
  const diffInSeconds = Math.max(0, Math.floor((end - start) / 1000));

  if (diffInSeconds <= 0) {
    return "Open Now";
  }

  // Calculate the time components
  const days = Math.floor(diffInSeconds / (24 * 3600));
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds;

  // Show only the largest unit left
  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"}`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else {
    return `${seconds} second${seconds === 1 ? "" : "s"}`;
  }
}

export function pledgerAmountToNumber(pledgerAmount: string | number): number {
  return BigNumber(pledgerAmount)
    .div(10 ** 18)
    .dp(0)
    .toNumber();
}

export function calculateDaysSince(date) {
  const givenDate: Date = new Date(date);
  const currentDate: Date = new Date();

  const timeDifference = currentDate.getTime() - givenDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
