import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import KaTeX from "./components/KaTeX/KaTeX.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/katex" element={<KaTeX />} />
    </Routes>
  </Router>
);
