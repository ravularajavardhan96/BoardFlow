import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
import {createServer} from 'http';
import { Server } from 'socket.io';

import Board from './models/Board.js';
import Card from './models/Card.js';

dotenv.config();



const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: "http://localhost:5173" }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("This is the root");
})

app.get("/boards", async (req, res) => {
    let boards = await Board.find();

    res.status(200).json({ boards });

});

app.post("/boards/board", async (req, res) => {
    console.log("This is being hit");

    try {
        let { title } = req.body;

        const brd = await Board.insertOne({ title });
        console.log(brd);

        let id = brd._id

        res.status(201).json({ message: "Board created successfully", success: true, id });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }

})

app.get("/board/:id", async (req, res) => {
    let { id } = req.params;
    console.log(req.id);

    try {
        const brd = await Board.findOne({ id });
        res.status(200).json({ board: brd, success: true });
    } catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }


})


//*************CARDS*************
//GET CARDS RELATED TO A BOARD
app.get("/card/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const cards = await Card.find({ boardId: id });
        console.log(cards);

        res.status(200).json({ success: true, cards });
    }
    catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
})

//*************CREATE CARD*************

app.post("/card", async (req, res) => {
    try {
        let { title, body, status, boardId } = req.body;

        const card = await Card.insertOne({
            title,
            body,
            status,
            boardId

        })
        // console.log(card);
        res.status(200).json({ success: true, message: "card created successfully" });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
})

app.delete("/card/:id", async (req, res) => {
    try {
        let id = req.params.id;

        const resp = await Card.deleteOne({ _id: id });

        res.status(200).json({ message: "Deleted successfully", success: true });
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false });
    }
})

//************Updating the card status*************

app.patch("/card/:id",async (req,res)=>{
    try{
        let id = req.params.id;
        let {status} = req.body;
        console.log(status);

        const resp = await Card.findByIdAndUpdate(id,{status:status});
        console.log(resp);
        res.status(200).json({message:"updation successfull",success:true});
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message:e.message,success:false});
    }
})



//***********Socket Connection********* *//


io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);

    socket.on("join-board",(boardId)=>{
        socket.join(boardId);
        console.log(`Socket ${socket.id} joined board ${boardId}`);

    });

    socket.on("card-added", (boardId)=>{
        socket.to(boardId).emit('refresh-cards');

    });

    socket.on("card-moved",(boardId)=>{
        socket.to(boardId).emit('refresh-cards');
    });

    socket.on("card-deleted",(boardId)=>{
        socket.to(boardId).emit('refresh-cards');
    });

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
    })
})

httpServer.listen(PORT, () => {
    // console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("The database connected");
        })
    console.log(`The server started on the port ${PORT}`)
})