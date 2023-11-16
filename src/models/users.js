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
  role: {
    // 0: santri/anggota, 1: adalah admin
    type: Number,
    default: 0,
  },
  status: {
    // 0: tidak aktif, sedangkan 1: aktif
    type: Number,
    default: 1,
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
