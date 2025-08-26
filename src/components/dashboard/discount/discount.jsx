import { useState } from "react";
import "./disStyle.css";
import CouponForm from "./CouponForm";

const Discount = () => {
  const cards = Array.from({ length: 4 });

  const [opneCouponFormCreate, setOpentCouponFormCreate] = useState(false);
  const [opneCouponFormEdit, setOpentCouponFormEdit] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mode, setMode] = useState("create");
  return (
    <>
      <div className="dis">
        <div className="container">
          <div className="h-cont">
            <div className="back-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/dash";
                }}
              >
                <img src="./back.png" alt="" />
              </button>
            </div>
            <h1>اكواد الخصم</h1>
            <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
              <div
                onClick={() => {
                  setMode("create");
                  setInitialData(null);
                  setOpentCouponFormCreate(true);
                }}
                className="add-button"
              >
                <button>اضافة</button>
              </div>
              <div className="cont-info">
                <div className="info">
                  <h3>عدد</h3>
                  <p>7</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cards">
            {cards.map((_, idx) => (
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="./delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <button
                    onClick={() => {
                      setOpentCouponFormEdit(true);
                      setMode("edit");
                      setInitialData({
                        couponCode: "#1234",
                        discount: 30,
                        userLimit: 2,
                        perUserLimit: 2,
                        type: "percentage",
                      });
                    }}
                  >
                    تعديل
                  </button>
                  <img src="./inf.png" alt="" />
                  <img src="./inf.png" alt="" />
                  <p>45</p>
                  <p>30%</p>
                  <p>#1234</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CouponForm open={opneCouponFormCreate} setOpen={setOpentCouponFormCreate} mode={mode} />
        <CouponForm
          open={opneCouponFormEdit}
          setOpen={setOpentCouponFormEdit}
          initialData={initialData}
          mode={mode}
        />
      </div>
    </>
  );
};

export default Discount;
