// TodoList.tsx
import React from 'react';
import { Button, Checkbox,  Stack, Text } from '@chakra-ui/react';

interface TodoProps {
  tasks: { id: number; text: string; done: boolean }[];
  deleteTask: (taskId: number) => void;
  markAsDone: (taskId: number) => void;
}

const Todo: React.FC<TodoProps> = ({ tasks, deleteTask, editTask, markAsDone }) => {
  return (
    <Stack spacing={2} width="100%">
      {tasks.map((task) => (
        <Stack key={task.id} className="task" direction="row" align="center" justify="space-between">
          <Checkbox isChecked={task.done} onChange={() => markAsDone(task.id)}>
            <Text textDecoration={task.done ? 'line-through' : 'none'}>{task.text}</Text>
          </Checkbox>
         
          <Button size="sm" colorScheme="red" onClick={() => deleteTask(task.id)}>
            Delete
          </Button>
        </Stack>
      ))}
    </Stack>
  );
};

export default Todo;
