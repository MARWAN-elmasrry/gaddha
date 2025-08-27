import "./drStyle.css";
import { useEffect, useState } from "react";
import ReportForm from "./ReportForm";
import { getAllReports } from "../../../api/services/admingService";
const Dreport = () => {
  const [reports, setReports] = useState([]);
  const [question, setQuestion] = useState(null);
  const [openReportForm, setOpenReportForm] = useState(false);
  const difficultyLevels = { easy: "سهل", medium: "متوسط", hard: "صعب" };
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
                    <h3>{report.userId.name}</h3>
                  </div>
                  <div className="report-info">
                    <h4> أيقونة: لا</h4>
                    <h4>{difficultyLevels[report.questionId.difficulty]}</h4>
                    <h4>{report.questionId.category.name}</h4>
                  </div>
                  <div className="contact-info">
                    <p>{report.userId.email}</p>
                    <p>
                      {report.userId.countryCode} {report.userId.phone}
                    </p>
                    <p>333-222-245</p>
                  </div>
                  <div className="mess">
                    <p>{report.description}</p>
                  </div>
                  <div className="edit-btn">
                    <button
                      className="r-edit"
                      onClick={() => {
                        setOpenReportForm(true);
                        setQuestion(report.questionId);
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
        <ReportForm question={question} open={openReportForm} setOpen={setOpenReportForm} />
      </div>
    </>
  );
};

export default Dreport;
