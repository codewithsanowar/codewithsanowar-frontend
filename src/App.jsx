import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserData } from "./context/UserContext";
import Loading from "./components/Loading";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Verify = lazy(() => import("./pages/auth/Verify"));
const Courses = lazy(() => import("./pages/Courses"));
const Account = lazy(() => import("./pages/Account"));
const CourseDescription = lazy(() => import("./pages/CourseDescription"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Dashbord = lazy(() => import("./pages/Dashbord"));
const Lecture = lazy(() => import("./pages/Lecture"));
const AdminDashbord = lazy(() => import("./admin/AdminDashbord"));
const AdminCourses = lazy(() => import("./admin/AdminCourses"));
const AdminUsers = lazy(() => import("./admin/AdminUsers"));
const About = lazy(() => import("./pages/About"));



const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Navbar isAuth={isAuth} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={isAuth ? <Home /> : <Login />} />
              <Route path="/register" element={isAuth ? <Home /> : <Register />} />
              <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course" element={<Navigate to="/courses" replace />} />
              <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
              <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
              <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Login />} />
              <Route path="/:id/dashboard" element={isAuth ? <Dashbord user={user} /> : <Login />} />
              <Route path="/lectures/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
              <Route path="/admin/dashboard" element={isAuth ? <AdminDashbord user={user} /> : <Login />} />
              <Route path="/admin/course" element={isAuth ? <AdminCourses user={user} /> : <Login />} />
              <Route path="/admin/users" element={isAuth ? <AdminUsers user={user} /> : <Login />} />
              <Route path="/about" element={isAuth ? <About user={user} /> : <Login />} />
            </Routes>
          </Suspense>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
