import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ResearchPage from './pages/ResearchPage';
import SchedulePage from './pages/SchedulePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="/schedule" element={<SchedulePage />} /> 
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Fallback for undefined routes */}
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    );
};

export default App;
