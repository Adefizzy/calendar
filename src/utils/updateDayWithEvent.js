import getDate from "./getDate";

const updateDayWithEvent = (allEvents, { weeks, year, month }) => {
  const updatedWeeks = weeks.map((week) => {
    return week.map((day) => {
      const events = allEvents.filter((event) => {
        const dateObj = getDate(event.dateAndTime);

        return (
          day.day === dateObj.day &&
          month + 1 === dateObj.month &&
          year === dateObj.year
        );
      });

      day.events = events;

      return day;
    });
  });

  return {
    year,
    month,
    weeks: updatedWeeks,
  };
};

export default updateDayWithEvent;
