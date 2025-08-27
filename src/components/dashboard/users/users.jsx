import { getAllUsers } from "../../../api/services/admingService";
import "./uStyle.css";
import { useEffect, useState } from "react";
import coins from '../../../../public/ydot.png';
import searchIcon from '../../../../public/search.png'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const calculateAge = (birthday) => {
    if (!birthday) return "-";
    const birthDate = new Date(birthday);
    const diff = Date.now() - birthDate.getTime();
    const age = new Date(diff).getUTCFullYear() - 1970;
    return age + " سنة";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const date = new Date(isoString);
    return date.toLocaleString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // فلترة المستخدمين حسب البحث
 const filteredUsers = users.filter((u) => {
  return (
    (u.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (u.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (u.email?.toLowerCase() || "").includes(search.toLowerCase())
  );
});

  return (
    <>
      <div className="users">
        <div className="container">
          <div className="users-cont">
            <div className="h-cont">
              <div className="back-btn">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/admin";
                  }}
                >
                  <img src="/back.png" alt="" />
                </button>
              </div>
              <h1>المستخدمين</h1>
              <div className="cont-info">
                <div className="info">
                  <h3>عدد</h3>
                  <p>{users.length}</p>
                </div>
              </div>
            </div>

            {/* مربع البحث */}
            <div className="search">
              <div className="search-inp">
                <img src={searchIcon} alt="" />
                <input
                  type="text"
                  placeholder="بحث"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="cards">
              {filteredUsers.map((user) => (
                <div className="card" key={user._id}>
                  <div className="card-info">
                    <button>عرض</button>
                    <div className="contant-info">
                      <p>{calculateAge(user.birthday)}</p>
                      <p>{user.countryCode + user.phone}</p>
                    </div>
                    <div className="main-info">
                      <p>{user.coins} <img src={coins} style={{width:25}} /></p>
                      <p>{user.username}</p>
                      <h5>{user.name}</h5>
                    </div>
                    <div className="extra-info">
                      <p>آخر دخول: {formatDate(user.lastLogin)}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && (
                <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                  لا يوجد مستخدمين
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
