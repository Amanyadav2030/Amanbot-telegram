import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import '../App.css'
import Board from 'react-trello';
import { deleteApi, getDataApi } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
const initialData = {
    lanes: [
        {
            id: "todo",
            title: "Planned Tasks",
            style: {
                width: 280
            },
            cards: []
        },
        {
            id: "pending",
            title: "Work In Progress",
            style: {
                width: 280
            },
            cards: []
        },
        {
            id: "done",
            title: "Completed",
            style: {
                width: 280
            },
            cards: []
        }
    ]
}

const Home = () => {
    const [data, setData] = useState(initialData);
    const { isAuth, token } = useContext(AuthContext);
    useEffect(() => {
        getDataApi(token).then((res) => {
            res.forEach((el) => {
                let obj = {
                    id: el._id,
                    title: el.title,
                    description: el.description
                }
                if (el.status == data.lanes[0].id) {
                    data.lanes[0]['cards'] = [...data.lanes[0]['cards'], obj];
                } else if (el.status == data.lanes[1].id) {
                    data.lanes[1]['cards'] = [...data.lanes[1]['cards'], obj];
                } else if (el.status == data.lanes[2].id) {
                    data.lanes[2]['cards'] = [...data.lanes[2]['cards'], obj];
                }
            })
            setData({ ...data });
        }).catch((err) => console.log(err))
    }, []);
    const dragStart = (cardId, laneId) => {
        console.log(cardId, laneId)
    }
    const dragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        console.log(cardId, sourceLaneId, targetLaneId, position, cardDetails)
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
                laneDraggable={false}
                editable
                handleDragEnd={(cardId, sourceLaneId, targetLaneId, position, cardDetails) => dragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails)}
                handleDragStart={(cardId, laneId) => dragStart(cardId, laneId)}
                addCardTitle="Add Item"
                onCardDelete={(cardId, laneId) => deleteCard(cardId, laneId)}
            />
        </div>
    );
}

export default Home