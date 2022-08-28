import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Box from "@mui/material/Box";
import "./App.css";
import CampaignPage from "./views/CampaignPage";
import EditCampaign from "./views/EditCampaign";
import AuthGuard from "./components/AuthGuard";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Box minWidth={450} margin={2}>
        <BrowserRouter>
          <Routes>
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/register" element={<Register />} />
            <Route
              path=""
              element={
                <AuthGuard>
                  <Navigate to="/campaigns" />
                </AuthGuard>
              }
            />
            <Route
              path="campaigns"
              element={
                <AuthGuard>
                  <CampaignPage />
                </AuthGuard>
              }
            />
            <Route
              path="campaign/:campaignId"
              element={
                <AuthGuard>
                  <EditCampaign />
                </AuthGuard>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </Box>
    </div>
  );
}

export default App;
