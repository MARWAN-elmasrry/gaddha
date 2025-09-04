import { getAllMessages, messageReply, messageAsSeen } from "../../../api/services/admingService";
import { Loading } from "../dmain/dmain";
import "./dmStyle.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useContext } from "react";
import { AbilityContext } from "../../../context/abilityContext";

const Dmess = () => {

  const ability = useContext(AbilityContext);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setloadingMessages] = useState(true);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replies, setReplies] = useState({});
  const [sentReply, setSentReply] = useState(null);

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getAllMessages();
        setMessages(data);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في سحب البيانات", err);
      } finally {
        clearTimeout(timeoutId);
        setloadingMessages(false);
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
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

  const handleReply = (msgId) => {
    setReplyingTo(msgId);
  };

  const handleChangeReply = (msgId, text) => {
    setReplies((prev) => ({
      ...prev,
      [msgId]: text,
    }));
  };

  const handleSendReply = (msgId) => {
    const replyText = replies[msgId] || "";
    setSentReply({ id: msgId, reply: replyText });
    setReplyingTo(null);
  };

  useEffect(() => {
    const sendReply = async () => {
      if (sentReply) {
        try {
          await messageReply(sentReply.id, sentReply.reply);
          toast.success("تم ارسال الرد بنجاح");

          setMessages((prev) => prev.filter((msg) => msg._id !== sentReply.id));
        } catch (err) {
          console.error(err);
          toast.error("فشل ارسال الرد");
        }
      }
    };

    sendReply();
  }, [sentReply]);

  const handleMarkAsSeen = async (id) => {
    try {
      await messageAsSeen(id);
      toast.success("تم تعليم الرسالة كمقروءة");
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("فشل تعليم الرسالة كمقروءة");
    }
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
            {loadingMessages ? (
              <>
                <div style={{ marginTop: 100 }}>
                  <Loading />
                </div>
              </>
            ) : (
              <>
                <div className="cards">
                  {messages.map((msg) => (
                    <div className="card" key={msg._id}>
                      <div className="card-num">
                        <span
                          className="number"
                          onClick={() => handleMarkAsSeen(msg._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img src="/delete.png" alt="delete" />
                        </span>
                      </div>

                      <div className="card-info">
                        <div className="main-info">
                          <h3>{msg?.timestamp ? formatDate(msg.timestamp) : "لا يوجد تاريخ"}</h3>
                          <h3>{msg?.name ? msg.name : "لا يوجد اسم"}</h3>
                        </div>

                        <div className="mess">
                          {replyingTo === msg._id ? (
                            <textarea
                              value={replies[msg._id] || ""}
                              onChange={(e) => handleChangeReply(msg._id, e.target.value)}
                              placeholder="اكتب ردك هنا..."
                              className="reply"
                              rows={3}
                            />
                          ) : (
                            <p>{msg?.content ? msg.content : "لا يوجد محتوى"}</p>
                          )}
                        </div>

                        {/* reply/edit actions */}
                        {replyingTo === msg._id ? (
                          <div className="reply-actions">
                            <button onClick={() => handleSendReply(msg._id)}>ارسال</button>
                            <button onClick={() => setReplyingTo(null)}>الغاء</button>
                          </div>
                        ) : (<>
                          {ability.can("edit", "Messages")&&<>
                          <div style={{ width: "100%", direction: "rtl" }}>
                            <button onClick={() => handleReply(msg._id)}>رد</button>
                          </div>
                          </>}
                        </>)}
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <h1 style={{ textAlign: "center", marginTop: "20px", color: "#f6e4c3" }}>
                      لا توجد رسائل
                    </h1>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dmess;
