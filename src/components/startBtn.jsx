import "./Startbtn.css";

export const StartBtn = () => {
  return (
    <>
      <div className="btn-play" style={{ position: "relative", zIndex: 100000 }}>
        <button
          className="play"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/games";
          }}
        >
          العب
        </button>
        {/* <div className="an an1"></div>
        <div className="an an2"></div>
        <div className="an an3"></div>
        <div className="an an4"></div> */}
      </div>
    </>
  );
};
