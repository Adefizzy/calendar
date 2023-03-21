const getDate = (dateAndTime) => {
  const date = dateAndTime ? dateAndTime.split("T")[0]?.split("-") : [];

  return {
    year: parseInt(date[0]),
    month: parseInt(date[1]),
    day: parseInt(date[2]),
  };
};

export default getDate;
