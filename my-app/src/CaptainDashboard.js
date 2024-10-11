import React from 'react';
import { useNavigate } from 'react-router-dom';

function CaptainDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vítejte, Kapitáne!</h1>
      <button onClick={() => navigate('/')}>Zpět na úvodní obrazovku</button>
      <div>
        <p>Možnosti správy týmu a přihlášení na kvíz.</p>
      </div>
    </div>
  );
}

export default CaptainDashboard;
