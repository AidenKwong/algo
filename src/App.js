/** @jsxImportSource @emotion/react */
import "./App.scss";
import { Link } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import FooterSection from "./components/footer/FooterSection";
import PageRoutes from "./pages/PageRoutes";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <h1 className="websiteName">⚡ Algorithm Visualizer</h1>
        </Link>
        <Navbar />
      </div>
      <PageRoutes />
      <FooterSection />
    </div>
  );
};

export default App;
