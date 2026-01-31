import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MensagesContainer } from './components/MensagesContainer';
import { MainRouter } from './MainRouter';
import './styles/theme.css';
import './styles/global.css';
export function App() {
  return (
    <TaskContextProvider>
      <MensagesContainer>
        <MainRouter />
      </MensagesContainer>
    </TaskContextProvider>
  );
}
