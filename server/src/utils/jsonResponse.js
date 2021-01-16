import errorResponseInstance from './errorResponse';

export default {
  success(res, code, message, payload = null) {
    res.status(code).json({
      status: 'Success',
      message,
      payload,
    });
  },
  error: (code, message) => errorResponseInstance(message, code),
};
