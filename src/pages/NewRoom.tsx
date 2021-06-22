import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { Button } from '../components/Button';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { AuthContext } from '../App';

export function NewRoom() {
    const { user } = useContext(AuthContext);

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />

                    <h2>{user?.name}</h2>
                    <h1>Crie uma nova sala</h1>

                    <form action="">
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente ? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}