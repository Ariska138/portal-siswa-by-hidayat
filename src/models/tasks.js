import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
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

let TaskModel;
// fix overwrite user
if (mongoose.models.Task) {
  TaskModel = mongoose.model('Task');
} else {
  TaskModel = mongoose.model('Task', taskSchema);
}

export default TaskModel;
