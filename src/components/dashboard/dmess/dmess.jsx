import "./dmStyle.css";

const Dmess = () => {
  return (
    <>
      <div className="d-mess">
        <div className="container">
          <div className="d-mess-cont">
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
              <h1>الرسائل</h1>
              <div className="cont-info">
                <div className="info">
                  <h3>جديد</h3>
                  <p>0</p>
                </div>
                <div className="info">
                  <h3>كلى</h3>
                  <p>15</p>
                </div>
              </div>
            </div>
            <div className="cards">
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <div className="main-info">
                    <h3>11:20</h3>
                    <h3>صالح عبد الرحمن</h3>
                  </div>
                  <div className="contact-info">
                    <p>something@gmail.com</p>
                    <p>+90 552-593-90-69</p>
                  </div>
                  <div className="mess">
                    <p>نعمل شراكة شرايكم</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <div className="main-info">
                    <h3>11:20</h3>
                    <h3>صالح عبد الرحمن</h3>
                  </div>
                  <div className="contact-info">
                    <p>something@gmail.com</p>
                    <p>+90 552-593-90-69</p>
                  </div>
                  <div className="mess">
                    <p>نعمل شراكة شرايكم</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <div className="main-info">
                    <h3>11:20</h3>
                    <h3>صالح عبد الرحمن</h3>
                  </div>
                  <div className="contact-info">
                    <p>something@gmail.com</p>
                    <p>+90 552-593-90-69</p>
                  </div>
                  <div className="mess">
                    <p>نعمل شراكة شرايكم</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <div className="main-info">
                    <h3>11:20</h3>
                    <h3>صالح عبد الرحمن</h3>
                  </div>
                  <div className="contact-info">
                    <p>something@gmail.com</p>
                    <p>+90 552-593-90-69</p>
                  </div>
                  <div className="mess">
                    <p>نعمل شراكة شرايكم</p>
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

export default Dmess;
