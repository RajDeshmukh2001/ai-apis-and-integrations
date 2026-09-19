import "./App.css";
import StreamingChat from "./components/StreamingChat";

function App() {
  return (
    <main className="m-20 space-y-10">
      <h1 className="text-2xl">Gemini Streaming Response</h1>

      <StreamingChat />
    </main>
  );
}

export default App;
