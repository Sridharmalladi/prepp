import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import InterviewRoom from './pages/InterviewRoom';
import StatusViewer from './pages/StatusViewer';
import FeedbackSummary from './pages/FeedbackSummary';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview/:roomName" element={<InterviewRoom />} />
            <Route path="/status" element={<StatusViewer />} />
            <Route path="/feedback/:interviewId" element={<FeedbackSummary />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;