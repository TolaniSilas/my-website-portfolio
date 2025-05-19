import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ResearchPage from './pages/ResearchPage';
import NotFoundPage from "./pages/NotFoundPage";


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="research" element={<ResearchPage />} />
          </Route>

          {/* Fallback for undefined routes */}
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    );
};

export default App;
