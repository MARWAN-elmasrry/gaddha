import "./dgStyle.css";

const Card = () => {
  return (
    <>
      <div className="card">
        <div className="card-num">
          <span class="number">22</span>
        </div>
        <div className="card-info">
          <h4>22,444</h4>
          <img src="./catimg.png" alt="" />
          <h5>فئة معينة</h5>
        </div>
      </div>
    </>
  );
};

const Dgames = () => {
  return (
    <>
      <div className="d-games">
        <div className="container">
          <div className="d-games-cont">
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
              <h1>الألعاب </h1>
              <div className="cont-info">
                <div className="info">
                  <h3>عدد</h3>
                  <p>7</p>
                </div>
              </div>
            </div>
            <div className="cards">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dgames;
