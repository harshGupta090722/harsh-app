import React, { useEffect, useState } from "react";
import logo from "../../public/logo.webp";
import { Link, NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Slider settings
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 2, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen">
      <div className="text-white container mx-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between p-6 shadow-lg backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="md:text-2xl text-orange-500 font-bold tracking-wide">Mentora</h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent border border-white rounded-full px-4 py-2 text-sm md:text-lg hover:bg-orange-500 hover:shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent border border-white rounded-full px-4 py-2 text-sm md:text-lg hover:bg-green-500 hover:shadow-lg transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-transparent border border-white rounded-full px-4 py-2 text-sm md:text-lg hover:bg-blue-500 hover:shadow-lg transition-all duration-300"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold text-orange-500 drop-shadow-lg">Mentora</h1>
          <p className="text-gray-400 mt-4">Sharpen your skills with courses crafted by experts.</p>
          <div className="mt-8">
            <Link
              to="/courses"
              className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-600 hover:scale-105 transition-all duration-300"
            >
              Explore Courses
            </Link>
          </div>
        </section>

        {/* Courses Slider */}
        <section className="p-10">
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-4">
                <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <img
                    className="h-32 w-full object-contain bg-gray-800"
                    src={course?.image?.url || "java.png"}
                    alt={course?.title || "Course Image"}
                  />
                  <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-white">{course.title}</h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="mt-4 inline-block bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Footer */}
        <footer className="my-12 border-t border-gray-700 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Logo and Social */}
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10 h-10 rounded-full shadow-md" />
                <h1 className="text-2xl text-orange-500 font-bold">Mentora</h1>
              </div>
              <p className="text-gray-400">Follow us</p>
              <div className="flex space-x-4">
                <NavLink to="https://www.linkedin.com/in/harsh-gupta-04455b24a/">
                  <FaFacebook className="text-2xl hover:text-blue-400 transition duration-300" />
                </NavLink>
                <NavLink to="https://www.linkedin.com/in/harsh-gupta-04455b24a/">
                  <FaInstagram className="text-2xl hover:text-pink-500 transition duration-300" />
                </NavLink>
                <NavLink to="https://www.linkedin.com/in/harsh-gupta-04455b24a/">
                  <FaTwitter className="text-2xl hover:text-blue-500 transition duration-300" />
                </NavLink>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold pr-[110px] mb-4">Connect With Us!</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition duration-300">Gmail - harshgupta0907@gmail.com</li>
                <li className="hover:text-white transition duration-300">Phone No - 955512xxxx</li>
                <li className="hover:text-white transition duration-300">Github - Harsh Gupta</li>
              </ul>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4">Copyright © 2024</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition duration-300">Terms & Conditions</li>
                <li className="hover:text-white transition duration-300">Privacy Policy</li>
                <li className="hover:text-white transition duration-300">Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    <div>harsh</div>
    </div>
  );
}

export default Home;