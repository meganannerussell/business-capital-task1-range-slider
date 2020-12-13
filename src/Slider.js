import React, { useState } from "react";

export const Slider = () => {
  const [xPosition, setXPosition] = useState(0);
  const [value, setValue] = useState();
  const [isDown, setIsDown] = useState(false);
  const [rect, setRect] = useState();

  const handleClick = (e) => {
    e.persist();
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xMax = rect.right - rect.left - 10;
    setXPosition(x);
    setValue(x / xMax);
  };

  const handleMove = (e) => {
    e.persist();
    if (isDown) {
      if (rect) {
        const x = e.clientX - rect.left;
        const xMax = rect.right - rect.left - 10;
        const value = x / xMax;
        if (value >= 0 && value <= 1) {
          setXPosition(x);
          setValue(value);
        }
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    if (!rect) {
      const theRect = e.target.getBoundingClientRect();
      setRect(theRect);
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setRect(undefined);
  };

  return (
    <>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          backgroundColor: "#f1a901",
          margin: "auto",
          marginBottom: 30,
          boxShadow: "inherit",
        }}
      >
        <p
          style={{
            paddingTop: 30,
            textAlign: "center",
            fontSize: 20,
            color: "white",
            fontWeight: 600,
          }}
        >
          {Math.abs(value * 100 || 0).toFixed(0)} %
        </p>
      </div>

      <div
        style={{
          height: "15px",
          marginTop: -2,
          zIndex: -10,
          position: "absolute",
          backgroundColor: "#ffb300",
          width: `${xPosition}px`,
          borderRadius: 25,
          paddingRight: 10,
        }}
      />
      <div
        style={{
          position: "relative",
          backgroundColor: "#80808036",
          borderRadius: "25px",
        }}
      >
        <div
          onMouseMove={handleMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          style={{
            position: "absolute",
            width: "100%",
            height: "15px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            width: "5px",
            marginTop: -2,
            marginLeft: `${xPosition}px`,
            backgroundColor: "#585656",
            borderColor: "#585656",
            borderRadius: "15px",
            border: "5px solid #585656",
          }}
        ></div>
      </div>
    </>
  );
};
