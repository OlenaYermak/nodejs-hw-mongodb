import { sortOrderList } from '../constants/index.js';

const parseSortParams = ({ sortBy, sortOrder }, fieldList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];

  const parsedSortBy = fieldList.includes(sortBy) ? sortBy : fieldList[0];

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

export default parseSortParams;
