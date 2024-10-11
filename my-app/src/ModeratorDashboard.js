import React from 'react';
import { useNavigate } from 'react-router-dom';

function ModeratorDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vítejte, Moderátore!</h1>
      <button onClick={() => navigate('/')}>Zpět na úvodní obrazovku</button>
      <div>
        <p>Možnosti zadání výsledků a správy kvízů.</p>
      </div>
    </div>
  );
}

export default ModeratorDashboard;
