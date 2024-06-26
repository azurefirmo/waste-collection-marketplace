import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

const Home: React.FC = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="" />
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos eletrônicos.</h1>
                    <p>
                        Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                    </p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um Ponto de Coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
};

export default Home;