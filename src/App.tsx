import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import FlimsPage from "./pages/FlimsPage";
import CustomersPage from "./pages/CustomersPage";
import FilmDetail from "./components/FilmDetail";
import RentOutPage from "./components/RentOutModal";

const App = () => {
  return (
    <div className="bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-950 min-h-screen">
      <NavBar />
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/films" element={<FlimsPage />} />
          <Route
            path="/films/:id"
            element={
              <FilmDetail
                film={
                  null as unknown as React.ComponentProps<
                    typeof FilmDetail
                  >["film"]
                }
                onClose={() => {}} // Replace with actual close handler
              />
            }
          />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/rentals/:id" element={<RentOutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
