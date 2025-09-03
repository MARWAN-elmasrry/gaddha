import "./dmStyle.css";
import { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllMessages,
  getAllReports,
  getTotalProfit,
  getTotalSoldGames,
  getUserCount,
  getVouchers,
  getLastSevenDays,
} from "../../../api/services/admingService";
import { toast } from "react-toastify";
import { FourSquare } from "react-loading-indicators";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { AbilityContext } from "../../../context/abilityContext";
export const Loading = () => {
  return (
    <div className="loading">
      <FourSquare color={["#f4be32", "#e0e0e0"]} size="large" text="انت قدها" />
    </div>
  );
};

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
  const ability = useContext(AbilityContext);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [maxRetries] = useState(3);

  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const [userCount, setUserCount] = useState(0);
  const [loadingUserCount, setLoadingUserCount] = useState(true);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [vouchers, setVouchers] = useState([]);
  const [loadingVouchers, setLoadingVouchers] = useState(true);

  const [sold, setSold] = useState(0);
  const [profits, setProfits] = useState(0);

  // Chart states
  const [chartData, setChartData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);

  // Calculate derived values
  const firstThreeReports = reports.slice(0, 3);
  const firstThreeMessages = messages.slice(0, 3);

  // Function to refresh the page like Ctrl+R
  const handleRefresh = () => {
    window.location.reload();
  };

  // Auto-refresh on errors
  useEffect(() => {
    if (errorCount >= maxRetries) {
      toast.error("فشل تحميل البيانات بعد عدة محاولات.. تحديث الصفحة تلقائياً");
      const timer = setTimeout(() => {
        handleRefresh();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorCount, maxRetries]);

  // Fetch vouchers
  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getVouchers();
        setVouchers(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في سحب عدد القسائم .. إعادة المحاولة بعد ثانيتين");
      } finally {
        clearTimeout(timeoutId);
        setLoadingVouchers(false);
      }
    };
    if (ability.can("view", "all")) fetchData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch last seven days data
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
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في جلب بيانات المبيعات .. إعادة المحاولة بعد ثانيتين");
      }
    };

    if (ability.can("view", "all")) fetchData();
  }, []);

  // Fetch reports
  useEffect(() => {
    let timeoutId;

    const fetchReports = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getAllReports();
        setReports(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في سحب بيانات البلاغات .. إعادة المحاولة بعد ثانيتين");
      } finally {
        clearTimeout(timeoutId);
        setLoadingReports(false);
      }
    };

    if (ability.can("view", "Reports")) fetchReports();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch messages
  useEffect(() => {
    let timeoutId;

    const fetchMessages = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getAllMessages();
        setMessages(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في سحب بيانات الرسائل .. إعادة المحاولة بعد ثانيتين");
      } finally {
        clearTimeout(timeoutId);
        setLoadingMessages(false);
      }
    };

    if (ability.can("view", "Messages")) fetchMessages();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch user count
  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getUserCount();
        setUserCount(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في سحب عدد المستخدمين .. إعادة المحاولة بعد ثانيتين");
      } finally {
        clearTimeout(timeoutId);
        setLoadingUserCount(false);
      }
    };

    if (ability.can("view", "all")) fetchData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch categories
  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.error("التحميل تأخر.. ممكن يكون فيه مشكلة في النت 🚨");
        }, 5000);
        const data = await getAllCategories();
        setCategories(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في سحب الفئات .. إعادة المحاولة بعد ثانيتين");
      } finally {
        clearTimeout(timeoutId);
        setLoadingCategories(false);
      }
    };

    if (ability.can("view", "Categories")) fetchData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // Fetch total sold games
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalSoldGames();
        setSold(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في جلب بيانات عدد الألعاب .. إعادة المحاولة بعد ثانيتين");
      }
    };

    if (ability.can("view", "Sales")) fetchData();
  }, []);

  // Fetch total profit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalProfit();
        setProfits(data);
        setErrorCount(0); // Reset error count on success
      } catch (err) {
        console.error(err);
        setErrorCount((prev) => prev + 1);
        toast.error("خطأ في جلب بيانات الأرباح .. إعادة المحاولة بعد ثانيتين");
      }
    };

    if (ability.can("view", "Sales")) fetchData();
  }, []);

  const getImageSrc = (cardType) => {
    if (hoveredCard === cardType) {
      return "./dashrm.png";
    }
    return "/dashr.png";
  };

  return (
    <div className="d-main">
      {/* Refresh Button */}
      <div className="back-tress">
        <div className="tress">
          <img className="left" src="./dashtree.png" alt="" />
          <img className="right" src="./dashtree.png" alt="" />
        </div>
      </div>
      <div className="container">
        <div className="d-main-cont">
          <button
            onClick={handleRefresh}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 3,
            }}
            title="تحديث الصفحة (Ctrl+R)"
          >
            اعاده تحميل
          </button>
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
            {ability.can("view", "Sales") && (
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
            )}
          </div>
          {ability.can("view", "Reports") && (
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
          )}

          {ability.can("view", "Messages") && (
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
              {loadingMessages ? (
                <Loading />
              ) : (
                <>
                  <div className="card-info">
                    <div className="info">
                      <h3>كلى</h3>
                      <p>{messages.length}</p>
                    </div>
                  </div>
                  <div className="r-cards">
                    {firstThreeMessages.map((msg) => (
                      <div className="rcard" key={msg._id}>
                        <div className="info">
                          <p>{msg.email}</p>
                          <p>
                            {new Date(msg.updatedAt).toLocaleTimeString([], {
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
                </>
              )}
            </div>
          )}

          {(ability.can("view", "all") || ability.can("manage", "Categories")) && (
            <div
              className="r-card"
              onMouseEnter={() => setHoveredCard("info")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 className="card-title">
                <img src={getImageSrc("info")} alt="hover" /> معلومات
                <img src={getImageSrc("info")} alt="hover" />
              </h3>
              <div className="r-cards">
                {ability.can("view", "all") &&
                  (loadingUserCount ? (
                    <Loading />
                  ) : (
                    <div
                      className="rcard r-info"
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
                        <h4 className="r-h">{userCount}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("manage", "Categories") &&
                  (loadingCategories ? (
                    <Loading />
                  ) : (
                    <div
                      className="rcard r-info"
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
                        <h4 className="r-h">{categories.length}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("view", "all") &&
                  (loadingVouchers ? (
                    <Loading />
                  ) : (
                    <div
                      className="rcard r-info"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/admin/discount";
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="info">
                        <p>أكواد الخصم</p>
                      </div>
                      <div className="mess">
                        <h4 className="r-h">{vouchers.length}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("manage", "Categories") &&
                  (loadingCategories ? (
                    <Loading />
                  ) : (
                    <div
                      className="rcard r-info"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/admin/categories";
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="info">
                        <p>الألعاب</p>
                      </div>
                      <div className="mess">
                        <h4 className="r-h">{categories.length}</h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dmain;
