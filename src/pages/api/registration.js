import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import Users from '@/models/users';

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

export default async function handler(req, res) {
  try {
    // pengecekan method
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ error: true, message: 'mehtod tidak diijinkan' });
    }

    const { name, nis, password } = req.body;
    // validasi dari client (ada atau tidak)
    if (!name) {
      return res.status(400).json({ error: true, message: 'tidak ada Nama' });
    }

    if (!nis) {
      return res.status(400).json({ error: true, message: 'tidak ada NIS' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: 'tidak ada Password' });
    }

    // validasi sesuai kreteria atau tidak
    if (name.length < 3 || name.length >= 20) {
      return res.status(400).json({
        error: true,
        message: 'name harus diantar 3 sampai 20 karakter',
      });
    }

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
    // cek apakah id atau nis sudah digunakan
    const user = await Users.findOne({ nis });
    console.log('user: ', user);

    if (user && user.nis) {
      return res.status(400).json({
        error: true,
        message: 'nis sudah pernah didaftarkan',
      });
    }

    // lengkapi data yg kurang
    const id = uuid();

    const data = { id, name, nis, password };

    // jika sudah sesuai simpan
    const users = new Users(data);
    await users.save();

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(201).json({ id: users.id, nis: users.nis });
  } catch (error) {
    console.log('error:', error);
    res
      .status(500)
      .json({ error: true, message: 'ada masalah harap hubungi developer' });
  }
}

