import "./dsStyle.css";
import riyal from "../../../../public/riyal.png";
import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  getGamesSoldCounts,
  getLastSevenDays,
  getTotalProfit,
  getTotalSoldGames,
} from "../../../api/services/admingService";

// ✅ دالة لحساب ticks بشكل "لطيف"
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

const Dsale = () => {
  const [sold, setSold] = useState(0);
  const [profits, setProfits] = useState(0);
  const [profit, setProfit] = useState({
    oneGame: 0,
    twoGames: 0,
    fiveGames: 0,
    tenGames: 0,
  });

  const dummyData = [
    { day: "S", value: 20 },
    { day: "M", value: 0 },
    { day: "T", value: 30 },
    { day: "W", value: 20 },
    { day: "T", value: 50 },
    { day: "F", value: 30 },
  ];

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(50);
  const [chartData, setChartData] = useState(dummyData);

  const pieData = [
    {
      name: "10 العاب",
      value: profit.tenGames,
      color: "rgba(83, 33, 10, 1)",
      count: 10,
      label: "العاب",
    },
    {
      name: "1 لعبة",
      value: profit.oneGame,
      color: "rgba(207, 138, 65, 1)",
      count: 1,
      label: "لعبة",
    },
    {
      name: "2 لعبتين",
      value: profit.twoGames,
      color: "rgba(244, 190, 50, 1)",
      count: 2,
      label: "لعبتين",
    },
    {
      name: "5 العاب",
      value: profit.fiveGames,
      color: "rgba(180, 0, 0, 1)",
      count: 5,
      label: "العاب",
    },
  ];

  const pieDat = [
    {
      name2: "فيزا و ماستر",
      value2: 60,
      color2: "rgba(83, 33, 10, 1)",
      label2: "فيزا و ماستر",
    },
    {
      name2: "ابل",
      value2: 15,
      color2: "rgba(207, 138, 65, 1)",
      label2: "ابل",
    },
    {
      name2: "مدا",
      value2: 33,
      color2: "rgba(244, 190, 50, 1)",
      label2: "مدا",
    },
    {
      name2: "بابارا",
      value2: 22,
      color2: "rgba(180, 0, 0, 1)",
      label2: "بابارا",
    },
  ];

  // last seven days chart
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
            : dummyData;

        setChartData(finalData);

        // احسب min و max
        const values = finalData.map((d) => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);

        setMinValue(min > 0 ? min - 5 : 0);
        setMaxValue(max + 5);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في جلب بيانات عدد الالعاب");
        setChartData(dummyData);

        const values = dummyData.map((d) => d.value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        setMinValue(min > 0 ? min - 5 : 0);
        setMaxValue(max + 5);
      }
    };
    fetchData();
  }, []);

  // total sold games
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

  // total profit
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

  // games sold counts (pie data)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGamesSoldCounts();
        setProfit(data);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في جلب بيانات الالعاب");
      }
    };
    fetchData();
  }, []);

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="30"
        fontWeight="bold"
        style={{ textShadow: "1px 4px 2px rgba(0,0,0,0.8)" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const StatItem = ({ count, label, color }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "12px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "0",
          backgroundColor: color,
          flexShrink: 0,
          transform: "rotate(45deg)",
          marginLeft: 12,
        }}
      />
      <div
        style={{ display: "flex", alignItems: "center", gap: 13, opacity: 0.6 }}
      >
        {count !== undefined && (
          <span style={{ color: "rgba(249, 231, 197, 1)" }}>{count}</span>
        )}
        <span style={{ color: "rgba(249, 231, 197, 1)" }}>{label}</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="d-sale">
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
            <h1>المبيعات</h1>
            <div className="cont-info">
              <div className="info">
                <h3>عدد</h3>
                <p>{sold}</p>
              </div>
              <div className="info">
                <h3>أرباح</h3>
                <p>
                  {profits} <img src={riyal} alt="riyal" />
                </p>
              </div>
            </div>
          </div>
          <div className="d-sale-cont">
            <div className="sales">
              <div className="sale-cont">
                <div className="chart">
                  <div className="chart-graf">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -35, bottom: 0 }}
                      >
                        <CartesianGrid
                          stroke="#e0e0e0"
                          strokeWidth={1.2}
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 16,
                            fill: "rgba(249, 231, 197, 1)",
                          }}
                        />
                        <YAxis
                          domain={[0, maxValue]}
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 16,
                            fill: "rgba(249, 231, 197, 1)",
                          }}
                          ticks={getNiceTicks(minValue, maxValue)}
                        />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="rgba(249, 231, 197, 1)"
                          strokeWidth={2}
                          dot={{
                            fill: "rgba(249, 231, 197, 1)",
                            strokeWidth: 2,
                            r: 4,
                          }}
                          activeDot={{
                            r: 6,
                            fill: "rgba(249, 231, 197, 1)",
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-games">
              <div className="m-games-cont">
                <h1 className="h1-games">أكثر الألعاب مبيعا</h1>
                <div className="pie-chart">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="pie-info">
                      <div
                        style={{
                          width: "400px",
                          height: "400px",
                          flexShrink: 0,
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={200}
                              fill="#8884d8"
                              dataKey="value"
                              stroke="#fff"
                              strokeWidth={0}
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                  style={{ cursor: "pointer" }}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="item">
                        {pieData.map((item, index) => (
                          <StatItem
                            key={index}
                            count={item.count}
                            label={item.label}
                            color={item.color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-games">
              <div className="m-games-cont">
                <h1 className="h1-games">أكثر طرق الدفع استخداما</h1>
                <div className="pie-chart">
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="pie-info">
                      <div
                        style={{
                          width: "400px",
                          height: "400px",
                          flexShrink: 0,
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieDat}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={200}
                              fill="#8884d8"
                              dataKey="value2"
                              stroke="#fff"
                              strokeWidth={0}
                            >
                              {pieDat.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color2}
                                  style={{ cursor: "pointer" }}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="item">
                        {pieDat.map((item, index) => (
                          <StatItem
                            key={index}
                            label={item.label2}
                            color={item.color2}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dsale;