import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../context/CourseContext";
import { server } from "../main";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import Loading from "../components/Loading";
import { IoPlayOutline } from "react-icons/io5";


const CourseDescription = ({ user }) => {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();
  const { fetchUser } = UserData();

  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef(null);

  const [previewLecture, setPreviewLecture] = useState(null);
  const [previewLectures, setPreviewLectures] = useState([]);

  // ✅ NEW: chapters + which one is open
  const [previewChapters, setPreviewChapters] = useState([]);
  const [openChapter, setOpenChapter] = useState(null);

  useEffect(() => {
    fetchCourse(params.id);

    axios
      .get(`${server}/api/preview/${params.id}`)
      .then(({ data }) => setPreviewLecture(data.lecture))
      .catch((err) => console.log(err));

    axios
      .get(`${server}/api/lectures/preview/${params.id}`)
      .then(({ data }) => setPreviewLectures(data.lectures || []))
      .catch((err) => console.log(err));

    // ✅ NEW: fetch chapters for grouping
    axios
      .get(`${server}/api/chapters/preview/${params.id}`)
      .then(({ data }) => setPreviewChapters(data.chapters || []))
      .catch((err) => console.log(err));

    setTimeout(() => {
      cardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  }, [params.id]);

  // ✅ NEW: group lectures by chapter id
  const getLecturesByChapter = (chapterId) => {
    return previewLectures.filter(
      (lec) => lec.chapter?.toString() === chapterId
    );
  };

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        { headers: { token } },
      );
      const { order, keyId } = data;

      if (!window.Razorpay || !keyId) {
        throw new Error(
          "Payment service is unavailable. Please try again later.",
        );
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "CodeWithSanowar",
        image:
          "https://res.cloudinary.com/bpkd0vhd/image/upload/v1789144443/ChatGPT_Image_Sep_3_2026_10_33_29_AM.png",
        description: "Learn with us",
        order_id: order.id,

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const { data: verificationData } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              { headers: { token } },
            );

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(verificationData.message);
            navigate(`/payment-success/${razorpay_payment_id}`);
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Payment verification failed",
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: {
          color: "#8a4baf",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", () => {
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      });
      razorpay.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment",
      );
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="bg-[#f8fafc] min-h-screen">
              {/* HERO */}
              <div className="bg-[#0f172a] text-white py-20 px-4 md:px-10">
                <div className="max-w-8xl mx-auto">
                  <div className="bg-[#0f172a] px-2 py-1 mb-5">
                    <div className="flex items-center text-gray-300 text-sm font-medium space-x-1">
                      <span className="hover:text-white cursor-pointer">
                        CodeWithSanowar
                      </span>

                      <ChevronRight className="w-4 h-4 text-gray-400" />

                      <span className="text-gray-300 font-semibold">
                        Courses
                      </span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    {course.title}
                  </h1>

                  <p className="mt-6 sm:mt-8 text-gray-300 max-w-3xl text-base sm:text-lg md:text-xl">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8 text-sm cursor-pointer">
                    <span className="bg-amber-300 px-3 py-1 rounded text-black font-medium hover:bg-gray-300">
                      Hot & New
                    </span>

                    <span className="bg-amber-300 px-3 py-1 rounded text-black font-medium hover:bg-gray-300">
                      {course.language}
                    </span>
                  </div>

                  <p className="mt-6 sm:mt-8 text-sm text-gray-300 font-medium flex flex-wrap gap-2 items-center">
                    Created by
                    <span className="text-white border border-blue-400 rounded-md px-3 py-1">
                      {course.createdBy}
                    </span>
                  </p>
                </div>
              </div>

              {/* MAIN */}
              <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
                {/* RIGHT SIDEBAR FIRST (mobile) */}
                <div className="w-full lg:w-[360px] xl:w-[460px] order-1 lg:order-2">
                  <div
                    ref={cardRef}
                    className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24"
                  >
                    <div className="relative">
                      <img
                        src={`${server}/${course.image}`}
                        alt=""
                        className="w-full h-auto object-cover"
                      />

                      {previewLecture && (
                        <button
                          onClick={() => setShowVideo(true)}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="bg-black hover:bg-black/60 text-white rounded-full p-5 text-xl hover:scale-110 transition">
                           <IoPlayOutline className="w-6 h-6"/>
                          </div>
                        </button>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      {!(user && user.subscription.includes(course._id)) && (
                        <div className="flex items-center gap-3 mt-2">
                          <h2 className="text-3xl  font-bold">
                            ₹{course.price}
                          </h2>

                          <span className="line-through text-gray-400  text-2xl">
                            ₹{course.oldprice}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mt-5 text-xs sm:text-sm text-gray-500">
                        <span className="border px-2 py-1 rounded-md font-semibold">
                          🌐 {course.language}
                        </span>
                        <span className="border px-2 py-1 rounded-md font-semibold">
                          ⏱ {course.duration} weeks
                        </span>
                        <span className="border px-2 py-1 rounded-md font-semibold">
                          📚 {course.lessons} lessons
                        </span>
                      </div>

                      {user && user.subscription?.includes(course._id) ? (
                        <button
                          onClick={() => navigate(`/lectures/${course._id}`)}
                          className="w-full mt-6 bg-black hover:bg-gray-900 text-white py-2 sm:py-3 rounded-md font-bold text-xl"
                        >
                          Watch Now
                        </button>
                      ) : (
                        <button
                          onClick={checkoutHandler}
                          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-md font-medium"
                        >
                          Enroll Now
                        </button>
                      )}

                      <span className="flex justify-center items-center mt-3 text-gray-700 text-sm">
                        Purchase this course to get access
                      </span>

                      <div className="mt-6">
                        <h3 className="font-bold mb-2 text-sm sm:text-base">
                          This course includes:
                        </h3>

                        <ul className="text-sm text-gray-600 space-y-2 font-medium">
                          <li>• Lifetime access with free updates.</li>
                          <li>• Step-by-step, hands-on project guidance.</li>
                          <li>• Downloadable resources and source code.</li>
                          <li>• Certificate of completion.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* LEFT SIDE SECOND (mobile) */}
                <div className="flex-1 min-w-0 order-2 lg:order-1">
                  {/* ✅ REPLACED: Course Content now grouped by chapter */}
                  {previewChapters.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-bold mb-4">
                        Course Content
                      </h2>

                      {previewChapters.map((ch) => {
                        const chapterLectures = getLecturesByChapter(ch._id);
                        const totalMinutes = chapterLectures.reduce(
                          (sum, lec) => sum + (lec.duration || 0),
                          0
                        );
                        const isOpen = openChapter === ch._id;

                        return (
                          <div key={ch._id} className="border-b last:border-none">
                            <button
                              onClick={() =>
                                setOpenChapter(isOpen ? null : ch._id)
                              }
                              className="w-full flex items-center justify-between py-3 sm:py-4 text-left"
                            >
                              <span className="flex items-center gap-2 font-semibold text-sm sm:text-base text-gray-900">
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                )}
                                {ch.title}
                              </span>

                              <span className="text-xs sm:text-sm text-blue-600 font-medium">
                               {chapterLectures.length} lectures
                                {totalMinutes > 0 && ` • ${totalMinutes}min`}
                              </span>
                            </button>

                            {isOpen && (
                              <div className="pb-3 sm:pb-4 pl-6 space-y-2">
                                {chapterLectures.length > 0 ? (
                                  chapterLectures.map((lec, i) => (
                                    <div
                                      key={lec._id}
                                      className="flex justify-between text-sm text-gray-600"
                                    >
                                      <span className="flex gap-3 justify-center items-center">
                                         <IoPlayOutline/>  {i + 1}. {lec.title}
                                      </span>
                                      {lec.duration > 0 && (
                                        <span className="text-gray-400">
                                          {lec.duration}min
                                        </span>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-gray-400">
                                    No lectures yet
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Description */}
                  <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6 w-full">
                    <h2 className="text-lg sm:text-xl font-bold mb-3">
                      Course Description
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                      {course.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* VIDEO POPUP */}
              {showVideo && previewLecture?.video && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg overflow-hidden w-[90%] max-w-5xl relative">
                    <button
                      onClick={() => setShowVideo(false)}
                      className="absolute top-2 right-2 text-black text-xl"
                    >
                      ✕
                    </button>

                    <video
                      src={previewLecture.video?.url || `${server}/${previewLecture.video}`}
                      controls
                      autoPlay
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;