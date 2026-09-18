import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Courses from "./pages/Courses";
import Footer from "./components/Footer";
import Account from "./pages/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/Loading";
import CourseDescription from "./pages/CourseDescription";
import PaymentSuccess from "./pages/PaymentSuccess";
import Dashbord from "./pages/Dashbord";
import Lecture from "./pages/Lecture";
import AdminDashbord from "./admin/AdminDashbord";
import AdminCourses from "./admin/AdminCourses";
import AdminUsers from "./admin/AdminUsers";
import About from "./pages/About";



const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Navbar isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<Navigate to="/courses" replace />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashbord user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashbord user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            <Route
              path="/about"
              element={isAuth ? <About user={user} /> : <Login />}
            />
            
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
