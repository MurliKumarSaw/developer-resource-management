import { Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Developers from "../pages/Developers.jsx";
import Projects from "../pages/Projects.jsx";
import Assignments from "../pages/Assignments.jsx";
import Notifications from "../pages/Notifications.jsx";
import DeveloperDetails from "../pages/DeveloperDetails.jsx";





function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/developers" element={<Developers />} />

        <Route
          path="/developers/:developerId"
          element={<DeveloperDetails />}
        />

        <Route path="/projects" element={<Projects />} />

        <Route path="/assignments" element={<Assignments />} />

        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;