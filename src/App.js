import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import SaleProperty from "./pages/SaleProperty";
import Rent from "./pages/Rent";
import RentProperty from "./pages/RentProperty";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/UserProfile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./store/store";
import Logout from "./pages/Logout";
import UploadForm from "./pages/tour";
// import TourList from "./components/TourList";
// import TourView from "./components/TourView";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/saleproperty/:id" element={<SaleProperty />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/rentproperty/:id" element={<RentProperty />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<UploadForm />} />
          {/* <Route path="/tour/:id" component={TourView} />
            <Route path="/logout" component={Logout} /> */}
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
