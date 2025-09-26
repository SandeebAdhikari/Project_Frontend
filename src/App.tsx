import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import FlimsPage from "./pages/FlimsPage";
import CustomersPage from "./pages/CustomersPage";
import FilmDetail from "./components/FilmDetail";
import RentOutPage from "./components/RentOutModal";

const App = () => {
  return (
    <div className="bg-gradient-to-t from-gray-900 via-gray-950 to-black min-h-screen">
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
                onClose={() => {}}
              />
            }
          />
          <Route path="/customers" element={<CustomersPage />} />
          <Route
            path="/rentals/:id"
            element={<RentOutPage filmId={0} onClose={() => {}} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
