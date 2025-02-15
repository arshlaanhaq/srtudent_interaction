import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    phone: "",
    address: "",
    course: "",
    dob: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch courses
        const coursesRes = await API.get("/application", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(coursesRes.data);

        // Fetch student profile
        const profileRes = await API.get("/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentProfile(profileRes.data);
        setProfileData({
          phone: profileRes.data.phone || "",
          address: profileRes.data.address || "",
          course: profileRes.data.course || "",
          dob: profileRes.data.dob ? profileRes.data.dob.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const handleApply = async () => {
    if (!courseName.trim()) {
      alert("Course name cannot be empty!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/application/apply",
        { courseName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses([...courses, res.data]);
      setShowModal(false);
      setCourseName("");
    } catch (err) {
      console.error("Error applying for course", err);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");  
      const res = await API.put("/student/profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudentProfile(res.data);
      setShowProfileModal(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, {user?.role} 👋</h2>

        {/* Student Profile Section */}
        {studentProfile ? (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <h3 className="text-lg font-semibold">Student Profile</h3>
            <p><strong>Phone:</strong> {studentProfile.phone || "Not provided"}</p>
            <p><strong>Address:</strong> {studentProfile.address || "Not provided"}</p>
            <p><strong>Course:</strong> {studentProfile.course || "Not enrolled"}</p>
            <p><strong>DOB:</strong> {studentProfile.dob ? new Date(studentProfile.dob).toLocaleDateString() : "Not provided"}</p>
            <button
              onClick={() => setShowProfileModal(true)}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        ) : (
          <div className="mt-4 p-4 border rounded-lg bg-gray-100">
            <p className="text-gray-500">Student profile not found.</p>
            <button
              onClick={() => setShowProfileModal(true)}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Add Profile
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Apply for Course
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Courses List */}
        <h3 className="mt-6 text-xl font-semibold text-gray-700">Your Applications:</h3>
        {courses.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {courses.map((course) => (
              <li
                key={course._id}
                className="bg-gray-100 border-l-4 border-blue-500 p-3 rounded-lg shadow-sm"
              >
                {course.courseName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">No applications yet.</p>
        )}
      </div>

      {/* Apply Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-gray-800">Apply for a Course</h3>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              className="w-full mt-3 p-2 border rounded-lg"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="mr-3 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold text-gray-800">Update Profile</h3>
            <input type="text" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} placeholder="Phone" className="w-full mt-3 p-2 border rounded-lg" />
            <input type="text" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} placeholder="Address" className="w-full mt-3 p-2 border rounded-lg" />
            <input type="text" value={profileData.course} onChange={(e) => setProfileData({ ...profileData, course: e.target.value })} placeholder="Course" className="w-full mt-3 p-2 border rounded-lg" />
            <input type="date" value={profileData.dob} onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })} className="w-full mt-3 p-2 border rounded-lg" />
            <button onClick={handleProfileUpdate} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
