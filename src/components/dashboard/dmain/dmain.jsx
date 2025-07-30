import './dmStyle.css';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "S", value: 20 },
  { day: "M", value: 0 },
  { day: "T", value: 30 },
  { day: "W", value: 20 },
  { day: "T", value: 50 },
  { day: "F", value: 30 }
];

const Dmain = () => {
  return (
    <div className="d-main">
        <div className="back-tress">
            <div className="tress">
                <img className='left' src="./dashtree.png" alt="" />
                <img className='right' src="./dashtree.png" alt="" />
            </div>
        </div>
      <div className="container">
        <div className="d-main-cont">
          <h1>لوحة الإحصا</h1>
          <div className="cards">
            <div className="f-card">
              <h3 className="card-title"><img src="./dashr.png" alt="" /> الملفات <img src="./dashr.png" alt="" /></h3>
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
                    <div className="used" style={{ width: '67%' }}></div>
                    <div className="indicator left"><img src="./persw.png" alt="" />67%</div>
                    <div className="indicator right">33%<img src="./persw.png" alt="" /></div>
                </div>
                <span className="max-space">50 GB</span>
              </div>
            </div>
            <div className="s-card">
                <div className="sales">
                    <div className="sale-cont">
                                <div className="info">
                                    <h3 className="card-title"><img src="./dashr.png" alt="" />  الملفات <img src="./dashr.png" alt="" /></h3>
                                </div>
                                <div className="chart">
                                    <div className="chart-graf">
                                        <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={data} margin={{ top: 10, right: 60 , left: -35, bottom: 0 }}>
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
                                                tick={{ fontSize: 12, fill: '#666' }}
                                            />
                                            <YAxis 
                                                domain={[0, 50]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 12, fill: '#666' }}
                                                ticks={[0, 10, 20, 30, 40, 50]}
                                            />
                                            <Tooltip />
                                            <Line 
                                                type="monotone" 
                                                dataKey="value" 
                                                stroke="rgba(249, 231, 197, 1)" 
                                                strokeWidth={2}
                                                dot={{ fill: 'rgba(249, 231, 197, 1)', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, fill: 'rgba(249, 231, 197, 1)' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    </div>
                                    <div className="chart-info">
                                        <h6>العدد</h6>
                                        <p>189</p>
                                        <h6>القيمة</h6>
                                        <p>1,300</p>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="r-card">
              <h3 className="card-title"><img src="./dashr.png" alt="" /> البلاغات <img src="./dashr.png" alt="" /></h3>
              <div className="card-info">
                <div className="info">
                  <h3>جديد</h3>
                  <p>0</p>
                </div>
                <div className="info">
                  <h3>كلى</h3>
                  <p>15</p>
                </div>
              </div>
              <div className="r-cards">
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
              </div>
          </div>
          <div className="r-card">
              <h3 className="card-title"><img src="./dashrm.png" alt="" /> الرسائل  <img src="./dashrm.png" alt="" /></h3>
              <div className="card-info">
                <div className="info">
                  <h3>جديد</h3>
                  <p>0</p>
                </div>
                <div className="info">
                  <h3>كلى</h3>
                  <p>15</p>
                </div>
              </div>
              <div className="r-cards">
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
                <div className="rcard">
                  <div className="info">
                      <p>jj345@gmail.com</p>
                      <p>أنمي</p>
                      <p>11:20</p>
                  </div>
                  <div className="mess">
                    <p>الصوره غير صحيحه</p>
                  </div>
                </div>
              </div>
          </div>
          <div className="r-card">
              <h3 className="card-title"><img src="./dashr.png" alt="" /> معلومات <img src="./dashr.png" alt="" /></h3>
              <div className="r-cards">
                <div className="rcard r-info">
                  <div className="info">
                      <p>المستخدمين</p>
                  </div>
                  <div className="mess">
                    <h4 classname='r-h'>55,567</h4>
                  </div>
                </div>
                <div className="rcard r-info">
                  <div className="info">
                      <p>الفئات</p>
                  </div>
                  <div className="mess">
                    <h4 classname='r-h'>22,666</h4>
                  </div>
                </div>
                <div className="rcard r-info">
                  <div className="info">
                      <p>الكوبونات</p>
                  </div>
                  <div className="mess">
                    <h4 classname='r-h'>10</h4>
                  </div>
                </div>
                <div className="rcard r-info">
                  <div className="info">
                      <p>الأللعاب</p>
                  </div>
                  <div className="mess">
                    <h4 classname='r-h'>33,555</h4>
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
