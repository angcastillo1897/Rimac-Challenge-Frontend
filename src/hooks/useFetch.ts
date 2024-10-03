import { useState } from 'react';

const useFetch = <T>() => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiCall = async (apiFunc: () => Promise<{ status: number; data: T }>): Promise<T | undefined> => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiFunc();

            if (response.status !== 200) {
                throw new Error('Error al obtener los datos');
            }

            return response.data;
        } catch (error) {
            console.error('Error en la API:', error);
            setError('Ha ocurrido un error al obtener los datos');
        } finally {
            setLoading(false);
        }
    };

    return {
        apiCall,
        loading,
        error,
    };
};

export default useFetch;
