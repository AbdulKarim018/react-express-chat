import ChatApp from "./components/ChatApp";
import { SocketProvider } from "./contexts/socket";

function App() {
  return (
    <>
      <main>
        <SocketProvider>
          <ChatApp />
        </SocketProvider>
      </main>
    </>
  );
}

export default App;
