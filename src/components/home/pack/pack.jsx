import { useState } from "react";
import { createPayment } from "../../../api/services/userService";
import Modal from "../../ui/Modal";
import "./pStyle.css";
import GlareHover from './GlareHover'


const Pack = () => {
  const loginType = localStorage.getItem("loginType");
  if (loginType === "admin") {
    return <></>;
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [price, setPrice] = useState(0);
  const pay = async (price) => {
    setPrice(price);
    const response = await createPayment(price);
    const script = document.createElement("script");
    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${response?.checkoutId}`;
    script.async = true;

    const paymentWidgetDiv = document.getElementById("payment-widget");
    if (paymentWidgetDiv) {
      paymentWidgetDiv.innerHTML = "";
      paymentWidgetDiv.appendChild(script);
    } else {
      document.body.appendChild(script);
    }
    setOpen(true);
    console.log("Payment Response:", response);
  };
  return (
    <>
      <Modal title={`الدفع - ${price} ريال`} isOpen={open} onClose={handleClose}>
        <div id="payment-widget"></div>
        <form
          action="https://gaddha-production.up.railway.app/api/user/callback"
          className="paymentWidgets"
          data-brands="VISA MASTER MADA"
        ></form>
      </Modal>

      <div className="pack">
        <div className="container">
          <div className="pack-cont">
            <div className="cards">
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
                <div className="card">
                            <div className="main" onClick={() => pay(14)}>
                              <h5>لعبتين</h5>
                              <div className="price">
                                <div className="price-info">
                                  <p>14</p>
                                  <img src="./riyal.png" alt="" />
                                </div>
                              </div>
                            </div>
                            <div className="top"></div>
                            <div className="center"></div>
                          </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
              <div className="card card2">
                <div className="main" onClick={() => pay(8)}>
                  <h5>لعبة واحدة</h5>
                  <div className="price">
                    <div className="price-info">
                      <p>8</p>
                      <img src="./riyal.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="top"></div>
                <div className="center"></div>
              </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
              <div className="card card3">
                <div className="main" onClick={() => pay(75)}>
                  <h5>ألعاب 10</h5>
                  <div className="price">
                    <div className="price-info">
                      <p>70</p>
                      <img src="./riyal.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="top"></div>
                <div className="center"></div>
              </div>
              </GlareHover>
              <GlareHover
                glareColor="#53210A"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={1000}
                playOnce={false}
              >
              <div className="card card4">
                <div className="main" onClick={() => pay(35)}>
                  <h5>5 ألعاب</h5>
                  <div className="price">
                    <div className="price-info">
                      <p>37</p>
                      <img src="./riyal.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="top">
                  <h3>الأكثر مبيعا</h3>
                </div>
                <div className="center"></div>
              </div>
              </GlareHover>
            </div>
            <img src="./offers.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pack;
