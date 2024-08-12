import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onTodoAdded }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setError(null);

        try {
            await axios.post('/routes/todos', { text });
            setText('');
            onTodoAdded?.();
        } catch (error) {
            console.error('Error adding todo:', error);
            setError('Failed to add todo. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a new todo"
                    className="flex-grow p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading || !text.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    {loading ? 'Adding...' : 'Add Todo'}
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default TodoForm;