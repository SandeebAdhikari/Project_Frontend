import { Routes, Route } from "react-router-dom";
import TopFlims from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopFlims />} />
    </Routes>
  );
}

export default App;
