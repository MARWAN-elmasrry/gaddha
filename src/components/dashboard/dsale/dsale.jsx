import React from "react";
import "./dsStyle.css";

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

const data = [
  { day: "S", value: 20 },
  { day: "M", value: 0 },
  { day: "T", value: 30 },
  { day: "W", value: 20 },
  { day: "T", value: 50 },
  { day: "F", value: 30 },
];

const pieData = [
  { name: "10 العاب", value: 60, color: "rgba(83, 33, 10, 1)", count: 10, label: "العاب" },
  { name: "1 لعبة", value: 15, color: "rgba(207, 138, 65, 1)", count: 1, label: "لعبة" },
  { name: "2 لعبتين", value: 33, color: "rgba(244, 190, 50, 1)", count: 2, label: "لعبتين" },
  { name: "5 العاب", value: 22, color: "rgba(180, 0, 0, 1)", count: 5, label: "العاب" },
];

const pieDat = [
  { name2: "فيزا و ماستر", value2: 60, color2: "rgba(83, 33, 10, 1)", label2: "فيزا و ماستر" },
  { name2: "ابل", value2: 15, color2: "rgba(207, 138, 65, 1)", label2: "ابل" },
  { name2: "مدا", value2: 33, color2: "rgba(244, 190, 50, 1)", label2: "مدا" },
  { name2: "بابارا", value2: 22, color2: "rgba(180, 0, 0, 1)", label2: "بابارا" },
];

const Dsale = () => {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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
      <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: 0.6 }}>
        <span style={{ color: "rgba(249, 231, 197, 1)" }}>{count}</span>
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
                  window.location.href = "/dash";
                }}
              >
                <img src="/back.png" alt="" />
              </button>
            </div>
            <h1>المبيعات</h1>
            <div className="cont-info">
              <div className="info">
                <h3>قيمة</h3>
                <p>333,444</p>
              </div>
              <div className="info">
                <h3>عدد</h3>
                <p>22,55</p>
              </div>
              <div className="info">
                <h3>أرباح</h3>
                <p>233,445$</p>
              </div>
            </div>
          </div>
          <div className="d-sale-cont">
            <div className="sales">
              <div className="sale-cont">
                <div className="chart">
                  <div className="chart-graf">
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={data} margin={{ top: 10, right: 10, left: -35, bottom: 0 }}>
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
                          tick={{ fontSize: 16, fill: "rgba(249, 231, 197, 1)" }}
                        />
                        <YAxis
                          domain={[0, 50]}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 16, fill: "rgba(249, 231, 197, 1)" }}
                          ticks={[0, 10, 20, 30, 40, 50]}
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
                      <div style={{ width: "400px", height: "400px", flexShrink: 0 }}>
                        {/* <div style={{ width: '400px', height: '400px', flexShrink: 0 }}>  and this also too  */}

                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={renderCustomizedLabel}
                              outerRadius={200}
                              //  outerRadius={200}  can i make this reponcive to the widht of the screen
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
                      <div style={{ width: "400px", height: "400px", flexShrink: 0 }}>
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
                          <StatItem key={index} label={item.label2} color={item.color2} />
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
