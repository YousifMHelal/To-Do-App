import React, { useState, useEffect } from 'react';

function TodoApp() {

    const [lists, setLists] = useState(() => {
        const storedLists = localStorage.getItem('todoLists');
        return storedLists ? JSON.parse(storedLists) : [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(lists));
    }, [lists]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddList = () => {
        if (inputValue.trim() === '') {
            return;
        }

        setLists([...lists, { title: inputValue, todos: [] }]);
        setInputValue('');
    };

    const handleAddTodo = (listIndex) => {
        const updatedLists = [...lists];
        const todoInput = document.getElementById(`todo-input-${listIndex}`);
        const todoValue = todoInput.value.trim();

        if (todoValue === '') {
            return;
        }

        updatedLists[listIndex].todos.push({
            title: todoValue,
            completed: false,
        });
        setLists(updatedLists);
        todoInput.value = '';
    };

    const handleDeleteList = (listIndex) => {
        const updatedLists = [...lists];
        updatedLists.splice(listIndex, 1);
        setLists(updatedLists);
    };

    const handleKeyPress = (event, listIndex) => {
        if (event.key === 'Enter') {
            handleAddTodo(listIndex);
        }
    };

    const handleTodoCheckboxChange = (listIndex, todoIndex) => {
        const updatedLists = [...lists];
        updatedLists[listIndex].todos[todoIndex].completed = !updatedLists[
            listIndex
        ].todos[todoIndex].completed;
        setLists(updatedLists);
    };

    return (
        <div className='container mx-auto max-w-[1172px] px-4'>
            <div className='flex item-center justify-center flex-col'>
                <div className='flex flex-col items-center mt-4'>
                    <h1 className='text-4xl font-bold text-h'>Todo App</h1>
                    <div className='w-full justify-center flex max-md:flex-col'>
                        <input
                            className='w-[450px] max-md:w-full p-2 rounded-md mr-6 mt-4 max-md:mr-0 max-md:mb-4 border-2 border-p1 '
                            type="text"
                            placeholder="List Name"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button className='text-h text-xl' onClick={handleAddList}>Add List</button>
                    </div>
                </div>
                <div className='flex justify-center items-start gap-3 flex-wrap mt-4'>
                    {
                        lists.map((list, listIndex) => (
                            <div className='bg-p1 border-p border-2 rounded-xl w-[370px] p-2'
                                key={listIndex}>
                                <h2 className='text-center text-h font-bold capitalize text-xl pb-2'>{list.title}</h2>
                                <div className='flex'>
                                    <input
                                        className='px-2 border-p border-2 rounded-md w-[239px]'
                                        type="text"
                                        placeholder="Add todo"
                                        id={`todo-input-${listIndex}`}
                                        onKeyPress={(event) => handleKeyPress(event, listIndex)}
                                    />
                                    <button
                                        className='px-4 border-p text-h border-2 ml-2 rounded-md w-fit'
                                        onClick={() => handleAddTodo(listIndex)}>Add Todo</button>
                                </div>
                                
                                <ul>
                                    {list.todos.map((todo, todoIndex) => (
                                        <li
                                            className='flex items-center w-full p-1 my-2 rounded-md bg-p'
                                            key={todoIndex}>
                                            <input
                                                className='mr-2'
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => handleTodoCheckboxChange(listIndex, todoIndex)}
                                            />
                                            <span
                                                style={{
                                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                                }}
                                            >
                                                {todo.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className='w-full mt-2 text-xl font-bold'
                                    onClick={() => handleDeleteList(listIndex)}>Delete List</button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
