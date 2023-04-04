import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar";

export default function UserBookingsList() {
  const dispatch = useDispatch();
  const userId = JSON.parse(sessionStorage.getItem("details")).id || 0;
  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
