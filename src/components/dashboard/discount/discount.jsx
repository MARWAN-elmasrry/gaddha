import { useEffect, useState } from "react";
import "./disStyle.css";
import CouponForm from "./CouponForm";
import { getVouchers } from "../../../api/services/admingService";
import { toast } from "react-toastify";
const Discount = () => {
  const [coupons, setCoupons] = useState([]);
  const [opneCouponFormCreate, setOpentCouponFormCreate] = useState(false);
  const [opneCouponFormEdit, setOpentCouponFormEdit] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mode, setMode] = useState("create");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVouchers();
        setCoupons(data);
      } catch (err) {
        toast.error("حدث خطأ ما");
        console.error(err);
      }
    };

    fetchData();
  }, [triggerRefetch]);

  return (
    <>
      <div className="dis">
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
                  <p>{coupons.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cards">
            {coupons?.map((coupon, idx) => (
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <button
                    onClick={() => {
                      setOpentCouponFormEdit(true);
                      setMode("edit");
                      setInitialData(coupon);
                    }}
                  >
                    تعديل
                  </button>
                  <img src="./inf.png" alt="" />
                  <img src="./inf.png" alt="" />
                  <p>{coupon.perUserLimit}</p>
                  <p>{coupon.discount}</p>
                  <p>{coupon.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CouponForm
          open={opneCouponFormCreate}
          setOpen={setOpentCouponFormCreate}
          mode={mode}
          setTriggerRefetch={setTriggerRefetch}
        />
        <CouponForm
          open={opneCouponFormEdit}
          setOpen={setOpentCouponFormEdit}
          initialData={initialData}
          mode={mode}
          setTriggerRefetch={setTriggerRefetch}
        />
      </div>
    </>
  );
};

export default Discount;
