import styled from '@emotion/styled';
import { Header } from '@fx-01/ui';

import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Header />
      <NxWelcome title="fx" />
    </StyledApp>
  );
}

export default App;
