import { useState } from "react";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Procurement from "./pages/Procurement";
import Production from "./pages/Production";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";

/* ---------- APP LAYOUT (LOGGED IN) ---------- */
function AppLayout() {
  const { user, logout } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "procurement":
        return <Procurement />;
      case "production":
        return <Production />;
      case "inventory":
        return <Inventory />;
      case "sales":
        return <Sales />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav user={user!} onLogout={logout} />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeItem={activePage}
        onNavigate={setActivePage}
      />

      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? "pl-16" : "pl-64"
        }`}
      >
        <div className="p-8">{renderPage()}</div>
      </main>
    </div>
  );
}

/* ---------- AUTH GATE ---------- */
function AppContent() {
  const { user } = useAuth();
  return user ? <AppLayout /> : <Login />;
}

/* ---------- ROOT ---------- */
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
