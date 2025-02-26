import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEdit from "./pages/ProfileEdit";
import ChatRoom from "./pages/ChatRoom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SetUsername from "./components/setUsername";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/useAuth";
import PrivateRoute from "./pages/private_route";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            }
          />
          <Route
            path="/register"
            element={
              <AuthLayout>
                <SignUpPage />
              </AuthLayout>
            }
          />
          <Route
            path="/set-username"
            element={
              <AuthLayout>
                <SetUsername />
              </AuthLayout>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/chat/:username/"
                      element={
                        <PrivateRoute>
                          <ChatRoom />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile/:username/"
                      element={
                        <PrivateRoute>
                          <ProfilePage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile/:username/edit/"
                      element={
                        <PrivateRoute>
                          <ProfileEdit />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <PrivateRoute>
                          <HomePage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
