import { Container, Paper } from '@mui/material';
import Elevator from './components/Elevator';
import ElevatorContext from './context/ElevatorContext';

function App() {
  return (
    <ElevatorContext>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Paper sx={{ py: 3, px: 5, bgcolor: '#E5E5EA' }}>
          <Elevator />
        </Paper>
      </Container>
    </ElevatorContext>
  );
}

export default App;
