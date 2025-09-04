import "./drStyle.css";
import { useCallback, useEffect, useState } from "react";
import ReportForm from "./ReportForm";
import { getAllReports, reportReply, reportAsSeen } from "../../../api/services/admingService";
import { toast } from "react-toastify";
import { Loading } from "../dmain/dmain";

import { useContext } from "react";
import { AbilityContext } from "../../../context/abilityContext";


const Dreport = () => {
  const ability = useContext(AbilityContext);

  const [reports, setReports] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replies, setReplies] = useState({});
  const [sentReply, setSentReply] = useState(null);
  const [question, setQuestion] = useState(null);
  const [openReportForm, setOpenReportForm] = useState(false);
  const [loadingReports , setLoadingReports] = useState(true)
  
  const [reFetch, setRefetch] = useState(false);
      const handleRefresh = useCallback(() => {
        setRefetch(prev => !prev);
      }, []);

  const difficultyLevels = { easy: "سهل", medium: "متوسط", hard: "صعب" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في سحب البيانات");
      }
      finally{
        setLoadingReports(false)
      }
    };
    
    fetchData();
  }, [reFetch]);
  
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

  const handleReply = (repId) => {
    setReplyingTo(repId);
  };

  const handleChangeReply = (repId, text) => {
    setReplies((prev) => ({
      ...prev,
      [repId]: text,
    }));
  };

  const handleSendReply = (repId) => {
    const replyText = replies[repId] || "";
    setSentReply({ id: repId, reply: replyText });
    setReplyingTo(null);
  };

  useEffect(() => {
    const sendReply = async () => {
      if (sentReply) {
        try {
          await reportReply(sentReply.id, sentReply.reply);
          toast.success("تم ارسال الرد على البلاغ بنجاح");

          setReports((prev) => prev.filter((rep) => rep._id !== sentReply.id));
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
      await reportAsSeen(id);
      toast.success("تم تعليم البلاغ كمقروء");
      setReports((prev) => prev.filter((rep) => rep._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("فشل تعليم البلاغ كمقروء");
    }
  };

  return (
    <>
      <div className="d-report">
        <div className="container">
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
            <h1>البلاغات</h1>
            <div className="cont-info">
              <div className="info">
                <h3>كلى</h3>
                <p>{reports.length}</p>
              </div>
            </div>
            <button
            onClick={handleRefresh}
            style={{
              position: "absolute",
              top: "50px",
              right: "20px",
              zIndex: 3,
            }}
            title="تحديث الصفحة (Ctrl+R)"
          >
            اعاده تحميل
          </button>
          </div>
          {loadingReports?(<>
             <Loading /> 
          </>):(<>
            <div className="cards">
            {reports.map((report) => (
              <div className="card" key={report._id}>
                {ability.can("edit","Reports") && <>
                              <div className="card-num">
                <span
                  className="number"
                  onClick={() => handleMarkAsSeen(report._id)}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/delete.png" alt="delete" />
                </span>
              </div>
                  
                </>}
              <div className="card-info">
                {/* main info */}
                <div className="main-info">
                  <h3>{report?.createdAt ? formatDate(report.createdAt) : "لا يوجد تاريخ"}</h3>
                  <h3>{report?.userId?.name ? report.userId.name : "لا يوجد اسم مستخدم"}</h3>
                </div>

                {/* report info */}
                <div className="report-info">
                  <h4>أيقونة: لا</h4>
                  <h4>
                    {report?.questionId?.difficulty !== undefined
                      ? difficultyLevels[report.questionId.difficulty]
                      : "لا يوجد مستوى"}
                  </h4>
                  <h4>
                    {report?.questionId?.category?.name
                      ? report.questionId.category.name
                      : "لا يوجد اسم"}
                  </h4>
                </div>
                    
                {/* contact info */}
                <div className="contact-info">
                  <p>{report?.userId?.email ? report.userId.email : "لا يوجد ايميل"}</p>
                  <p>
                    {report?.userId?.countryCode && report?.userId?.phone
                      ? `${report.userId.countryCode} ${report.userId.phone}`
                      : "لا يوجد رقم"}
                  </p>
                </div>
                    
                {/* message section */}
                <div className="mess">
                  {replyingTo === report._id ? (
                    <textarea
                      value={replies[report._id] || ""}
                      onChange={(e) => handleChangeReply(report._id, e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      className="reply"
                      rows={3}
                    />
                  ) : (
                    <p>{report?.description ? report.description : "لا يوجد وصف"}</p>
                  )}
                </div>
                
                {ability.can("edit","Reports") && <>
                  {replyingTo === report._id ? (
                  <div className="reply-actions">
                    <button onClick={() => handleSendReply(report._id)}>ارسال</button>
                    <button onClick={() => setReplyingTo(null)}>الغاء</button>
                  </div>
                ) : (
                  <div className="edit-btn">
                    <button
                      className="r-edit"
                      onClick={() => {
                        setOpenReportForm(true);
                        setQuestion(report?.questionId || null);
                      }}
                    >
                      تعديل
                    </button>
                    <button onClick={() => handleReply(report._id)}>رد</button>
                  </div>
                )}
                </>}
              </div>
            </div>
            ))}
            {reports.length === 0 && (
              <h1 style={{ textAlign: "center", marginTop: "20px" , color:'#f6e4c3'}}>
                لا توجد بلاغات
              </h1>
            )}
          </div>
          </>)}
        </div>
        <ReportForm
          question={question}
          open={openReportForm}
          setOpen={setOpenReportForm}
        />
      </div>
    </>
  );
};

export default Dreport;
