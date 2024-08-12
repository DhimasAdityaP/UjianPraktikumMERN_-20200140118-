import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none', 
                flex: 1 
            }}>
                {todo.text}
            </span>
            <button 
                onClick={() => onToggle(todo._id)}
                style={{ marginRight: '10px', padding: '5px 10px', border: 'none', borderRadius: '4px', backgroundColor: todo.completed ? '#ffc107' : '#007bff', color: '#fff', cursor: 'pointer' }}
                aria-label={todo.completed ? 'Undo todo' : 'Complete todo'}
            >
                {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button 
                onClick={() => onDelete(todo._id)}
                style={{ padding: '5px 10px', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}
                aria-label="Delete todo"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
