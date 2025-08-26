import "./cStyle.css";

const Controls = () => {
  return (
    <>
      <div className="control">
        <div className="container">
          <div className="control-cont">
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
              <h1>ادوات التحكم </h1>
              <div className="cont-info"></div>
            </div>
            <div className="cards">
              <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color">حفظ</button>
                    <button className="no-color">تحديث</button>
                  </div>
                  <h2>التحكم في الألعاب المتبقية</h2>
                </div>
                <div className="inputs">
                  <input type="text" placeholder=" ID إيميل رقم الهاتف أو" />
                  <input type="text" placeholder="عدد الألعاب للأضافه" />
                </div>
              </div>
              <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color">عرض</button>
                    <button className="no-color">تحديث</button>
                  </div>
                  <h2>عرض الألعاب السابقة</h2>
                </div>
                <div className="inputs">
                  <input type="text" placeholder=" ID إيميل رقم الهاتف أو" />
                </div>
              </div>
              <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color">حفظ</button>
                    <button className="no-color">تحديث</button>
                  </div>
                  <h2>تفضيلات التحكم</h2>
                </div>
                <div className="inputs">
                  <input type="text" placeholder=" ID إيميل رقم الهاتف أو" />
                </div>
                <div className="tools">
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>عرض الملفات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>عرض المبيعات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>عرض البلاغات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>تعديل البلاغات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>عرض البلاغات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>تعديل البلاغات</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>تحكم كامل</h3>
                  </div>
                  <div className="tool">
                    <img src="/dashr.png" alt="" />
                    <h3>عرض كامل</h3>
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

export default Controls;
