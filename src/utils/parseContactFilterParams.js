const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;

  return value === 'true';
};

const parseContactFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = ['personal', 'home', 'other'].includes(contactType)
    ? contactType
    : null;
  const parsedFavorite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavorite,
  };
};

export default parseContactFilterParams;
