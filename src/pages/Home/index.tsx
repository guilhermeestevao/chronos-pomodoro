import { Container } from '../../components/Container';
import { Countdown } from '../../components/CountDown';
import { MainForm } from '../../components/MainForm';
import { MainTemplate } from '../../templates/MainTemplate';

export function Home() {
  return (
    <MainTemplate>
      <Container>
        <Countdown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}
