import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from './../../services/api';

export default function NewIncident() {
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        try {
            await api.post('/incidents', { title, description, value }, {
                headers: {
                    'Authorization': ongId,
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar incidente');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile"><FiArrowLeft size={16} color="#e02041"/>Voltar para home</Link>
                </section>

                <form onSubmit={ handleNewIncident }>
                    <input type="text" value={ title } onChange={ e => setTitle(e.target.value) } placeholder="Título do caso"/>
                    <textarea placeholder="Descrição" value={ description } onChange={ e => setDescription(e.target.value) } cols="30" rows="10"></textarea>
                    <input type="text" value={ value } onChange={ e => setValue(e.target.value) } placeholder="Valor em reais"/>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
