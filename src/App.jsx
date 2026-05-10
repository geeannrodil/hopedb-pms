import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <div className="App">
      {currentPage === 'login' ? (
        <LoginPage onSwitch={() => setCurrentPage('register')} />
      ) : (
        <RegisterPage onSwitch={() => setCurrentPage('login')} />
      )}
    </div>
  );
}

export default App;