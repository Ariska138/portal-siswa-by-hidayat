import Users from '@/models/users';
import Tasks from '@/models/tasks';
import { connectMongoDB } from '@/db/mongoDB';
connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res
        .status(405)
        .json({ error: true, message: 'mehtod tidak diijinkan' });
    }

    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ error: true, message: 'tidak ada token' });
    }

    // cek apakah user ada
    const user = await Users.findOne({ token });
    console.log('user: ', user);

    // jika user tidak ditemukan
    if (!user || !user.nis) {
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

    const { date, deadline, link, note } = req.body;

    if (!date || !deadline || !link) {
      return res.status(400).json({
        error: true,
        message: 'Berkas yg Anda kirimkan belum lengkap',
      });
    }

    // siapkan data yg akan disimpan
    const data = { date, deadline, note, link, teacher_id: user.id, status: 1 };

    // jika sudah sesuai simpan
    const tasks = new Tasks(data);
    await tasks.save();

    return res.status(201).json({ message: 'Data sudah berhasil diinputkan' });
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Silahkan hubungi tem support' });
  }
}
