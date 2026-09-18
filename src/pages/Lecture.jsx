import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import { server } from "../main";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { Play, Award, Download, X } from "lucide-react";
import { SquareCheck, ChevronDown, ChevronUp } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import logo from "../assets/logo.png";
import signature from "../assets/signature.png";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);

  // Course data (for title + overall progress)
  const [course, setCourse] = useState(null);

  // Chapter
  const [chapters, setChapters] = useState([]);
  const [showChapter, setShowChapter] = useState(false);
  const [chapterTitle, setChapterTitle] = useState("");

  // Lecture popup
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Open/close chapter
  const [openChapter, setOpenChapter] = useState(null);

  // Progress tracking — loaded from backend
  const [completedLectures, setCompletedLectures] = useState([]);
  const [certificate, setCertificate] = useState(null);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState("");
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateDownloading, setCertificateDownloading] = useState(false);
  const certificateRef = React.useRef(null);

  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // subscription check
  if (
    user &&
    user.role !== "admin" &&
    !user.subscription?.some((id) => id.toString() === params.id)
  ) {
    return navigate("/");
  }

  // ================= FETCH =================

  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
    }
  };

  const fetchChapters = async () => {
    try {
      const { data } = await axios.get(`${server}/api/chapters/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setChapters(data.chapters);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(`${server}/api/progress/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setCompletedLectures(data.completedLectures || []);
      setCertificate(data.certificate || null);
    } catch (err) {
      console.log(err);
    }
  };

  const openCertificate = () => {
    if (certificate) {
      setShowCertificate(true);
      return;
    }

    setShowCertificateForm(true);
  };

  const generateCertificate = async (event) => {
    event.preventDefault();
    const name = certificateName.trim();

    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    setCertificateLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/progress/${params.id}/certificate`,
        { name },
        { headers: { token: localStorage.getItem("token") } },
      );
      setCertificate(data.certificate);
      setShowCertificateForm(false);
      setShowCertificate(true);
      toast.success("Certificate generated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to generate certificate",
      );
    } finally {
      setCertificateLoading(false);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    setCertificateDownloading(true);

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${course?.title || "course"}-certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Certificate download failed:", error);
      toast.error(error?.message || "Unable to download certificate");
    } finally {
      setCertificateDownloading(false);
    }
  };

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${server}/api/course/${params.id}`);
      setCourse(data.course);
    } catch (err) {
      console.log(err);
    }
  };

  // mark a lecture complete on the backend
  const markLectureComplete = async (lectureId) => {
    if (!completedLectures.includes(lectureId)) {
      setCompletedLectures((prev) => [...prev, lectureId]);
    }

    try {
      await axios.post(
        `${server}/api/progress/${params.id}`,
        { lectureId },
        {
          headers: { token: localStorage.getItem("token") },
        },
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to save progress");
      fetchProgress();
    }
  };

  // unmark a lecture (untick) on the backend
  const unmarkLectureComplete = async (lectureId) => {
    setCompletedLectures((prev) => prev.filter((id) => id !== lectureId));

    try {
      await axios.delete(`${server}/api/progress/${params.id}`, {
        data: { lectureId },
        headers: { token: localStorage.getItem("token") },
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to update progress");
      fetchProgress();
    }
  };

  // ================= GROUP =================
  const getLecturesByChapter = (chapterId) => {
    return lectures.filter((lec) => lec.chapter?.toString() === chapterId);
  };

  // overall course progress (all lectures, not per-chapter)
  const totalLessons = lectures.length;
  const totalCompleted = completedLectures.length;
  const overallPercent = totalLessons
    ? Math.round((totalCompleted / totalLessons) * 100)
    : 0;

  // ================= ADD CHAPTER =================
  const addChapterHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/api/chapter/${params.id}`,
        { title: chapterTitle },
        {
          headers: { token: localStorage.getItem("token") },
        },
      );

      toast.success(data.message);
      setShowChapter(false);
      setChapterTitle("");
      fetchChapters();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  // ================= ADD LECTURE =================
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandles = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);
    formData.append("chapter", selectedChapter);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        },
      );

      toast.success(data.message);

      setShowLecturePopup(false);
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
      fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }

    setBtnLoading(false);
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you wnat to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
    fetchChapters();
    fetchProgress();
    fetchCourseData();
  }, []);

  return (
    <>
      {/* ADD CHAPTER POPUP */}
      {showChapter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">
            <h2 className="font-bold mb-3 text-lg">Add Chapter</h2>

            <form onSubmit={addChapterHandler} className="space-y-3">
              <input
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Chapter Title"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowChapter(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LECTURE POPUP */}
      {showLecturePopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="font-bold mb-3 text-lg">Add Lecture</h2>

            <form onSubmit={submitHandles} className="space-y-3">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="file"
                onChange={changeVideoHandler}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />

              {videoPrev && (
                <video
                  src={videoPrev}
                  className="w-full rounded max-h-48 object-cover"
                  controls
                />
              )}

              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  {btnLoading ? "Please Wait..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLecturePopup(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN */}
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100 p-2 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
            {/* VIDEO */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden lg:sticky lg:top-6">
              {lecLoading ? (
                <Loading />
              ) : lecture.video ? (
                <>
                  <div className="w-full bg-black aspect-video flex items-center justify-center">
                    <video
                      src={lecture.video?.url || `${server}/${lecture.video}`}
                      controls
                      autoPlay
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                      {lecture.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                      {lecture.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-gray-500 font-medium">
                  Select Lecture
                </div>
              )}
            </div>

            {/* RIGHT SIDE (INDEPENDENTLY SCROLLABLE WITH SMALL SCROLLBAR) */}
            <div className="bg-gray-100 p-2 sm:p-4 rounded shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
              {/* COURSE TITLE + OVERALL PROGRESS */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 mb-4 border border-gray-200 shadow-sm">
                <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                  {course?.title}
                </h1>

                <div className="flex justify-between items-center mt-4 text-xs sm:text-sm">
                  <span className="text-gray-700 font-medium">Progress</span>
                  <span className="text-gray-700 font-medium">
                    {totalCompleted} of {totalLessons} lessons
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-2 bg-green-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${overallPercent}%` }}
                  ></div>
                </div>

                <p className="text-center text-xs text-gray-500 mt-2 font-medium">
                  {overallPercent}% Complete
                </p>

                <button
                  onClick={openCertificate}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700"
                >
                  <Award className="h-5 w-5" />
                  {certificate ? "View Certificate" : "View Certificate"}
                </button>
              </div>

              {user?.role === "admin" && (
                <button
                  onClick={() => setShowChapter(true)}
                  className="w-full mb-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-sm"
                >
                  Add Chapter +
                </button>
              )}

              <div className="space-y-3">
                {chapters.map((ch, i) => {
                  const chapterLectures = getLecturesByChapter(ch._id);

                  const completedCount = chapterLectures.filter((lec) =>
                    completedLectures.includes(lec._id),
                  ).length;

                  const total = chapterLectures.length;
                  const progress = total ? (completedCount / total) * 100 : 0;

                  return (
                    <div
                      key={ch._id}
                      className="border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-sm"
                    >
                      {/* HEADER */}
                      <div
                        onClick={() =>
                          setOpenChapter(openChapter === ch._id ? null : ch._id)
                        }
                        className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <button className="cursor-pointer font-bold text-base sm:text-lg text-left text-gray-900 flex-1">
                            {ch.title}
                          </button>

                          <div className="flex gap-2 cursor-pointer items-center shrink-0">
                            <span className="text-xs sm:text-sm font-medium text-gray-600">
                              {completedCount}/{total}
                            </span>
                            {user?.role === "admin" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedChapter(ch._id);
                                  setShowLecturePopup(true);
                                }}
                                className="bg-black text-white p-1 rounded-full hover:bg-gray-800 transition cursor-pointer"
                              >
                                <CiCirclePlus className="h-5 w-5 font-bold" />
                              </button>
                            )}

                            <span className="text-gray-600">
                              {openChapter === ch._id ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronUp className="h-5 w-5" />
                              )}
                            </span>
                          </div>
                        </div>

                        {/* PROGRESS */}
                        <div className="mt-3">
                          <div className="flex justify-between items-center text-xs text-gray-600 gap-2">
                            <span className="cursor-pointer font-semibold shrink-0">
                              {total} lessons
                            </span>
                            <div className="w-full max-w-[180px] sm:max-w-[220px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* LECTURES */}
                      {openChapter === ch._id && (
                        <div className="p-2 border-t border-gray-100 bg-gray-50 space-y-1">
                          {chapterLectures.length > 0 ? (
                            chapterLectures.map((lec, index) => (
                              <div
                                key={lec._id}
                                onClick={() => {
                                  fetchLecture(lec._id);
                                  markLectureComplete(lec._id);
                                }}
                                className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition gap-2 ${
                                  lecture._id === lec._id
                                    ? "bg-gray-200 font-semibold"
                                    : "hover:bg-gray-200/60"
                                }`}
                              >
                                <button className="flex items-center gap-2 text-xs sm:text-sm text-left truncate flex-1 font-medium text-gray-800">
                                  <Play className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                                  <span className="truncate">
                                    {index + 1}. {lec.title}
                                  </span>
                                </button>

                                {/* RIGHT SIDE (CHECK + DELETE) */}
                                <div className="flex items-center gap-2 shrink-0">
                                  {/* COMPLETE BUTTON */}
                                  <span
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      if (completedLectures.includes(lec._id)) {
                                        unmarkLectureComplete(lec._id);
                                      } else {
                                        markLectureComplete(lec._id);
                                      }
                                    }}
                                    className={`w-5 h-5 flex items-center justify-center rounded border cursor-pointer transition ${
                                      completedLectures.includes(lec._id)
                                        ? "bg-green-500 text-white border-green-500"
                                        : "bg-white text-transparent border-gray-400 hover:border-gray-600"
                                    }`}
                                  >
                                    <SquareCheck className="h-3.5 w-3.5 stroke-[3]" />
                                  </span>

                                  {/* DELETE BUTTON (ADMIN ONLY) */}
                                  {user?.role === "admin" && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteHandler(lec._id);
                                      }}
                                      className="text-red-500 hover:text-red-700 p-1 transition"
                                    >
                                      <RiDeleteBin6Line className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-xs sm:text-sm p-2 text-center">
                              No lectures yet
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE NAME FORM POPUP */}
      {showCertificateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Generate Certificate</h2>
              <button
                onClick={() => setShowCertificateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Enter your name exactly as you want it to appear on the certificate.
            </p>

            <form onSubmit={generateCertificate} className="space-y-3">
              <input
                value={certificateName}
                onChange={(e) => setCertificateName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={certificateLoading}
                  className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition disabled:opacity-60"
                >
                  {certificateLoading ? "Generating..." : "Generate Certificate"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertificateForm(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CERTIFICATE DISPLAY */}
      {certificate && showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-auto">
          <div className="w-full max-w-6xl flex flex-col items-center">
            {/* CERTIFICATE CANVAS */}
            <div
              ref={certificateRef}
              className="shadow-2xl overflow-hidden relative"
              style={{
                width: "1100px",
                height: "778px",
                fontFamily: "Georgia, serif",
                border: "12px solid #c8cdd4",
                color: "#0D1B2A",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="flex w-full h-full">
                {/* ================= LEFT PANEL ================= */}
                <div
                  className="w-[660px] p-[52px_56px_36px_52px] flex flex-col relative"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  {/* Corner Accents */}
                  <div
                    className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2"
                    style={{ borderColor: "#D4AF37" }}
                  ></div>
                  <div
                    className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2"
                    style={{ borderColor: "#D4AF37" }}
                  ></div>

                  {/* LOGO */}
                  <div className="mb-6 flex items-center">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-sm"
                      style={{ border: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* DATE */}
                  <p className="text-xs mb-5 tracking-wide" style={{ color: "#6b7280" }}>
                    {new Date(certificate.issuedAt).toLocaleDateString()}
                  </p>

                  {/* NAME */}
                  <h1
                    className="text-[44px] font-bold leading-tight mb-4 break-words"
                    style={{ color: "#0D1B2A" }}
                  >
                    {certificate.name}
                  </h1>

                  <p className="text-sm mb-4" style={{ color: "#6b7280" }}>
                    has successfully completed
                  </p>

                  {/* COURSE TITLE */}
                  <h2
                    className="text-[22px] font-bold leading-snug mb-3 break-words"
                    style={{ color: "#0D1B2A" }}
                  >
                    {course?.title}
                  </h2>

                  <p className="text-[12px] max-w-[480px] mb-10" style={{ color: "#6b7280" }}>
                    an online course authorized by CodeWithSanowar and offered
                    through codewithsanowar.com
                  </p>

                  {/* SIGNATURE & ID */}
                  <div className="mt-auto pt-6 flex flex-col items-start">
                    <div className="h-20 flex items-end">
                      <img
                        src={signature}
                        alt="Signature"
                        crossOrigin="anonymous"
                        className="h-full object-contain"
                        style={{
                          filter: "contrast(160%) brightness(80%)",
                          imageRendering: "crisp-edges",
                        }}
                      />
                    </div>

                    <p className="font-semibold text-sm mt-1" style={{ color: "#0D1B2A" }}>
                      Sanowar Ali
                    </p>

                    <p className="text-xs mb-3" style={{ color: "#4b5563" }}>
                      Instructor, CodeWithSanowar
                    </p>

                    <div className="w-52 h-[1px] mb-2" style={{ backgroundColor: "#ca8a0480" }}></div>

                    <p className="text-[10px] tracking-widest" style={{ color: "#6b7280" }}>
                      CERTIFICATE ID: CWS-{course.title}
                      {certificate._id?.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* ================= RIGHT PANEL ================= */}
                <div
                  className="flex-1 relative flex flex-col items-center justify-between pb-10 overflow-hidden"
                  style={{ backgroundColor: "#f0f2f5" }}
                >
                  <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(135deg,transparent,transparent_12px,#000_14px)]"></div>

                  <svg
                    viewBox="0 0 440 260"
                    className="w-full z-10 block"
                    preserveAspectRatio="none"
                  >
                    <polygon points="0,0 440,0 440,200 220,250 0,200" fill="#0D1B2A" />
                    <line x1="140" y1="75" x2="300" y2="75" stroke="#D4AF37" strokeWidth="1.2" />
                    <polygon points="220,71 224,75 220,79 216,75" fill="#D4AF37" />
                    <text
                      x="220"
                      y="115"
                      textAnchor="middle"
                      fill="#D4AF37"
                      fontSize="17"
                      fontFamily="Georgia, serif"
                      letterSpacing="7"
                      fontWeight="600"
                    >
                      COURSE
                    </text>
                    <text
                      x="220"
                      y="150"
                      textAnchor="middle"
                      fill="#D4AF37"
                      fontSize="17"
                      fontFamily="Georgia, serif"
                      letterSpacing="6"
                      fontWeight="600"
                    >
                      CERTIFICATE
                    </text>
                    <line x1="140" y1="180" x2="300" y2="180" stroke="#D4AF37" strokeWidth="1.2" />
                    <polygon points="220,176 224,180 220,184 216,180" fill="#D4AF37" />
                  </svg>

                  <div className="z-10 flex items-center justify-center my-auto">
                    <svg width="160" height="160" viewBox="0 0 150 150">
                      <defs>
                        <path id="badge-top-arc" d="M 23,75 A 52,52 0 1,1 127,75" />
                        <path id="badge-bot-arc" d="M 30,96 A 52,52 0 0,0 120,96" />
                      </defs>

                      <circle
                        cx="75"
                        cy="75"
                        r="73"
                        fill="none"
                        stroke="#B8960C"
                        strokeWidth="0.7"
                        strokeDasharray="3 2.5"
                      />
                      <circle cx="75" cy="75" r="64" fill="#FEFEFE" stroke="#B8960C" strokeWidth="1.5" />
                      <circle
                        cx="75"
                        cy="75"
                        r="57"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="0.5"
                        opacity="0.5"
                      />

                      {Array.from({ length: 36 }).map((_, i) => {
                        const angle = (i * 10 * Math.PI) / 180;
                        const x1 = 75 + 65 * Math.cos(angle);
                        const y1 = 75 + 65 * Math.sin(angle);
                        const x2 = 75 + 72 * Math.cos(angle);
                        const y2 = 75 + 72 * Math.sin(angle);
                        return (
                          <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#B8960C"
                            strokeWidth="0.9"
                          />
                        );
                      })}

                      <text
                        fontSize="8.5"
                        fill="#B8960C"
                        fontFamily="Georgia, serif"
                        letterSpacing="3.5"
                        fontWeight="400"
                      >
                        <textPath href="#badge-top-arc" startOffset="50%" textAnchor="middle">
                          CODEWITHSANOWAR
                        </textPath>
                      </text>

                      <text
                        fontSize="8.5"
                        fill="#B8960C"
                        fontFamily="Georgia, serif"
                        letterSpacing="5"
                        fontWeight="400"
                      >
                        <textPath href="#badge-bot-arc" startOffset="50%" textAnchor="middle">
                          CERTIFIED
                        </textPath>
                      </text>

                      <text
                        x="75"
                        y="64"
                        textAnchor="middle"
                        fill="#0D1B2A"
                        fontSize="8.5"
                        fontFamily="Georgia, serif"
                        letterSpacing="1.5"
                      >
                        CODE WITH
                      </text>
                      <text
                        x="75"
                        y="80"
                        textAnchor="middle"
                        fill="#0D1B2A"
                        fontSize="14"
                        fontFamily="Georgia, serif"
                        fontWeight="bold"
                        letterSpacing="0.5"
                      >
                        SANOWAR
                      </text>

                      <text
                        x="75"
                        y="93"
                        textAnchor="middle"
                        fill="#B8960C"
                        fontSize="7"
                        fontFamily="Georgia, serif"
                        letterSpacing="3"
                      >
                        ✦ ✦ ✦
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={downloadCertificate}
                disabled={certificateDownloading}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                {certificateDownloading ? "Downloading..." : "Download"}
              </button>

              <button
                onClick={() => setShowCertificate(false)}
                className="bg-white px-6 py-2.5 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;