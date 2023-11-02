import mongoose from 'mongoose';

export const connectMongoDB = async () => {
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
