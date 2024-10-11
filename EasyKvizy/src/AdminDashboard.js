import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vítejte, admin!</h1>
      <button onClick={() => navigate('/')}>Zpět na úvodní obrazovku</button>
      <div>
        <p>Zobrazit nadcházející kvízy a výsledky.</p>
      </div>
    </div>
  );
}

export default UserDashboard;
