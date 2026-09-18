import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import Layout from "./Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") return navigate("/");

  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // 🔥 UPDATE ROLE FUNCTION
  const updateRole = async (id) => {
    if (confirm("are you sure you want to update this user role")) {
      try {
        setLoadingId(id);

        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          },
        );

        toast.success(data.message);

        fetchUser(); // refresh list
      } catch (error) {
        toast.error(error.response?.data?.message || "Error updating role");
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
          All Users
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all registered users
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 text-center">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((e, i) => (
                <tr
                  key={e._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-center">{i + 1}</td>

                  <td className="p-4 font-bold text-black">{e.name}</td>

                  <td className="p-4 text-gray-700 font-medium">{e.email}</td>

                  {/* Role Badge */}
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-2 font-semibold
                    ${
                      e.role === "admin"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                    >
                      {e.role}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updateRole(e._id)}
                      disabled={loadingId === e._id}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer
                    ${
                      loadingId === e._id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white hover:scale-105"
                    }`}
                    >
                      {loadingId === e._id ? "Updating..." : "Change Role"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile UI */}
      <div className="md:hidden space-y-4">
        {users &&
          users.map((e, i) => (
            <div key={e._id} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{e.name}</h2>

                <span
                  className={`px-2 py-1 text-2 rounded-full
                ${
                  e.role === "admin"
                    ? "bg-green-100 text-green-600"
                    : "bg-blue-100 text-blue-600"
                }`}
                >
                  {e.role}
                </span>
              </div>

              <p className="text-sm text-gray-500">{e.email}</p>

              <button
                onClick={() => updateRole(e._id)}
                disabled={loadingId === e._id}
                className="mt-3 w-full bg-black text-white py-2 rounded-lg"
              >
                {loadingId === e._id ? "Updating..." : "Change Role"}
              </button>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default AdminUsers;
