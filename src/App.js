import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import store from "./components/App/store";
import { Helmet } from "react-helmet";
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
import Applications from "./components/Profile/Applications";
import Main from "./components/Profile/Main";
import MyProperty from "./components/Profile/MyProperty";
import UserProfile from "./components/Profile/UserProfile";
import UserApplications from "./components/Profile/UserApplications";
import { ConfigProvider } from "antd";
import Message from "./components/Profile/Messages";
import Reviews from "./components/Profile/Reviews";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Logout from "./components/Auth/Logout";

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

const TawkToScript = () => (
  <Helmet>
    <script type="text/javascript">
      {`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/667595679d7f358570d2014d/1i0tkv7f2';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
  `}
    </script>
  </Helmet>
);

{
  /* {location.pathname.includes("/saleproperty/") && ( // Condition based on the route
          <TawkToScript
            propertyId={"668099dfeaf3bd8d4d1668ac"} // Replace with your propertyId
            chatId={"1i1j5m9df"} // Replace with your chatId
          />
        )} */
}

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
          {/* <TawkToScript /> */}
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
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/userApplications" element={<UserApplications />} />
            <Route path="/profile" element={<Main />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-property" element={<AddProperty />} />
              <Route path="my-properties" element={<MyProperty />}></Route>
              <Route path="userProfile" element={<UserProfile />} />
              <Route path="message" element={<Message />} />
              <Route path="reviews" element={<Reviews />} />
              <Route
                path="edit-property/:propertyId"
                element={<EditProperty />}
              />
              <Route
                path="applications/:propertyId"
                element={<Applications />}
              />
              <Route path="logout" element={<Logout />} />
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
