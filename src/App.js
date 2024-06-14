import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import SaleProperty from "./pages/SaleProperty";
import Rent from "./pages/Rent";
import RentProperty from "./pages/RentProperty";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/UserProfile";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./components/App/store";
import Logout from "./components/Auth/Logout";
import UploadForm from "./pages/tour";
// import TourList from "./components/TourList";
// import TourView from "./components/TourView";
import ErrorPage from "./components/Error/Error";
import Notifications from "./Notifications";
import MyProperty from "./components/Profile/MyProperty";
import Main from "./components/Profile/Main";
import AddProperty from "./components/Profile/AddProperty";
import UserProfile from "./components/Profile/UserProfile";
import { ToastContainer, toast } from "react-toastify";

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
          <Route path="/profile" element={<Main />}>
            <Route path="add-property" element={<AddProperty />} />
            <Route path="my-properties" element={<MyProperty />} />
            <Route path="userProfile" element={<UserProfile />} />
          </Route>
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </ThemeProvider>
      <Notifications />
    </Provider>
  );
}

export default App;
