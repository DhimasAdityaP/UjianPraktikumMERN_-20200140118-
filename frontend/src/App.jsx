import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
    return (
    <div>
        <h1>Todo List</h1>
        <TodoForm />
        <TodoList />
    </div>
);
};

export default App;


