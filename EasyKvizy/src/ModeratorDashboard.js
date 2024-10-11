import React from 'react';
import { useRouter } from 'expo-router';

function ModeratorDashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>Vítejte, Moderátore!</h1>
      <button onClick={() => router.push('/')}>Zpět na úvodní obrazovku</button>
      <div>
        <p>Možnosti zadání výsledků a správy kvízů.</p>
      </div>
    </div>
  );
}

export default ModeratorDashboard;
