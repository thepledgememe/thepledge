import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/home.page";
import PledgePage from "./pages/pledge.page";
import DashBoardPage from "./pages/dashboard.page";
import LoadingSpinner from "./components/LoadingSpinner"; // Example spinner component
import ErrorBoundary from "./components/ErrorBoundary"; // Custom error boundary
import { AppProviders } from "./context/AppProviders";

const App: React.FC = () => {
  return (
    <AppProviders>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/your-pledge" element={<PledgePage />} />
              <Route path="/dashboard" element={<DashBoardPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </AppProviders>
  );
};

export default App;
