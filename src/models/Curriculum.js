import mongoose from 'mongoose';
const { Schema } = mongoose;

const curriculumSchema = new Schema({
  name: { type: String },
  subject: { type: String },
  grade: { type: String },
  board: { type: String },
  bookTitle: { type: String },
  author: { type: String },
  publisher: { type: String },
  edition: { type: String },
  numberOfChapters: { type: Number },
  topics: [{ type: String }],
  file: { type: String },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });



mongoose.models = {}

export default mongoose.model("Curriculum", curriculumSchema);