// App.tsx
import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, Flex, Heading, Input, Stack, Button, Progress } from '@chakra-ui/react';
import Todo from './todo';
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks || []); // Ensure that tasks is an array
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const markAsDone = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)));
  };

  const calculatePercentage = () => {
    const doneTasks = tasks.filter((task) => task.done).length;
    const totalTasks = tasks.length;
    return totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);
  };

  return (
    <ChakraProvider>
      <div className="container">
        <Flex direction="column" align="center">
          <Heading className="header" mb={4}>
            Todo App
          </Heading>
          <Stack className="input-container" direction="row" spacing={4} mb={4}>
            <Input
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button colorScheme="blue" onClick={addTask}>
              Add
            </Button>
          </Stack>
          <div style={{ height: '10px' }}>
            <Progress value={calculatePercentage()} colorScheme="blue" mb={4} />
          </div>
          <Todo tasks={tasks} deleteTask={deleteTask} markAsDone={markAsDone} />
        </Flex>
      </div>
    </ChakraProvider>
  );
};

export default App;
