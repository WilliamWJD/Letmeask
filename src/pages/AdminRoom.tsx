import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

// import { useAuth } from '../hooks/useAuth';
// import { toast } from 'react-toastify';

import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParamsProps = {
    id: string;
}

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams() as RoomParamsProps;
    const roomId = params.id;

    const { questions, title } = useRoom(roomId);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Eencerrar sala</Button>
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
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}