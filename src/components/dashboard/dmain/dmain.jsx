import "./dmStyle.css";
import { useEffect, useState } from "react";
import { getAllCategories, getAllMessages, getAllReports, getTotalProfit, getTotalSoldGames, getUserCount } from "../../../api/services/admingService";
import { toast } from "react-toastify";
import {FourSquare} from 'react-loading-indicators';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "S", value: 20 },
  { day: "M", value: 0 },
  { day: "T", value: 30 },
  { day: "W", value: 20 },
  { day: "T", value: 50 },
  { day: "F", value: 30 },
];

export const Loading = () =>{
  return(<>
      <div className="loading">
        <FourSquare color={[ "#f4be32" , "#e0e0e0"]} size="large" text="انت قدها" />
      </div>
  </>)
}

import { getLastSevenDays } from "../../../api/services/admingService";

const getNiceTicks = (min, max, count = 6) => {
  const range = max - min;
  if (range <= 0) return [0, max || 1];

  const rawStep = range / (count - 1);
  const pow10 = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const niceStep = Math.ceil(rawStep / pow10) * pow10;
  const niceMax = Math.ceil(max / niceStep) * niceStep;

  const ticks = [];
  for (let i = 0; i <= niceMax; i += niceStep) {
    ticks.push(i);
  }

  return ticks;
};


const Dmain = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const [reports , setReports] = useState([]);
  const [loadingReports, setloadingReports] = useState(true)

  const [messages, setMessages] = useState([]);
  const [loadingMessages , setloadingMessages] = useState(true)

  const [userCount , setUserCount] = useState([]);
  const [loadingUserCount , setLoadingUserCount] = useState(true)

  const [categories, setCategories] = useState([]);
  const [loadingCategories,setLoadingCategories]= useState(true)

  const [sold , setSold] = useState([]);
  const [profits , setProfits] = useState([]);

  let firstThreeReports = []
  let firstThreeMessages = []
  firstThreeReports = reports.slice(0, 3);
  firstThreeMessages = messages.slice(0, 3);

// chart states
  const [chartData, setChartData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);

  // fetch last seven days
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getLastSevenDays();
        const finalData =
          apiData && apiData.length > 0
            ? apiData.map((item) => ({
                day: item.day,
                value: item.value,
              }))
            : [
                { day: "S", value: 20 },
                { day: "M", value: 0 },
                { day: "T", value: 30 },
                { day: "W", value: 20 },
                { day: "T", value: 50 },
                { day: "F", value: 30 },
              ];

        setChartData(finalData);

        const values = finalData.map((d) => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);

        setMinValue(min > 0 ? min - 5 : 0);
        setMaxValue(max + 5);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في جلب بيانات المبيعات");
      }
    };
    fetchData();
  }, []);

// getAllReports
useEffect(() => {
  let timeoutId;

  const fetchReports = async () => {
    try {
      timeoutId = setTimeout(() => {
        toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
      }, 5000);
      const data = await getAllReports();
      setReports(data);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في سحب بيانات البلاغات");
    } finally {
      clearTimeout(timeoutId);
      setloadingReports(false);
    }
  };
  fetchReports();
  return () => clearTimeout(timeoutId);
}, []);

// getAllMessages
useEffect(() => {
  let timeoutId;

  const fetchMessages = async () => {
    try {
      timeoutId = setTimeout(() => {
        toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
      }, 5000);
      const data2 = await getAllMessages();
      setMessages(data2);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في سحب بيانات الرسائل");
    }
    finally {
      clearTimeout(timeoutId);
      setloadingMessages(false);
    }
  };
  fetchMessages();
  return () => clearTimeout(timeoutId);
}, []);

// getUserCount
useEffect(() => {
    let timeoutId;

  const fetchData = async () => {
    try {
      timeoutId = setTimeout(() => {
        toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
      }, 5000);
      const data = await getUserCount();
      setUserCount(data);
    } catch (err) {
      console.error(err);
      toast.error("خطا غى سحب البيانات العدد من المستخدمين")
    }
    finally {
      clearTimeout(timeoutId);
      setLoadingUserCount(false);
    }
  };
  fetchData();
    return () => clearTimeout(timeoutId);
}, []);

// getAllCategories
useEffect(() => {    
  let timeoutId;

  const fetchData = async () => {
    try {
      timeoutId = setTimeout(() => {
        toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
      }, 5000);
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("خطا غى سحب البيانات");
    }
    finally {
      clearTimeout(timeoutId);
      setLoadingCategories(false);
    }
  };

  fetchData();
    return () => clearTimeout(timeoutId);
}, []);

// getTotalSoldGames
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getTotalSoldGames();
      setSold(data);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في جلب بيانات عدد الالعاب");
    }
  };
  fetchData();
}, []);

// getTotalProfit
useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getTotalProfit();
      setProfits(data);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في جلب بيانات الارباح");
    }
  };
  fetchData();
}, []);


  const getImageSrc = (cardType, position) => {
    if (hoveredCard === cardType) {
      return "./dashrm.png";
    }
    return "/dashr.png";
  };
  return (
    <div className="d-main">
      <div className="back-tress">
        <div className="tress">
          <img className="left" src="./dashtree.png" alt="" />
          <img className="right" src="./dashtree.png" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="d-main-cont">
          <h1>لوحة الإحصائيات</h1>
          <div className="cards">
            <div
              className="f-card"
              onMouseEnter={() => setHoveredCard("file")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 className="card-title">
                <img src={getImageSrc("file")} alt="" /> الملفات{" "}
                <img src={getImageSrc("file")} alt="" />
              </h3>
              <div className="storage-info">
                <div className="info">
                  <span className="label">المساحة</span>
                  <span className="value">30GB</span>
                </div>
                <div className="info">
                  <span className="label">مستخدم</span>
                  <span className="value">15.7GB</span>
                </div>
                <div className="info">
                  <span className="label">متاح</span>
                  <span className="value">14.3GB</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="bar">
                  <div className="used" style={{ width: "67%" }}></div>
                  <div className="indicator left">
                    <img src="./persw.png" alt="" />
                    67%
                  </div>
                  <div className="indicator right">
                    33%
                    <img src="./persw.png" alt="" />
                  </div>
                </div>
                <span className="max-space">50 GB</span>
              </div>
            </div>
            <div
              className="s-card"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin/dsale";
              }}
              style={{ cursor: "pointer" }}
            >
              <div
                className="sales"
                onMouseEnter={() => setHoveredCard("sale")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="sale-cont" style={{ zIndex: 3 }}>
                  <div className="info">
                    <h3 className="card-title">
                      <img src={getImageSrc("sale")} alt="hover" /> المبيعات{" "}
                      <img src={getImageSrc("sale")} alt="hover" />
                    </h3>
                  </div>
                  <div className="chart">
                    <div className="chart-graf">
                      <ResponsiveContainer width="100%" height={200}>
                          <LineChart
                            data={chartData}
                            margin={{ top: 10, right: 60, left: -35, bottom: 0 }}
                          >
                            <CartesianGrid
                              stroke="#e0e0e0"
                              strokeWidth={1}
                              horizontal={true}
                              vertical={false}
                            />
                            <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "rgba(249, 231, 197, 1)" }}
                            />
                            <YAxis
                              domain={[0, maxValue]}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "rgba(249, 231, 197, 1)" }}
                              ticks={getNiceTicks(minValue, maxValue)}
                            />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="rgba(249, 231, 197, 1)"
                              strokeWidth={2}
                              dot={{ fill: "rgba(249, 231, 197, 1)", strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, fill: "rgba(249, 231, 197, 1)" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="chart-info">
                      <h6>العدد</h6>
                      <p>{sold}</p>
                      <h6>أرباح</h6>
                      <p>{profits}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="r-card"
            onMouseEnter={() => setHoveredCard("report")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin/dreport";
              }}
              style={{ cursor: "pointer" }}
              className="card-title"
            >
              <img src={getImageSrc("report")} alt="" /> البلاغات{" "}
              <img src={getImageSrc("report")} alt="" />
            </h3>
             {loadingReports ? (
              <Loading />
            ) : (
              <>
                <div className="card-info">
                  <div className="info">
                    <h3>كلى</h3>
                    <p>{reports.length}</p>
                  </div>
                </div>
                <div className="r-cards">
                  {firstThreeReports.map((rep) => (
                    <div className="rcard" key={rep._id}>
                      <div className="info">
                        <p>{rep.userId?.email}</p>
                        <p>{rep.questionId?.category?.name}</p>
                      </div>
                      <div className="mess">
                        <p>{rep.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div
            className="r-card"
            onMouseEnter={() => setHoveredCard("mess")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin/dmess";
              }}
              style={{ cursor: "pointer" }}
              className="card-title"
            >
              <img src={getImageSrc("mess")} alt="hover" /> الرسائل{" "}
              <img src={getImageSrc("mess")} alt="hover" />
            </h3>
            {loadingMessages ? (<>
                <Loading />
            </>) : (<>
            <div className="card-info">
              <div className="info">
                <h3>كلى</h3>
                <p>{messages.length}</p>
              </div>
            </div>
            <div className="r-cards">
              <div className="r-cards">
                {firstThreeMessages.map((msg) => (
                  <div className="rcard" key={msg._id}>
                    <div className="info">
                      <p>{msg.email}</p>
                      <p>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="mess">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </>)}
          </div>
          <div
            className="r-card"
            onMouseEnter={() => setHoveredCard("info")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="card-title">
              <img src={getImageSrc("info")} alt="hover" /> معلومات{" "}
              <img src={getImageSrc("info")} alt="hover" />
            </h3>
            <div className="r-cards">
              {loadingUserCount?(<>
                 <Loading />
              </>):(<>
                            <div className="rcard r-info" 
                onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin/users";
              }}
              style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <p>المستخدمين</p>
                </div>
                <div className="mess">
                  <h4 classname="r-h">{userCount}</h4>
                </div>
              </div>
              </>)}

              {loadingCategories?(<>
                 <Loading />
              </>):(<>
                <div className="rcard r-info"
                onClick={(e) => {
                e.preventDefault();
                window.location.href = "/admin/categories";
              }}
              style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <p>الفئات</p>
                </div>
                <div className="mess">
                  <h4 classname="r-h">{categories.length}</h4>
                </div>
              </div>
              </>)}

              <div className="rcard r-info">
                <div className="info">
                  <p>الكوبونات</p>
                </div>
                <div className="mess">
                  <h4 classname="r-h">10</h4>
                </div>
              </div>

              <div className="rcard r-info">
                <div className="info">
                  <p>الأللعاب</p>
                </div>
                <div className="mess">
                  <h4 classname="r-h">33,555</h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dmain;
