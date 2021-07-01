import {createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;

}

//forma de através do typeScript herdar interfaces ja criadas

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsTableProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transaction[];
    creatTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );


export function TransactionsTableProvider({children}: TransactionsTableProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

   async function creatTransaction(transactionInput: TransactionInput) {
       const response = await api.post('/transactions', {
           ...transactionInput,
                createdAt: new Date(),
        })
       const { transaction } = response.data;

       setTransactions([
           ...transactions,
           transaction,
       ])

    }

    return (
        <TransactionsContext.Provider value={{ transactions, creatTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}