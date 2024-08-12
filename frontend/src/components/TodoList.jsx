import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true); // Menambahkan state loading
    const [error, setError] = useState(null); // Menambahkan state error

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get('/routes/todos');
                if (Array.isArray(response.data)) {
                    setTodos(response.data);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
                setError('Error fetching todos'); // Set error state jika terjadi error
            } finally {
                setLoading(false); // Set loading ke false setelah fetch selesai
            }
        };

        fetchTodos();
    }, []);

    const toggleTodo = async id => {
        try {
            await axios.put(`/routes/todos/${id}`, { completed: true });
            setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: true } : todo));
        } catch (error) {
            console.error('Error updating todo:', error);
            setError('Error updating todo'); // Set error state jika terjadi error
        }
    };

    const deleteTodo = async id => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            setError('Error deleting todo'); // Set error state jika terjadi error
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Menampilkan pesan loading saat data sedang diambil
    }

    if (error) {
        return <p>{error}</p>; // Menampilkan pesan error jika ada error
    }

    return (
        <div>
            {todos.length > 0 ? (
                todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))
            ) : (
                <p>No todos available</p> // Menampilkan pesan jika tidak ada todo
            )}
        </div>
    );
};

export default TodoList;
