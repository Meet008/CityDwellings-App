import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./components/App/store";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import RentProperty from "./pages/RentProperty";
import Sale from "./pages/Sale";
import SaleProperty from "./pages/SaleProperty";
import UploadForm from "./pages/tour";
// import TourList from "./components/TourList";
// import TourView from "./components/TourView";
import Notifications from "./Notifications";
import AddProperty from "./components/Profile/AddProperty";
import Dashboard from "./components/Profile/Dashboard";
import EditProperty from "./components/Profile/EditProperty";
import Main from "./components/Profile/Main";
import MyProperty from "./components/Profile/MyProperty";
import UserProfile from "./components/Profile/UserProfile";
import { ConfigProvider } from "antd";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f07917",
            // Other Ant Design customizations
          },
        }}
      >
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
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-property" element={<AddProperty />} />
              <Route path="my-properties" element={<MyProperty />} />
              <Route path="userProfile" element={<UserProfile />} />
              <Route
                path="edit-property/:propertyId"
                element={<EditProperty />}
              />
            </Route>
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
        </ThemeProvider>
      </ConfigProvider>
      <Notifications />
    </Provider>
  );
}

export default App;
