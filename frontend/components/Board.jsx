import axios from "axios";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { useParams } from "react-router";
import BasicCard from "./BasicCard";
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import "./Board.css";
import socket from "../utils/socket";

export default function Board() {
    const [title, setTitle] = useState("");
    const [cards, setCards] = useState([]);
    const [cardData, setCardData] = useState({
        title: "",
        body: "",
        status: "todo"
    });

    let params = useParams();
    const API = 'http://localhost:8080/card';
    let id = params.id;

    function handlechange(e) {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    }

    async function handlesubmit(e) {
        e.preventDefault();
        let boardId = id;
        await axios.post(API, { ...cardData, boardId });
        socket.emit("card-added",id);
        getCards();
    }

    const getCards = async () => {
        const cardRes = await axios.get(`http://localhost:8080/card/${id}`);
        let crds = cardRes.data.cards;
        setCards([...crds]);
    }

    useEffect(() => {
        socket.emit('join-board',id);
        socket.on("refresh-cards",()=>{
            getCards();
        });
            getCards();

        return()=>{ socket.off('refresh-cards');}
    
    }, [])

    async function handleDelete(cardId) {
        try {
            await axios.delete(`http://localhost:8080/card/${cardId}`);
            socket.emit("card-deleted",id);
            getCards();
        } catch (e) {
            console.log(e.message);
        }
    }

    const onDragEnd = useCallback(async (result) => {
        if (!result.destination) return;
        if (result.destination.droppableId === result.source.droppableId) return;

        const cardId = result.draggableId;
        await axios.patch(`http://localhost:8080/card/${cardId}`, {
            status: result.destination.droppableId
        });
          socket.emit("card-moved",id);
        getCards();
    }, []);

    const columns = [
        { id: "todo",        label: "Todo",        dotClass: "dot-todo",        labelClass: "label-todo",        countClass: "count-todo",        colClass: "col-todo" },
        { id: "in_progress", label: "In Progress", dotClass: "dot-inprogress",  labelClass: "label-inprogress",  countClass: "count-inprogress",  colClass: "col-inprogress" },
        { id: "done",        label: "Done",        dotClass: "dot-done",        labelClass: "label-done",        countClass: "count-done",        colClass: "col-done" },
    ];

    return (
        <div className="board-wrapper">

            <div className="top-bar">
                <span className="board-title">⌗ BoardFlow</span>
                <span className="board-slug">board/{id}</span>
            </div>

            <form className="add-card-form" onSubmit={handlesubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Card title..."
                    value={cardData.title}
                    onChange={handlechange}
                    required
                />
                <input
                    type="text"
                    name="body"
                    placeholder="Description..."
                    value={cardData.body}
                    onChange={handlechange}
                />
                <select name="status" value={cardData.status} onChange={handlechange}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                <button type="submit" className="submit-btn">+ Add card</button>
            </form>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="columns-wrapper">
                    {columns.map((col) => (
                        <Droppable droppableId={col.id} key={col.id}>
                            {(provided) => (
                                <ul
                                    className={`column ${col.colClass}`}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div className="col-header">
                                        <div className={`col-dot ${col.dotClass}`}></div>
                                        <span className={`col-label ${col.labelClass}`}>{col.label}</span>
                                        <span className={`col-count ${col.countClass}`}>
                                            {cards.filter(c => c.status === col.id).length}
                                        </span>
                                    </div>

                                    {cards
                                        .filter(card => card.status === col.id)
                                        .map((card, index) => (
                                            <Draggable key={card._id} draggableId={card._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <BasicCard
                                                            title={card.title}
                                                            body={card.body}
                                                            status={card.status}
                                                            handleDelete={handleDelete}
                                                            id={card._id}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}