import { Schema,Model,model,Types } from "mongoose";
import Board from "./Board.js";
const cardSchema = new Schema({
    // id:String,
    title:String,
    body:String,
    status:{
        type:String,
        enum:["todo","in_progress","done"],
        default:"todo"
    },
    boardId:{
        type:Types.ObjectId,
        ref:"Board"
    }

})

const Card = model("Card",cardSchema);

export default Card;