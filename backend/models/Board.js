import { Schema,Model, model,Types } from "mongoose";
// import Board from "../../frontend/components/Board";

const boardSchema = new Schema({
//   id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  columns: {
    todo:        [{ type: Types.ObjectId, ref: 'Card' }],
    in_progress: [{ type: Types.ObjectId, ref: 'Card' }],
    done:        [{ type: Types.ObjectId, ref: 'Card' }],
  }
}, { timestamps: true });


 const Board = model('Board',boardSchema);

 export default Board;

