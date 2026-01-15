import { useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';

type TaskContextProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProps) {
  const [state, setState] = useState(initialTaskState);
  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
