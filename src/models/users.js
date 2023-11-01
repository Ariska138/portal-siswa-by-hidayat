import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nis: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: '',
  },
});

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
