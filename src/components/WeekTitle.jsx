import { StyledTitleBox } from "../styles/calendar";
import { deviceSizes } from "../utils/breakPoints";

const WeekTitle = ({ day }) => {
  return (
    <StyledTitleBox>
      {window.innerWidth <= deviceSizes.tablet ? day.charAt(0) : day}
    </StyledTitleBox>
  );
};

export default WeekTitle;
