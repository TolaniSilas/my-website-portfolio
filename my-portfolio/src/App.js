import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Research from './pages/Research';
import NoPage from "./pages/NoPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blog />} />
        <Route path="research" element={<Research />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  )

}

export default App;
