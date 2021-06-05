import { useState } from 'react';
import Modal from 'react-modal';
import CloseImg from '../../assets/close.svg';
import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import { Container, RadiuButton, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    //Abaixo estado utilizado para guardar a categoria selecionada, entrada ou saida
    const [type, setType] = useState('deposit');

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

            <Container>
            <h2>Cadastrar Transação</h2>


            <input 
                placeholder="Titulo"
            />

            <input 
                type="number"
                placeholder="Valor"
            />

            <TransactionTypeContainer>
                <RadiuButton 
                    type="button"
                    onClick={() => { setType('deposit'); }}
                    isActive={type == 'deposit'} //retorna true se for selecionado e false se não for, isso só funciona em components
                    activeColor="greem"
                >
                    <img src={IncomeImg} alt="Entrada"/>
                    <span>Entrada</span>
                </RadiuButton>

                <RadiuButton 
                    type="button"
                    onClick={() => { setType('withdraw'); }}
                    isActive={type == 'withdraw'}
                    activeColor="red"
                >
                    <img src={OutcomeImg} alt="Saida"/>
                    <span>Saida</span>
                </RadiuButton>
            </TransactionTypeContainer>

            <input 
                placeholder="Categoria"
            />

            <button type="submit">
                Cadastrar 
            </button>

            </Container>
        </Modal>
    )
}