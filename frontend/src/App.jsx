// App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./assets/components/Menu";
import HomePage from "./assets/components/homepage";
import SignIn from "../auth/signin";
import SignOut from "../auth/signout";
import SignUp from "../auth/signup";
import Featured from "./assets/components/featured";
import MyProfile from "./myprofile";
import MyReviews from "./myreviews";

import WriteReview from "./writereview";

import ProtectedRoutes from "../auth/protectedRoutes";
import { createContext, useReducer } from "react";

import { initialState, reducer } from "./reducer/useReducer";

export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Menu />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/featured" element={<Featured />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/featured" element={<Featured />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="/write-review/:businessId" element={<WriteReview />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
