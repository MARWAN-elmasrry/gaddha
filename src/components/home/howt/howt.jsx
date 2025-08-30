import "./hStyle.css";

const Howt = () => {
  return (
    <>
      <div className="how">
        <div className="how-container">
          <div className="how-cont">
            <div className="how-t-cont">
              <div className="info">
                <h3>كيف نلعبها</h3>
                <p>
                  كل اللي عليكم تقسمون نفسكم الى فريقين, كل
                  <br /> فريق يختار 3 فئات و عندكم 3 وسائل <br /> مساعده, لكل فريق 60 ثانية يجاوب, و
                  10 <br />
                  ثواني بعد ما يجاوب الفريق الأول.
                </p>
              </div>
              <img src="./qb.png" alt="" className="swinging-img" />
            </div>
            <div className="how-w-cont">
              <h4>
                {" "}
                <img src="./pc.png" alt="" /> اذا تبون تجربة افضل استخدمو شاشة كبيره مثل:{" "}
                <img src="./lap.png" alt="" /> أو{" "}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Howt;
