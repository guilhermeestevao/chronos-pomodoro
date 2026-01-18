import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskAction';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameRef = useRef<HTMLInputElement>(null);
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handlerCreateNewTask(event: React.FormEvent) {
    event.preventDefault();

    if (taskNameRef.current === null) return;

    const taskName = taskNameRef.current.value.trim();

    if (!taskName) {
      alert('Por favor, insira um nome para a tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completedDate: null,
      interruptedDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
  }

  function handlerInterruptTask() {
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handlerCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          placeholder='ALGUMA COISA'
          id='meuImput'
          type='text'
          labelText='Task'
          ref={taskNameRef}
          disabled={!!state.activeTask}
        />
      </div>
      <div className='formRow'>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles />
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='botao_submit'
          />
        ) : (
          <DefaultButton
            aria-label='Interomper tarefa em andamento'
            title='Interomper tarefa em andamento'
            type='button'
            color='red'
            onClick={handlerInterruptTask}
            icon={<PlayCircleIcon />}
            key='botao_button'
          />
        )}
      </div>
    </form>
  );
}
