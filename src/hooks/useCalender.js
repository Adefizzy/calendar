/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import nextId from "react-id-generator";

import getDate from "../utils/getDate";
import getMonth from "../utils/getMonth";
import getYear from "../utils/getYear";

const useCalender = () => {
  const [allEvents, setEvents] = useState([]);
  const [presentCalender, setPresentCalender] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    weeks: [],
  });

  const [futureCalender, setFutureCalender] = useState({
    year: getYear(new Date().getFullYear(), new Date().getMonth() + 1),
    month: getMonth(new Date().getMonth() + 1),
    weeks: [],
  });

  useEffect(() => {
    const presentCalenderWeeks = getWeeks(
      presentCalender.year,
      presentCalender.month
    );
    setPresentCalender((prevState) => ({
      ...prevState,
      weeks: presentCalenderWeeks,
    }));
    const fullCalenderWeeks = getWeeks(
      futureCalender.year,
      futureCalender.month
    );
    setFutureCalender((prevState) => ({
      ...prevState,
      weeks: fullCalenderWeeks,
    }));
  }, []);

  const updateDayWithEvent = ({ weeks, year, month }) => {
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
        if (events.length > 0) {
          day.events = events;
        }

        return day;
      });
    });

    return {
      year,
      month,
      weeks: updatedWeeks,
    };
  };

  useEffect(() => {
    if (allEvents.length > 0 || presentCalender.weeks.length > 0) {
      setPresentCalender(updateDayWithEvent(presentCalender));
    }
  }, [allEvents, presentCalender.month, presentCalender.year]);

  const getWeeks = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const totalDaysOfPreviousMonth = new Date(
      getYear(year, month),
      getMonth(month),
      0
    ).getDate();
    const exactFirstDayOfWeek = firstDay.getDay();

    const weeks = [];

    let week = [];

    // fill this month first week with last month's last week days.
    if (weeks.length === 0) {
      for (let i = 0; i < exactFirstDayOfWeek; i++) {
        week.push({
          day: totalDaysOfPreviousMonth - (exactFirstDayOfWeek - 1 - i),
          isactive: false,
          events: [],
          isMuted: true,
        });
      }
    }

    // fill each week with the number of days in the month.
    for (let day = 1; day <= totalDays; day++) {
      week.push({ day, isactive: false, events: [] });

      if (week.length === 7 || day === totalDays) {
        weeks.push(week);
        week = [];
      }
    }

    // fill the spaces in the last week of this month.
    const lastweek = weeks.pop();
    let additionalDays = 1;
    while (lastweek.length < 7) {
      lastweek.push({
        day: additionalDays++,
        isactive: false,
        events: [],
        isMuted: true,
      });
    }
    weeks.push(lastweek);

    return weeks;
  };

  function gotoPast() {
    const currentPresentCalender = { ...presentCalender };
    const currentFutureCalender = { ...futureCalender };

    const presentMonth = currentPresentCalender.month - 1;
    const futureMonth = currentFutureCalender.month - 1;

    setPresentCalender({
      year: getYear(currentPresentCalender.year, presentMonth),
      month: getMonth(presentMonth),
      weeks: getWeeks(
        getYear(currentPresentCalender.year, presentMonth),
        getMonth(presentMonth)
      ),
    });

    setFutureCalender({
      year: getYear(currentFutureCalender.year, futureMonth),
      month: getMonth(futureMonth),
      weeks: getWeeks(
        getYear(currentFutureCalender.year, futureMonth),
        getMonth(futureMonth)
      ),
    });
  }

  function gotoFuture() {
    const currentPresentCalender = { ...presentCalender };
    const currentFutureCalender = { ...futureCalender };

    const presentMonth = currentPresentCalender.month + 1;
    const futureMonth = currentFutureCalender.month + 1;

    setPresentCalender({
      year: getYear(currentPresentCalender.year, presentMonth),
      month: getMonth(presentMonth),
      weeks: getWeeks(
        getYear(currentPresentCalender.year, presentMonth),
        getMonth(presentMonth)
      ),
    });

    setFutureCalender({
      year: getYear(currentFutureCalender.year, futureMonth),
      month: getMonth(futureMonth),
      weeks: getWeeks(
        getYear(currentFutureCalender.year, futureMonth),
        getMonth(futureMonth)
      ),
    });
  }

  const addEvent = (event) => {
    if (event.isEdit) {
      const updatedEvent = [...allEvents].map((evt) => {
        if (evt.id === event.id) {
          return event;
        }
        return evt;
      });
      setEvents(updatedEvent);
    } else {
      setEvents([...allEvents, { ...event, id: nextId() }]);
    }
  };

  return {
    gotoPast,
    gotoFuture,
    presentCalender,
    futureCalender,
    addEvent,
  };
};

export default useCalender;
