import Users from '@/models/users';
import { connectMongoDB } from '@/db/mongoDB';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res
        .status(405)
        .json({ error: true, message: 'mehtod tidak diijinkan' });
    }

    console.log(req.headers);

    const token = req.headers.authorization;
    // validasi kosong atau tidak

    if (!token) {
      return res.status(400).json({ error: true, message: 'tidak ada token' });
    }

    // cek apakah user ada
    const user = await Users.findOne({ token });
    console.log('user: ', user);

    // jika user tidak ditemukan
    if (!user || !user.nis) {
      deleteCookie('token', { req, res });

      return res.status(400).json({
        error: true,
        message: 'token tidak valid',
      });
    }

    // cek apakah sebagai admin
    if (user.role !== 1) {
      return res.status(400).json({
        error: true,
        message: 'Anda tidak memiliki hak akses/authorization',
      });
    }

    //@todo hanya dijalankan seklai
    await Users.updateMany({ role: { $exists: false } }, { $set: { role: 0 } }); // hanya dijalankan sekali
    await Users.updateMany(
      { status: { $exists: false } },
      { $set: { status: 1 } }
    ); // hanya dijalankan sekali

    // tampilkan seluruh santri/siswa
    let users = await Users.find({ role: 0 });
    console.log('users: ', users);

    // data yg dikirimkan hanya yg tidak sensitif dan hanya yg perlu saja
    if (users && users.length > 0) {
      users = users.map((data) => {
        return { name: data.name, nis: data.nis, status: data.status };
      });
    }

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.log('error:', error);
    res
      .status(500)
      .json({ error: true, message: 'ada masalah harap hubungi developer' });
  }
}

