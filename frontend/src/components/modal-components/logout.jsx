import { useEffect, useState } from "react";

const GetLogout = () => {
  const [log, setLog] = useState(false);
  const LogState = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setLog(true);
    } else {
      setLog(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  useEffect(() => {
    LogState();
  }, []);
  return (
    <div className="after-reg-modal">
      <i
        className="fa fa-sign-out-alt"
        style={{
          color: "#ff6279",
          borderColor: "#ff6279",
          borderRightColor: "transparent",
        }}
      ></i>
      <h3>Logout!</h3>
      {log ? (
        <div>
          {" "}
          <h3>Click on the button to logout from the session!</h3>
          <br />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <h3>
          You are Not logged. if you are not logged how you want to logout
          again!
        </h3>
      )}
    </div>
  );
};
export default GetLogout;
