
import styled from '@emotion/styled';
import useStore from 'store/Module'

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
const { price, reset } = useStore();

  return (
    <StyledApp>
      Rates app. Current price is: {price}
      <button onClick={reset}>Reset price</button>
    </StyledApp>
  );
}

export default App;
