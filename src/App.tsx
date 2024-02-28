// App.tsx
import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, Flex, Heading, Input, Stack, Button, Text } from '@chakra-ui/react';
import Todo from './todo';
import './App.css'; 

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks || []); 
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
          <div>
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
          </div>
         
          <Todo tasks={tasks} deleteTask={deleteTask} markAsDone={markAsDone} className="todoList" />
          
          <Box
            width="100%"
            height="10px"
            borderRadius="5px"
            background={`linear-gradient(to right, #3498db ${calculatePercentage()}%, #ecf0f1 ${calculatePercentage()}%)`}
            mb={4}
          />
          <Stack direction="row" spacing={4} mb={4}>
            <Text>{`${calculatePercentage()}% tasks done`}</Text>
          </Stack>
        </Flex>
      </div>
    </ChakraProvider>
  );
};

export default App;
