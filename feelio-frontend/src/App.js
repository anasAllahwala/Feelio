import "./App.css";
import { Routes, Route } from "react-router-dom";
import { CreatePost, Home, Login, Register } from "./views";
import RequireAuth from "./components/shared/RequireAuth";
import { useEffect } from "react";
import { authInterceptor } from "./interceptors";
import axios from "axios";

function App() {
  useEffect(() => {
    // authInterceptor();
  }, []);

  return (
    <div className="">
      <Routes>
        <Route
          path="/posts/*"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route path="create" element={<CreatePost />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
