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

let UserModel;
// fix overwrite user
if (mongoose.models.User) {
  UserModel = mongoose.model('User');
} else {
  UserModel = mongoose.model('User', userSchema);
}

export default UserModel;
