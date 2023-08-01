import React, { useEffect, useState } from "react";
import "../components/PasswordStrength.css";
import Criteria from "./Criteria.json";
import Icon from "../copyIcon.png";

const PasswordStrength = () => {
  const [randomPass, setRandomPass] = useState("");
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

  const copyFunction = () => {
    let copyGfGText = document.getElementById("randomPass");
    copyGfGText.select();
    document.execCommand("copy");
  };

  const generateRandomPass = () => {
    const specialCharacters = "!@#$%^&*";
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomLowercase = Math.random().toString(36).slice(2, 7);
    const randomUppercase = Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase();
    const randomIndex = Math.floor(Math.random() * specialCharacters.length);
    const randomSpecial1 = specialCharacters[randomIndex];
    const randomSpecial2 = specialCharacters[randomIndex];
    const password =
      randomLowercase +
      randomSpecial1 +
      randomUppercase +
      randomSpecial2 +
      randomNumber;
    return setRandomPass(password);
  };

  return (
    <div
      className="mainContent"
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
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
          marginLeft: "4rem",
          display: "flex",
          flexDirection: "column",
          borderRight:"4px solid #2C5364"
        }}
      >
        <h1 style={{ marginBottom: "1rem",letterSpacing:2}}>Password Strength</h1>
        <h1 style={{letterSpacing:2}}>Criteria</h1>
        {Criteria.map((reason) => (
          <div
            className="reasons"
            style={{
              display: "flex",
              padding: "1rem",
              alignItems: "center",
              lineHeight: "1.5rem",
            }}
          >
            <h3 style={{ color: reason.color }}>{reason.type}:</h3>
            <p style={{ fontSize:"1rem", padding: "1rem",wordSpacing:1 }}>{reason.criteria}</p>
          </div>
        ))}
      </div>
      <div className="passwordContainer" style={{ width: "60vw" }}>
        <h1 style={{ width: "100%", textAlign: "center" }}>
          Check Strength Here
        </h1>
        <div className="form" style={{ width: "60%" }}>
          <input
            type="text"
            id="password"
            placeholder="Enter Password"
            style={{ border: `2px solid ${message.color}`,marginTop:"0.5rem" }}
            onChange={(e) => checkHandler(e)}
          ></input>
          <p style={{ color: message.color, fontWeight:600 ,marginLeft: "0.5rem" }}>
            {message.message}
          </p>
        </div>
        <div
          className="randomPass"
          style={{
            display: "flex",
            width: "60%",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
            position: "relative",
          }}
        >
          <button
            style={{
              padding: "0.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: "#CCEEBC",
              minHeight: "2.5rem",
              color: "green",
            }}
            onClick={generateRandomPass}
          >
            Generate Random
          </button>
          <div className="copyArea" style={{height:"2.5rem",display:"flex"}}>
            <input
              readOnly
              type="text"
              value={randomPass}
              id="randomPass"
              style={{
                borderRadius: "5px 0 0 5px",
                border: "2px solid lightgray",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                color: "#203A43",
                outline: "none",
              }}
            ></input>
            <button
              style={{
                padding: "0.5rem",
                borderRadius: "0 5px 5px 0",
                cursor: "pointer",
                fontWeight: "bold",
                border: "none",
                height:"100% ",
                opacity:0.9
              }}
              onClick={copyFunction}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
