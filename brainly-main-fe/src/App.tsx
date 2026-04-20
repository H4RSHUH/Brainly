import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { SignUp } from "./pages/signup"
import { SignIn } from "./pages/Signin"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { SharedBrain } from "./pages/ShareBrain"

function App() {
  
  return <BrowserRouter>
    <Routes>
      <Route path="/share/:shareLink" element={<SharedBrain />} />

      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
      <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
    </Routes>
  </BrowserRouter>
}

export default App
