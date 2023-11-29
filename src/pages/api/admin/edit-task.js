import Users from '@/models/users';
import Tasks from '@/models/tasks';
import { connectMongoDB } from '@/db/mongoDB';
connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== 'PUT') {
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

    const taskId = req.query.id;
    if (!taskId) {
      return res
        .status(400)
        .json({ error: true, message: 'ID tugas tidak diberikan' });
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      taskId,
      { date, deadline, link, note },
      { new: true }
    );

    if (!updatedTask || updatedTask.length === 0) {
      return res
        .status(404)
        .json({ error: true, message: 'Tugas tidak ditemukan' });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ message: 'Silahkan hubungi tem support' });
  }
}
