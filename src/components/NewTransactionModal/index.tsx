import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import { api } from '../../services/api';
import { Container, RadiuButton, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    //Abaixo estado utilizado para guardar a categoria selecionada, entrada ou saida
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    //Abaixo função para pegar as informações passadas pelo usuario
    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        const data = {
            title,
            value,
            category,
            type,
        };

        console.log(data);
        

        api.post('/transactions', data)
        
    }

    return (
        <Modal 
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >

            <button 
            type="button" 
            onClick={onRequestClose}
            className="react-modal-close"
            >
                <img src={CloseImg} alt="Fechar Modal"/>
            </button>

            <Container onClick={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>


            <input 
                placeholder="Titulo"
                value={title}
                //função abaixo executa sempre que um novo valor é digitado e captura esse Valor
                onChange={event => setTitle(event.target.value)}
            />

            <input 
                type="number"
                placeholder="Valor"
                value={value}
                //função abaixo executa sempre que um novo valor é digitado e captura esse Valor
                onChange={event => setValue(Number(event.target.value))}
            />

            <TransactionTypeContainer>
                <RadiuButton 
                    type="button"
                    onClick={() => { setType('deposit'); }}
                    isActive={type === 'deposit'} //retorna true se for selecionado e false se não for, isso só funciona em components
                    activeColor="greem"
                >
                    <img src={IncomeImg} alt="Entrada"/>
                    <span>Entrada</span>
                </RadiuButton>

                <RadiuButton 
                    type="button"
                    onClick={() => { setType('withdraw'); }}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={OutcomeImg} alt="Saida"/>
                    <span>Saida</span>
                </RadiuButton>
            </TransactionTypeContainer>

            <input 
                placeholder="Categoria"
                value={category}
                //função abaixo executa sempre que um novo valor é digitado e captura esse Valor
                onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">
                Cadastrar 
            </button>

            </Container>
        </Modal>
    )
}