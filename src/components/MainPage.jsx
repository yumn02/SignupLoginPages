import React, { useState, useEffect } from 'react';
import './MainPage.css';

const MainPage = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [memberName, setMemberName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [status, setStatus] = useState('incomplete');

    const handleCreateTask = () => {
        const newTask = {
            name: taskName,
            member: memberName,
            start: startTime,
            end: endTime,
            status: 'incomplete',
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        resetModal();
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setTaskName('');
        setMemberName('');
        setStartTime('');
        setEndTime('');
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setStatus(task.status);
    };

    const handleStatusChange = (newStatus) => {
        const updatedTasks = tasks.map((task) =>
            task.name === selectedTask.name ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setSelectedTask({ ...selectedTask, status: newStatus });
    };

    const handleDeleteTask = (taskName) => {
        const updatedTasks = tasks.filter(task => task.name !== taskName);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setSelectedTask(null);
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <>
            <button className="create-task-button" onClick={() => setIsModalOpen(true)}>
                Create a task!
            </button>

            {isModalOpen && (
                <div className="modal">
                    <h2>Create Task</h2>
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Member Name"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="End Time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    <button onClick={handleCreateTask}>Create</button>
                    <button onClick={resetModal}>Cancel</button>
                </div>
            )}

            {selectedTask && (
                <div className="modal task-details">
                    <h3>Task Details</h3>
                    <p>Task Name: {selectedTask.name}</p>
                    <p>Member Name: {selectedTask.member}</p>
                    <p>Time Started: {selectedTask.start}</p>
                    <p>Time to Finish: {selectedTask.end}</p>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="incomplete">Incomplete</option>
                        <option value="in progress">In Progress</option>
                        <option value="ready to be tested">Ready to be Tested</option>
                        <option value="tested">Tested</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={() => handleStatusChange(status)}>Done</button>
                    <button onClick={() => setSelectedTask(null)}>Close</button>
                    <button onClick={() => handleDeleteTask(selectedTask.name)} className="delete-button">
                        Delete Task
                    </button>
                </div>
            )}

            <div className="sentence">
                <h1>Each completed task is a victory—let's celebrate the journey!</h1>
            </div>

            <div className="main-container">
                <div className="column">
                    <h2>To Do</h2>
                    <div className="tasks">
                        {tasks.filter(task => task.status === 'incomplete').map((task, index) => (
                            <div key={index} className="task" onClick={() => handleTaskClick(task)}>
                                {task.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="column">
                    <h2>In Progress</h2>
                    <div className="tasks">
                        {tasks.filter(task => 
                            task.status === 'in progress' || 
                            task.status === 'ready to be tested' || 
                            task.status === 'tested'
                        ).map((task, index) => (
                            <div key={index} className="task" onClick={() => handleTaskClick(task)}>
                                {task.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="column">
                    <h2>Completed</h2>
                    <div className="tasks">
                        {tasks.filter(task => task.status === 'completed').map((task, index) => (
                            <div key={index} className="task" onClick={() => handleTaskClick(task)}>
                                {task.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
