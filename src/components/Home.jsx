import React from "react";
import Google from "./Google";

export default function Home({ onLogin }) {
  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ marginBottom: "24px", fontSize: "3rem", fontWeight: "bold" }}>Home Page</h1>
      <Google onLogin={onLogin} />
    </div>
  );
}
