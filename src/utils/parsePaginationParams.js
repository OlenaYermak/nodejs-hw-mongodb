const parsedNumber = (value, defaultValue) => {
  if (typeof value !== 'string') {
    return defaultValue;
  }

  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) {
    return defaultValue;
  }
  return parsedValue;
};

// const parsePaginationParams = ({ page, perPage }) => {
//   let normalizedPage = page;

//   if (typeof page !== 'string') {
//     normalizedPage = 1;
//   }
//   const parsePage = parseInt(page);
//   if (Number.isNaN(parsePage)) {
//     normalizedPage = 1;
//   }
// };

const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parsedNumber(page, 1);
  const parsedPerPage = parsedNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationParams;
