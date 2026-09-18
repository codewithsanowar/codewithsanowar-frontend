import React, { useEffect, useState } from "react";
import Layout from "./Utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const { courses, fetchCourses } = CourseData();

  const [open, setOpen] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [price, setPrice] = useState("");
  const [btnLoading, setBtnLoading] = useState("");
  const [language, setLanguage] = useState("");
  const [oldprice, setOldprice] = useState("");
  const [lessons, setLessons] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (user && user.role !== "admin") return null;

  // dummy submit (connect your API here)
  const handleSubmit = async(e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData()

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    if (!image) {
      toast.error("Please select a course image");
      setBtnLoading(false);
      return;
    }
    myForm.append("image", image);
    myForm.append("language",language);
    myForm.append("oldprice",oldprice);
    myForm.append("lessons",lessons);

    try {
        const {data} = await axios.post(`${server}/api/course/new`,myForm,{
            headers: {
                token: localStorage.getItem("token"),
            },
        });

        toast.success(data.message);
        await fetchCourses();
        setTitle("");
        setDescription("");
        setDuration("");
        setCategory("")
        setCreatedBy("");
        setImage("");
        setImagePrev("");
        setLessons("");
        setLanguage("");
        setOldprice("");
        setPrice("");
        setOpen(false);
    } catch (error) {
        toast.error(error.response?.data?.message || "Unable to create course");
    } finally {
        setBtnLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
          All Courses
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-lg bg-black text-white text-sm sm:text-base shadow-md hover:scale-105 transition font-bold"
        >
          + Add Course
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {courses && courses.length > 0 ? (
          courses.map((e) => (
            <div
              key={e._id}
              className="hover:scale-[1.02] transition duration-300"
            >
              <CourseCard course={e} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
            <p className="text-lg font-medium">No Courses Yet</p>
            <p className="text-sm">Start by adding a new course</p>
          </div>
        )}
      </div>

      {/* 🔥 POPUP MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 z-50 animate-fadeIn">
            {/* Close */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Course</h2>
              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <input
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Description */}
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Category */}
              <input
                type="text"
                placeholder="Category (e.g. Development)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Created By */}
              <input
                type="text"
                placeholder="Instructor Name"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Duration */}
              <input
                type="number"
                min="1"
                placeholder="Duration (in weeks)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Language */}
              <input
                type="text"
                placeholder="Language (e.g. Hindi / English)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                placeholder="Lecture"
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="number"
                placeholder="Oldprice"
                value={oldprice}
                onChange={(e) => setOldprice(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setImagePrev(URL.createObjectURL(file));
                }}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* Image Preview */}
              {imagePrev && (
                <img
                  src={imagePrev}
                  alt="preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={btnLoading}
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {btnLoading ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminCourses;
