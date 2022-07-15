import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <nav>
          <Link to="/">Home</Link> {" "}
        </nav>
      </Router>

      <Routes>
        <Route path='/' />
      </Routes>
    </div>
  )
}
