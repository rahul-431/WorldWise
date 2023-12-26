import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import styles from "./AppLayout.module.css";
import User from "../components/User";
import { useEffect } from "react";
export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <div className={styles.app}>
      {isAuthenticated && (
        <>
          <Sidebar />
          <Map />
          <User />
        </>
      )}
    </div>
  );
}
