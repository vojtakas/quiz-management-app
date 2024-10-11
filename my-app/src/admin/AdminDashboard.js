// Update src/admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      <h1>Vítejte v administraci</h1>
      <p>Zde můžeš spravovat všechny aspekty svého pub quizu.</p>

      <ul>
        <li>
          <Link to="/manage-season">Spravovat sezóny</Link>
        </li>
        <li>
          <Link to="/manage-locations">Spravovat lokality a kapacitu</Link> {/* Includes capacity and quiz days */}
        </li>
        <li>
          <Link to="/manage-specials">Vytvořit speciální kvízy</Link>
        </li>
        <li>
          <Link to="/view-results">Zobrazit/Upravit výsledky</Link>
        </li>
        <li>
          <Link to="/manage-teams">Spravovat týmy</Link> {/* Manage teams */}
        </li>
      </ul>

      <p>"Tady můžeš vládnout jako Brumbál v Bradavicích!"</p> {/* Subtle humorous reference */}
    </div>
  );
}
