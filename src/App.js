import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Login from "./components/login";


function App() {
  return (
    <Router>
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
