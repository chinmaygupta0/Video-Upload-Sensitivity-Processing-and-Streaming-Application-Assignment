import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 🔥 IMPORTANT
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.title}>🎬 Video Sensitivity Platform</h3>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/upload" style={styles.link}>Upload</Link>
        <button onClick={logout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    backgroundColor: "#111827",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
  },
  title: {
    color: "#f9fafb",
    fontWeight: "600"
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: "500"
  },
  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
