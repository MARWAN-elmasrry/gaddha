export const StartBtn = () => {
  return (
    <>
      <button
        className="play"
        style={{ position: "relative", zIndex: "100" }}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/games";
        }}
      >
        العب
      </button>
    </>
  );
};
