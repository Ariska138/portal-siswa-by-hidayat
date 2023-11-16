import Users from '@/models/users';
import { connectMongoDB } from '@/db/mongoDB';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ error: true, message: 'mehtod tidak diijinkan' });
    }

    const { token } = req.body;
    // validasi kosong atau tidak

    if (!token) {
      return res.status(400).json({ error: true, message: 'tidak ada token' });
    }

    // cek apakah user ada
    const user = await Users.findOne({ token });
    console.log('user: ', user);

    if (!user || !user.nis) {
      deleteCookie('token', { req, res });

      return res.status(400).json({
        error: true,
        message: 'token tidak valid',
      });
    }

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(200).json({
      id: user.id,
      nis: user.nis,
      name: user.name,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.log('error:', error);
    res
      .status(500)
      .json({ error: true, message: 'ada masalah harap hubungi developer' });
  }
}

