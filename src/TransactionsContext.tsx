import {createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

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

export const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );


export function TransactionsTableProvider({children}: TransactionsTableProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

   async function creatTransaction(transaction: TransactionInput) {
       await api.post('/transactions', transaction)
    }

    return (
        <TransactionsContext.Provider value={{ transactions, creatTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}