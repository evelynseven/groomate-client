const dateFormatter = (text: string) => {
  const dateTime = new Date(text);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateTime.getMonth()];
  const day = dateTime.getDate();
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const formattedDate = `${month} ${day}, ${year} ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return formattedDate;
};

export default dateFormatter;
