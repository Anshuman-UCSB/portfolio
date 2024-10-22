import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Portfolio from "./Portfolio.tsx";
import KaTeX from "./components/KaTeX/KaTeX.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/katex" element={<KaTeX />} />
    </Routes>
  </Router>
);
