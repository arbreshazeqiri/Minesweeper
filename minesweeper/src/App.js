import Board from './components/Board'
import { Flex, ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Flex justifyContent={'center'} marginTop="4em" marginBottom="4em">
        <Board />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
