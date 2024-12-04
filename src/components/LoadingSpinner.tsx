import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div style={spinnerContainerStyle}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

const spinnerContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const spinnerStyle: React.CSSProperties = {
  border: "6px solid #f3f3f3", // Light gray
  borderTop: "6px solid #3498db", // Blue
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);

export default LoadingSpinner;
