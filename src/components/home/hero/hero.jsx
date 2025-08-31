import { StartBtn } from "../../startBtn";
import "./hStyle.css";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="container" style={{ zIndex: "1000" }}>
          <div className="hero-cont">
            <div className="back-img">
              <div className="info-f">
                <h2>لعبة تفاعلية من قلب السعودية</h2>
                <h3>قدها ولابس سوالف؟</h3>
                <StartBtn />
              </div>
              <img src="./hero.png" alt="" />
              <img src="./herof.png" alt="" />
              <img src="./logo.png" alt="" style={{ width: 120 }} />
            </div>
          </div>
        </div>
        <div className="tress">
          <img src="./tree4.png" alt="" />
          <img src="./tree3.png" alt="" />
          <img src="./camel.png" alt="" className="camel" />
          <img src="./tree3.png" alt="" />
          <img src="./tree4.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
