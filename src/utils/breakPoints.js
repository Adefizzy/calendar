const size = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export const deviceSizes = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

export default device;
