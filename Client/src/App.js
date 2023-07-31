import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminRouter from "./components/admin/AdminRouter";
import HomeRouter from "./components/page/HomeRouter";
import './style.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route cho trang admin */}
          <Route path="/admin/*" element={<AdminRouter />} />

          {/* Route cho phần public */}
          <Route path="/*" element={<HomeRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
