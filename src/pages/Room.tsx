import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { database } from '../services/firebase';

type FirebaseQuestions = Record<string, {
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
}>

type Questions = {
    id:string;
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered:boolean;
    isHighlighted:boolean;
}

type RoomParamsProps = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams() as RoomParamsProps;
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');

    const roomId = params.id;

    useEffect(() =>{
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room=>{
            const databaseRoom = room.val();
            const firebaseQuestions:FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
                return{
                    id:key,
                    content:value.content,
                    author:value.author,
                    isHighlighted:value.isHighlighted,
                    isAnswered:value.isAnswered
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })


    },[roomId])

    async function handleSendQuestion(e: FormEvent) {
        e.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            toast.error("Nenhum usuário autenticado")
            return;
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        toast.success("Pergunta enviada com sucesso!")

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode
                        code={roomId}
                    />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} perguntas</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar ?"
                        onChange={(e) => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}