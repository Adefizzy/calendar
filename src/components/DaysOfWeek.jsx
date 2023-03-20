import { StyledCalenderBox } from "../styles/calendar";
import SameDayOfWeek from "./SameDayOfWeek";

const DaysOfWeek = (props) => {
  const getDays = (index) => {
    return props.weeks.reduce((prevValue, currValue) => {
      return [...prevValue, currValue[index]];
    }, []);
  };

  return (
    <StyledCalenderBox>
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(0)}
        day="Sunday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(1)}
        day="Monday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(2)}
        day="Tuesday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(3)}
        day="Wednesday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(4)}
        day="Thursday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(5)}
        day="Friday"
      />
      <SameDayOfWeek
        openModal={props.openModal}
        days={getDays(6)}
        day="Saturday"
      />
    </StyledCalenderBox>
  );
};

export default DaysOfWeek;
