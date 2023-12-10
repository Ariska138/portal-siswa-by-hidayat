import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
  teacher_id: {
    type: String,
    required: true,
  },
  status: {
    // 0: tidak aktif, sedangkan 1: aktif
    type: Number,
    default: 1,
  },
});

let ScoreModel;
// fix overwrite user
if (mongoose.models.Score) {
  ScoreModel = mongoose.model('Score');
} else {
  ScoreModel = mongoose.model('Score', scoreSchema);
}

export default ScoreModel;
