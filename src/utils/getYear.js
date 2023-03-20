function getYear(year, month) {
  if (month < 0) {
    return year - 1;
  }

  if (month > 11) {
    return year + 1;
  }

  return year;
}

export default getYear;
