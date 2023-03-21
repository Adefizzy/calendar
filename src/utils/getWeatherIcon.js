import {
  TiWeatherCloudy,
  TiWeatherPartlySunny,
  TiWeatherDownpour,
  TiWeatherSnow,
} from "react-icons/ti";
import { WiDaySnowThunderstorm, WiCloudy } from "react-icons/wi";

const getWeatherIcon = (text) => {
  if (!text) return WiCloudy;
  const regex = new RegExp(text, "ig");
  if (regex.test("cloudy")) {
    return TiWeatherCloudy;
  } else if (regex.test("sunny")) {
    return TiWeatherPartlySunny;
  } else if (regex.test("rain")) {
    return TiWeatherDownpour;
  } else if (regex.test("snow")) {
    return TiWeatherSnow;
  } else return WiDaySnowThunderstorm;
};

export default getWeatherIcon;
