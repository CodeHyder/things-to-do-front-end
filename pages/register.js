import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, { email, password, username });
            router.replace('/login');
        } catch (error) {
            setErrorMessage(error.response.data.error); 
        }
    };

    console.log('erro:', errorMessage)
    

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registro</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Nome de usuário:</label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email:</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Senha:</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-black text-white hover:bg-black hover:bg-opacity-80 cursor-pointer rounded-none px-4 py-2 font-bold text-sm">
                        Registrar
                    </Button>
                </form>
            </div>
        </div>
    );
}
