import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
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

let GameModel;
// fix overwrite user
if (mongoose.models.Game) {
  GameModel = mongoose.model('Game');
} else {
  GameModel = mongoose.model('Game', gameSchema);
}

export default GameModel;
