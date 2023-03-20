function getMonth(month) {
  if (month < 0) {
    return 11;
  }

  if (month > 11) {
    return 0;
  }

  return month;
}

export default getMonth;
