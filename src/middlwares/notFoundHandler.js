import createError from 'http-errors';

const notFoundHandler = (req, res, next) => {
  next(createError(res.status(404).json({ message: 'Route not found' })));
};

export default notFoundHandler;
