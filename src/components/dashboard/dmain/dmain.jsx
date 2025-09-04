import "./dmStyle.css";
import { useEffect, useState, useCallback, useMemo } from "react";
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

  // Combined loading state
  const [loading, setLoading] = useState({
    reports: true,
    messages: true,
    userCount: true,
    categories: true,
    vouchers: true,
    chartData: true,
    sales: true,
    profits: true,
  });

  // Data states
  const [data, setData] = useState({
    reports: [],
    messages: [],
    userCount: 0,
    categories: [],
    vouchers: [],
    sold: 0,
    profits: 0,
    chartData: [],
    minValue: 0,
    maxValue: 50,
  });

  const firstThreeReports = useMemo(() => data.reports.slice(0, 3), [data.reports]);
  const firstThreeMessages = useMemo(() => data.messages.slice(0, 3), [data.messages]);

  const [reFetch, setRefetch] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefetch(prev => !prev);
  }, []);

  const getImageSrc = useCallback((cardType) => {
    return hoveredCard === cardType ? "./dashrm.png" : "/dashr.png";
  }, [hoveredCard]);

  useEffect(() => {
    let isMounted = true;
    let timeoutIds = [];

    const createTimeout = (message, delay = 8000) => {
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          toast.error(message);
        }
      }, delay);
      timeoutIds.push(timeoutId);
      return timeoutId;
    };

    const updateLoading = (key, value) => {
      if (isMounted) {
        setLoading(prev => ({ ...prev, [key]: value }));
      }
    };

    const updateData = (updates) => {
      if (isMounted) {
        setData(prev => ({ ...prev, ...updates }));
      }
    };

    const fetchAllData = async () => {
      const fetchPromises = [];

      // Reports
      if (ability.can("view", "Reports")) {
        const reportsPromise = getAllReports()
          .then(result => {
            updateData({ reports: result });
            updateLoading('reports', false);
          })
          .catch(err => {
            console.error("Reports error:", err);
            updateLoading('reports', false);
            if (isMounted) {
              toast.error("خطأ في سحب البلاغات");
            }
          });
        fetchPromises.push(reportsPromise);
      }

      // Messages
      if (ability.can("view", "Messages")) {
        const messagesPromise = getAllMessages()
          .then(result => {
            updateData({ messages: result });
            updateLoading('messages', false);
          })
          .catch(err => {
            console.error("Messages error:", err);
            updateLoading('messages', false);
            if (isMounted) {
              toast.error("خطأ في سحب الرسائل");
            }
          });
        fetchPromises.push(messagesPromise);
      }

      // User Count
      if (ability.can("view", "all")) {
        const userCountPromise = getUserCount()
          .then(result => {
            updateData({ userCount: result });
            updateLoading('userCount', false);
          })
          .catch(err => {
            console.error("User count error:", err);
            updateLoading('userCount', false);
            if (isMounted) {
              toast.error("خطأ في سحب عدد المستخدمين");
            }
          });
        fetchPromises.push(userCountPromise);

        // Vouchers
        const vouchersPromise = getVouchers()
          .then(result => {
            updateData({ vouchers: result });
            updateLoading('vouchers', false);
          })
          .catch(err => {
            console.error("Vouchers error:", err);
            updateLoading('vouchers', false);
            if (isMounted) {
              toast.error("خطأ في سحب أكواد الخصم");
            }
          });
        fetchPromises.push(vouchersPromise);

        // Chart Data
        const chartDataPromise = getLastSevenDays()
          .then(apiData => {
            const finalData =
              apiData && apiData.length > 0
                ? apiData.map(item => ({
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

            const values = finalData.map(d => d.value);
            const min = Math.min(...values);
            const max = Math.max(...values);

            updateData({
              chartData: finalData,
              minValue: min > 0 ? min - 5 : 0,
              maxValue: max + 5,
            });
            updateLoading('chartData', false);
          })
          .catch(err => {
            console.error("Chart data error:", err);
            updateLoading('chartData', false);
            if (isMounted) {
              toast.error("خطأ في سحب بيانات الرسم البياني");
            }
          });
        fetchPromises.push(chartDataPromise);
      }

      // Categories
      if (ability.can("view", "Categories") || ability.can("manage", "Categories")) {
        const categoriesPromise = getAllCategories()
          .then(result => {
            updateData({ categories: result });
            updateLoading('categories', false);
          })
          .catch(err => {
            console.error("Categories error:", err);
            updateLoading('categories', false);
            if (isMounted) {
              toast.error("خطأ في سحب الفئات");
            }
          });
        fetchPromises.push(categoriesPromise);
      }

      // Sales Data
      if (ability.can("view", "Sales")) {
        const soldPromise = getTotalSoldGames()
          .then(result => {
            updateData({ sold: result });
            updateLoading('sales', false);
          })
          .catch(err => {
            console.error("Sold games error:", err);
            updateLoading('sales', false);
            if (isMounted) {
              toast.error("خطأ في جلب بيانات عدد الألعاب");
            }
          });
        fetchPromises.push(soldPromise);

        const profitsPromise = getTotalProfit()
          .then(result => {
            updateData({ profits: result });
            updateLoading('profits', false);
          })
          .catch(err => {
            console.error("Profits error:", err);
            updateLoading('profits', false);
            if (isMounted) {
              toast.error("خطأ في جلب بيانات الأرباح");
            }
          });
        fetchPromises.push(profitsPromise);
      }

      try {
        await Promise.allSettled(fetchPromises);
      } catch (error) {
        console.error("Error in fetchAllData:", error);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [ability, reFetch]);

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
                            data={data.chartData}
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
                              domain={[0, data.maxValue]}
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 12, fill: "rgba(249, 231, 197, 1)" }}
                              ticks={getNiceTicks(data.minValue, data.maxValue)}
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
                        <p>{data.sold}</p>
                        <h6>أرباح</h6>
                        <p>{data.profits}</p>
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
              {loading.reports ? (
                <Loading />
              ) : (
                <>
                  <div className="card-info">
                    <div className="info">
                      <h3>كلى</h3>
                      <p>{data.reports.length}</p>
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
              {loading.messages ? (
                <Loading />
              ) : (
                <>
                  <div className="card-info">
                    <div className="info">
                      <h3>كلى</h3>
                      <p>{data.messages.length}</p>
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
                  (loading.userCount ? (
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
                        <h4 className="r-h">{data.userCount}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("manage", "Categories") &&
                  (loading.categories ? (
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
                        <h4 className="r-h">{data.categories.length}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("view", "all") &&
                  (loading.vouchers ? (
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
                        <h4 className="r-h">{data.vouchers.length}</h4>
                      </div>
                    </div>
                  ))}

                {ability.can("manage", "Categories") &&
                  (loading.categories ? (
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
                        <h4 className="r-h">{data.categories.length}</h4>
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