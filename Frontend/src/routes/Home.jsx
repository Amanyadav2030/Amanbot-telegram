import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import '../App.css'
import Board from 'react-trello';
import { addTaskApi, deleteApi, getDataApi, updateTaskApi } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
const initialData = {
    lanes: [
        {
            id: "todo",
            title: "Planned Tasks",
            style: {
                width: 280,
                minHeight: '50vh',
                background: 'white'
            },
            cardStyle: { color: '#59bb9a' },
            cards: []
        },
        {
            id: "pending",
            title: "Work In Progress",
            style: {
                width: 280,
                minHeight: '50vh',
                background: 'white'
            },
            cardStyle: { color: '#59bb9a' },
            cards: []
        },
        {
            id: "done",
            title: "Completed",
            style: {
                width: 280,
                minHeight: '50vh',
                background: 'white'
            },
            cardStyle: { color: '#d2ae6d' },
            cards: []
        }
    ]
}

const Home = () => {
    const [data, setData] = useState(initialData);
    const { isAuth, token } = useContext(AuthContext);
    const [count, setCount] = useState(1)
    useEffect(() => {
        getDataApi(token).then((res) => {
            let lane1 = [];
            let lane2 = [];
            let lane3 = [];
            res.forEach((el) => {
                let obj = {
                    id: el._id,
                    title: el.title,
                    description: el.description
                }
                if (el.status == data.lanes[0].id) {
                    lane1.push(obj);
                } else if (el.status == data.lanes[1].id) {
                    lane2.push(obj);
                } else if (el.status == data.lanes[2].id) {
                    lane3.push(obj);
                }
            });
            data.lanes[0]['cards'] = lane1;
            data.lanes[1]['cards'] = lane2;
            data.lanes[2]['cards'] = lane3;
            setData({ ...data });
        }).catch((err) => console.log(err))
    }, [count]);
    const dragStart = (cardId, laneId) => {
        setCount((prev) => prev + 1)
    }
    const dragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        console.log(cardId, targetLaneId)
        updateTaskApi(cardId, { status: targetLaneId }).then((res) => {
            console.log(res);
            setCount((prev) => prev + 1)
        }).catch((err) => console.log("update", err))
        setCount((prev) => prev + 1)
    }
    const handleOnCardAdd = (card, status) => {
        const { title, description } = card;
        const data = {
            title,
            description,
            status,
            userId: token
        }
        addTaskApi(data).then((res) => {
            console.log(res);
        }).catch((err) => console.log("Aman error", err))
    }
    const deleteCard = (cardId, laneId) => {
        deleteApi(cardId).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }
    return (
        <div className={styles.container} >
            <Board
                data={data}
                draggable
                style={{ backgroundColor: '#d6d6d6 !important', justifyContent: 'center', display: 'flex' }}
                laneDraggable={false}
                editable
                handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails) => dragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails)}
                handleDragStart={(cardId, laneId) => dragStart(cardId, laneId)}
                addCardTitle="Add Item"
                onCardAdd={(card, laneId) => handleOnCardAdd(card, laneId)}
                onCardDelete={(cardId, laneId) => deleteCard(cardId, laneId)}
            />
        </div>
    );
}

export default Home