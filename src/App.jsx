import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import About from "./pages/About/About";
import { AuthProvider } from "./contexts/authContext";
import { useState } from "react";

function App() {
  const [libraryViews, setLibraryViews] = useState([]);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header setLibraryViews={setLibraryViews} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                libraryViews={libraryViews}
                setLibraryViews={setLibraryViews}
              />
            }
          ></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/About" element={<About />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
