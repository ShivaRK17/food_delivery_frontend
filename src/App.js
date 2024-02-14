import Home from "./screens/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import ContextProvider from "./components/ContextReducer";
import Cart from "./screens/Cart";
import Navbar from "./components/Navbar";
import MyOrders from "./screens/MyOrders";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<MyOrders />} />

        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
