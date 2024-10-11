import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure you get the logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage('Chyba: Uživatel není přihlášen.');
      setLoading(false);
      return;
    }

    // Insert the new team into the Teams table
    const { error } = await supabase
      .from('teams')
      .insert({ team_name: teamName, captain: user.id });

    if (error) {
      setMessage('Chyba při vytváření týmu: ' + error.message);
    } else {
      setMessage('Tým úspěšně vytvořen!');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Vytvořit tým</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Název týmu"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Vytvářím tým...' : 'Vytvořit tým'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
