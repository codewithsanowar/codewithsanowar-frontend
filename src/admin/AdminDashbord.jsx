import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Utils/Layout'
import axios from "axios"
import { server } from "../main";

const AdminDashbord = ({user}) => {

   const navigate = useNavigate()

   if(user && user.role !== "admin") return navigate("/")

   const [stats, setStats] = useState({});

   async function fetchStats() {
    try {
        const {data} = await axios.get(`${server}/api/stats`,{
            headers: {
                token: localStorage.getItem("token"),
            },
        });
        setStats(data.stats);
    } catch (error) {
        console.log(error);
    }
   }
   
   useEffect(()=>{
    fetchStats();
   }, []);

  return (
    <Layout>

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* Card */}
        <div className="bg-gradient-to-r from-black to-black text-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <p className="text-sm opacity-80 text-white">Total Courses</p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            {stats.totalCourse || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-black to-black text-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <p className="text-sm opacity-80">Total Chapters</p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            {stats.totalChapters || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-black to-black text-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <p className="text-sm opacity-80">Total Lectures</p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            {stats.totalLectures || 0}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-black to-black text-white p-5 rounded-xl shadow-lg hover:scale-105 transition duration-300">
          <p className="text-sm opacity-80">Total Users</p>
          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            {stats.totalUser || 0}
          </h2>
        </div>

      </div>

    </Layout>
  )
}

export default AdminDashbord