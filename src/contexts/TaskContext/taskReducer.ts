import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { TaskActionTypes, type TaskActionModel } from './taskAction';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask.duration * 60;
      return {
        ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondeRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...state.tasks, newTask],
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondeRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, interruptedDate: Date.now() };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COUNT_DOWN: {
      const { secondsRemaining } = action.payload;
      return {
        ...state,
        secondsRemaining,
        formattedSecondeRemaining: formatSecondsToMinutes(secondsRemaining),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondeRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if (state.activeTask && task.id === state.activeTask.id) {
            return { ...task, completedDate: Date.now() };
          }
          return task;
        }),
      };
    }
  }
}
