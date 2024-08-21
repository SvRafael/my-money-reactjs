import { Children, createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
  }

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransactions: (data: CreateInterfaceInput) => Promise<void>;
}

interface TransactionProviderProps {
    children: ReactNode;
}

interface CreateInterfaceInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome';
}


export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
  
    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })
        setTransactions(response.data)
    }
  
    useEffect(() => {
        fetchTransactions()
    }, []);

    async function createTransactions(data: CreateInterfaceInput){
        const { description, price, category, type } = data;
        const response = await api.post('transactions', {
          description,
          price,
          category,
          type,
          createdAt: new Date(),
        })
        setTransactions(state => [...state, response.data]);
    }
    
    return (
        <TransactionContext.Provider value={{ 
            transactions, fetchTransactions, createTransactions
        }}>      
            {children}
        </TransactionContext.Provider>
    )
}