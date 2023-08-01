import React, { useState } from "react";
import "../components/PasswordStrength.css";
import Criteria from "./Criteria.json";

const PasswordStrength = () => {
  const [message, setMessage] = useState({
    color: "",
    message: "",
  });

  const passwordOkayPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
  const passwordStrongPattern =
    /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^\d]*\d){2})(?=(?:[^!@#$%^&*]*[!@#$%^&*]){2}).{8,}$/;
  //const passwordStrongPattern = /^(?=(?:[^A-Z]*[A-Z]){2})(?=(?:[^a-z]*[a-z]){2})(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
  // const passwordStrongPattern =/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(a-zA-Z0-9){8,}$/;

  const checkHandler = (e) => {
    if (e.target.value.length === 0) {
      setMessage({ message: "Required Field", color: "red" });
      return;
    }
    if (passwordStrongPattern.test(e.target.value)) {
      setMessage({ message: "Strong Password", color: "green" });
      return;
    }
    if (
      e.target.value.length >= 6 &&
      passwordOkayPattern.test(e.target.value)
    ) {
      setMessage({ message: "Good Password", color: "orange" });
      return;
    }
    setMessage({ message: "Weak Password", color: "red" });
  };

  return (
    <div
      className="mainContent"
      style={{
        boxSizing: "border-box",
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="criteria"
        style={{
          width: "40vw",
          padding: "1rem 4rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "",
        }}
      >
        <h1 style={{ marginBottom: "1rem"}}>Password Strength Criteria</h1>
        {Criteria.map((reason) => (
          <div
            className="reasons"
            style={{ display: "flex", padding: "1rem", alignItems: "center" }}
          >
            <h3 style={{ color: reason.color }}>{reason.type}:</h3>
            <p style={{ padding: "1rem" }}>{reason.criteria}</p>
          </div>
        ))}
      </div>
      <div
        className="passwordContainer"
        style={{ width: "60vw"}}
      >
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Check Strength Here
        </h1>
        <div className="form" style={{width:"60%",border:"2px solid green"}}>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            style={{ border: `2px solid ${message.color}` }}
            onChange={(e) => checkHandler(e)}
          ></input>
          <p style={{ color: message.color, marginLeft: "0.5rem" }}>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
