import TopNav from "./components/TopNav";
import MultipleLogin from "./pages/MultipleLogin";
import Login from "./pages/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import AssemblyDashboard from "./pages/AssemblyDashboard";
import { AuthProvider } from "../backend/firebase/AuthContect";
import PrivateRoute from "../backend/firebase/PrivateRoute";
import LoginRedirect from "../backend/firebase/LoginRedirect";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <TopNav />
          <Routes>
            <Route
              path="/"
              element={
                <LoginRedirect>
                  {" "}
                  <MultipleLogin />{" "}
                </LoginRedirect>
              }
            />
            <Route
              path="/login/assembly"
              element={
                <LoginRedirect>
                  <Login title={"Assembly"} />
                </LoginRedirect>
              }
            />
            <Route
              path="/login/calibration"
              element={<Login title={"Calibration"} />}
            />
            <Route
              path="/login/post-calibration"
              element={<Login title={"Post Calibration"} />}
            />
            <Route
              path="/login/detector-testing"
              element={<Login title={"Detector Testing"} />}
            />
            <Route
              path="/login/rejection-rma"
              element={<Login title={"Rejection & RMA"} />}
            />

            <Route
              path="/assembly-dashboard/*"
              element={
                <PrivateRoute>
                  <AssemblyDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
      <Footer />
    </>
  );
}

export default App;
