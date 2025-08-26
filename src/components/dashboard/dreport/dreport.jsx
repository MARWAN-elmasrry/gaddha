import "./drStyle.css";
import { useEffect, useState } from "react";
import ReportForm from "./ReportForm";
import { getAllReports } from "../../../api/services/admingService";
const Dreport = () => {
  const [reports, setReports] = useState([]);
  const [questionId, setQuestionId] = useState(null);
  const [openReportForm, setOpenReportForm] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReports();
        setReports(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="d-report">
        <div className="container">
          <div className="h-cont">
            <div className="back-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/dash";
                }}
              >
                <img src="/back.png" alt="" />
              </button>
            </div>
            <h1>البلاغات</h1>
            <div className="cont-info">
              {/* <div className="info">
                <h3>جديد</h3>
                <p>0</p>
              </div> */}
              <div className="info">
                <h3>كلى</h3>
                <p>{reports.length}</p>
              </div>
            </div>
          </div>
          <div className="cards">
            {reports.map((report, idx) => (
              <div className="card" key={idx}>
                <div className="card-num">
                  <span className="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <div className="main-info">
                    <h3>11:20</h3>
                    <h3>صالح عبد الرحمن</h3>
                  </div>
                  <div className="report-info">
                    <h4> أيقونة: لا</h4>
                    <h4>سهل</h4>
                    <h4>أنمي</h4>
                  </div>
                  <div className="contact-info">
                    <p>{report.userId.email}</p>
                    <p>+90 552-593-90-69</p>
                    <p>333-222-245</p>
                  </div>
                  <div className="mess">
                    <p>نعمل شراكة شرايكم</p>
                  </div>
                  <div className="edit-btn">
                    <button
                      className="r-edit"
                      onClick={() => {
                        setOpenReportForm(true);
                        setQuestionId(report.questionId._id);
                      }}
                    >
                      تعديل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ReportForm questionId={questionId} open={openReportForm} setOpen={setOpenReportForm} />
      </div>
    </>
  );
};

export default Dreport;
