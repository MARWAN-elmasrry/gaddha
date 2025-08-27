import { getAllMessages } from "../../../api/services/admingService";
import "./dmStyle.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Dmess = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMessages();
        setMessages(data);
      } catch (err) {
        console.error(err);
        toast.error("خطا غى سحب البيانات")
      }
    };

    fetchData();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="d-mess">
        <div className="container">
          <div className="d-mess-cont">
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
              <h1>الرسائل</h1>
              <div className="cont-info">
                <div className="info">
                  <h3>كلي</h3>
                  <p>{messages.length}</p>
                </div>
              </div>
            </div>

            <div className="cards">
              {messages.map((msg) => (
                <div className="card" key={msg._id}>
                  <div className="card-num">
                    <span className="number">
                      <img src="/delete.png" alt="delete" />
                    </span>
                  </div>
                  <div className="card-info">
                    <div className="main-info">
                      <h3>{formatDate(msg.timestamp)}</h3>
                      <h3>{msg.name}</h3>
                    </div>
                    <div className="contact-info">
                      <p>{msg.email}</p>
                      <p>{msg.phone}</p>
                    </div>
                    <div className="mess">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  لا توجد رسائل
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dmess;
