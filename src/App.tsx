import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/Header';
import Header from './components/Header';
import HomePage from './pages/MainPage/MainPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import GeneratePage from './pages/GeneratePage/GeneratePage';
import { useEffect } from 'react';

const App: React.FC = () => {
    useEffect(() => {
        document.title = 'МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА';
    }, []);
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/generate" element={<GeneratePage />} />
            </Routes>
        </Router>
    );
};

export default App;
