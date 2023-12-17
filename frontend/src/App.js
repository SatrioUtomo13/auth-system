import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={
          <>
            <Navbar />
            <Dashboard />
          </>
          } />
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/edit/:id" element={<EditProduct/>}/>
        </Routes>
    </Router>
  );
}

export default App;
