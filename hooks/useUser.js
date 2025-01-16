import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const useUser = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const getUser = async (id) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('Usuário não encontrado.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado. Faça login novamente.');

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/username/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsername(response.data.username);
            setLoading(false);
        } catch (err) {
            setError('Erro ao buscar usuário.');
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        router.replace('/login');
    }

    useEffect(() => {
        getUser();
    }, []);
    return { logout, username, loading, error }
}

export default useUser;
