import { createContext } from 'react';
import { initialTaskState } from './initialTaskState';

const initialContextValue = {
  state: initialTaskState,
  setState: () => {},
};

export const TaskContext = createContext(initialContextValue);
