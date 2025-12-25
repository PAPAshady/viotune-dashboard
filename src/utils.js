// an utility function to convert milliseconds into currect time format
export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const fomrattedMinsAndSeconds = `${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (hours) {
    const formattedHours = `${hours.toString().padStart(2, '0')}:`;
    return formattedHours + fomrattedMinsAndSeconds;
  }

  return fomrattedMinsAndSeconds;
};
