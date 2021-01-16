import mongoose from 'mongoose';
import jsonRes from './jsonResponse';

export default (id, next) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(jsonRes.error(422, 'Invalid category ID'));
  }
};
