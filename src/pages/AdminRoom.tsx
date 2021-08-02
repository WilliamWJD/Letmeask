import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';

import '../styles/room.scss';

// import { useAuth } from '../hooks/useAuth';
// import { toast } from 'react-toastify';

import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import { toast } from 'react-toastify';

type RoomParamsProps = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const history = useHistory();
    const params = useParams() as RoomParamsProps;
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        toast.success("Sala encerrado com sucesso")

        history.push('/')
    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm("Tem certeza que deseja excluir essa pergunta ?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()  
            toast.success("Pergunta excluida com sucesso!")
        }

    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => (
                        <Question
                            key={question.id}
                            author={question.author}
                            content={question.content}
                        >
                            <button
                                type="button"
                                onClick={()=>handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    )
}