import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import FlimsPage from "./pages/FlimsPage";
import CustomersPage from "./pages/CustomersPage";
import FilmDetail from "./pages/DetailPage";

const App = () => {
  return (
    <div className="bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-950 min-h-screen">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/films" element={<FlimsPage />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </div>
  );
};

export default App;
