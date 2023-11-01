import { generateRandomToken } from '@/utils/RandomToken';
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ppqita:santri@ppqitadb.76fharf.mongodb.net/portal-siswa',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

connectMongoDB();

const Users = mongoose.model(
  'user', // akan jadi collection dengan nama users ketika disubmit di db
  new mongoose.Schema({
    id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    nis: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: '',
    },
  })
);

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ error: true, message: 'mehtod tidak diijinkan' });
    }

    const { nis, password } = req.body;
    // validasi kosong atau tidak

    if (!nis) {
      return res.status(400).json({ error: true, message: 'tidak ada NIS' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: 'tidak ada Password' });
    }

    // validasi sesuai kreteria atau tidak

    if (nis.length !== 5) {
      return res.status(400).json({
        error: true,
        message: 'nis harus 5 karakter',
      });
    }

    if (password.length < 6 || password.length >= 10) {
      return res.status(400).json({
        error: true,
        message: 'password harus diantar 6 sampai 10 karakter',
      });
    }
    // cek apakah user ada
    const user = await Users.findOne({ nis, password });

    console.log('user: ', user);

    if (!user || !user.nis) {
      return res.status(400).json({
        error: true,
        message: 'user tidak ditemukan',
      });
    }

    // lengkapi data yg kurang
    const token = generateRandomToken(10);

    // jika sudah sesuai simpan
    const users = await Users.findOneAndUpdate(
      { nis, password },
      { token },
      { new: true }
    );
    console.log('users after update: ', users);

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(200).json({ token });
  } catch (error) {
    console.log('error:', error);
    res
      .status(500)
      .json({ error: true, message: 'ada masalah harap hubungi developer' });
  }
}

