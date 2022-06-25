import React from "react";
import { Routes, Route } from "react-router-dom";
import { Board } from "./Board";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/board" element={<Board />} />
      </Routes>
    </div>
  );
};
