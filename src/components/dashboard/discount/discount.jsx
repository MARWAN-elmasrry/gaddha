import { useCallback, useEffect, useState } from "react";
import "./disStyle.css";
import CouponForm from "./CouponForm";
import { deleteVoucher, getVouchers } from "../../../api/services/admingService";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";

const Discount = () => {
  const [coupons, setCoupons] = useState([]);
  const [opneCouponFormCreate, setOpentCouponFormCreate] = useState(false);
  const [opneCouponFormEdit, setOpentCouponFormEdit] = useState(false);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mode, setMode] = useState("create");
  const [reFetch, setRefetch] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [deletedVoucherId, setDeletedVoucherId] = useState();
  const handleRefresh = useCallback(() => {
    setRefetch((prev) => !prev);
  }, []);

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
  }, [triggerRefetch, reFetch]);
  const handleDeleteVoucher = async () => {
    try {
      await deleteVoucher(deletedVoucherId);
      toast.success("تم حذف الكوبون بنجاح");
      setTriggerRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error);
    }
    setWarningModal(false);
  };

  return (
    <>
      <Modal
        className="warning-modal-container"
        title=""
        isOpen={warningModal}
        onClose={() => setWarningModal(false)}
      >
        <div className="warning-modal-content">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-1 h-1 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M6 7a1 1 0 011 1v7a1 1 0 102 0V8a1 1 0 112 0v7a1 1 0 102 0V8a1 1 0 011-1h1V6H5v1h1zm2-3a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1H8zM4 6h12v1a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"
                clipRule="evenodd"
              />
            </svg>
            هل انت متاكد انك تريد الحذف
          </div>
          {/* <div>
            لا يمكن تغيير رقم الهاتف او الايميل,ولكن
            <br /> يمكنك التواصل معنا عبر قسم <br /> الرسائل لاخبارنا بالسبب وراء ذلك و سنساعدك
          </div> */}
          <div className="actions">
            <button onClick={handleDeleteVoucher}>حذف</button>
            <button
              onClick={() => {
                setDeletedCategoryId("");
                setWarningModal(false);
              }}
            >
              الغاء{" "}
            </button>
          </div>
        </div>
      </Modal>
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
          <div style={{ width: "100%", direction: "rtl" }}>
            {" "}
            <button onClick={handleRefresh} title="تحديث الصفحة (Ctrl+R)">
              اعاده تحميل
            </button>
          </div>
          <div className="cards">
            {coupons?.map((coupon, idx) => (
              <div className="card">
                <div
                  className="card-num"
                  onClick={() => {
                    setDeletedVoucherId(coupon._id);
                    setWarningModal(true);
                  }}
                >
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
                  <div className="discount-p">
                    <p>الاستخدام العام</p>
                    <p>{coupon.userLimit}</p>
                  </div>
                  <div className="discount-p">
                    <p>الحد الأقصى لكل مستخدم</p>
                    <p>{coupon.perUserLimit}</p>
                  </div>
                  <div className="discount-p">
                    <p>نسبة الخصم </p>
                    <p>{coupon.discount}</p>
                  </div>
                  <div className="discount-p">
                    <p>كود الخصم</p>
                    <p>{coupon.code}</p>
                  </div>
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
