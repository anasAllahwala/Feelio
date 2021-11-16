import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CreatePost, Home, Login, Register } from "./views";
import { RequireAuth } from "./components";

function App() {
  return (
    <div className="max-w-md lg:max-w-6xl m-auto py-5">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
