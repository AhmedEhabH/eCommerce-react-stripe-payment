// import { Router, Route, Switch } from "react-router";
import { Routes, Route, Link } from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";

import "./App.css";

function App() {
    return (
        <>
            <h1>LAMA.</h1>
            <nav>
                <Link to="/pay">Pay</Link>
            </nav>
            <Routes>
                <Route path="/pay" element={<Pay />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </>
    );
}

export default App;
