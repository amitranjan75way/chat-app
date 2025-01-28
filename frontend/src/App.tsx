import { Route, Routes } from "react-router-dom";
import Basic from "./layouts/Basic";
import Home from "./pages/home";
import Register from './pages/register';
import Login from './pages/login';
import UpdatePassword from "./pages/updatePassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useAppSelector } from "./store/store";
import CreateGroupPage from "./pages/createGroup";
import SendInvitationPage from "./pages/invitation";
import AcceptInvitationPage from "./pages/acceptInvitation";


function App() {
  const { isAuthenticated } = useAppSelector(store => store.auth);

  return (
    <Routes>
      <Route element={<Basic />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/create-group" element={<CreateGroupPage/>} />
        <Route path="/send-invite" element={<SendInvitationPage/>} />
        <Route path="/join-group/:id" element={<AcceptInvitationPage/>} />
      </Route>
    </Routes>
  );
}

export default App;