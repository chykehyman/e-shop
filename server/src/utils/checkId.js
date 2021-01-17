import mongoose from 'mongoose';
import jsonRes from './jsonResponse';

export default (id, field, next) => {
  if (!mongoose.isValidObjectId(id)) {
    return next(jsonRes.error(422, `Invalid ${field} ID`));
  }
};
