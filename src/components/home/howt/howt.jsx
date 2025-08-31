import { useState, useEffect } from "react";
import "./hStyle.css";

const Howt = () => {
  const images = ["./pc.png", "./lap.png"]; 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
                {"  "}
                <img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt="device"
                  className="fade-img"
                />
                  اذا تبون تجربة افضل استخدمو شاشة كبيره مثل
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Howt;
