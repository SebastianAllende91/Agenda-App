import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AddContact from "./pages/addContact/AddContact";
import Contactos from "./pages/contact/Contactos";
// import Home from "./pages/Home";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="contactos/save" element={<AddContact />}>
          <Route path=":id" element={<AddContact />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
