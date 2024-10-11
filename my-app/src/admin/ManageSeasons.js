import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Updated import

function ManageSeasons() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const { data, error } = await supabase.from('seasons').select('*');
      if (error) {
        console.error(error);
      } else {
        setSeasons(data);
      }
    };
    fetchSeasons();
  }, []);

  return (
    <div>
      <h1>Spravovat sezóny</h1>
      <ul>
        {seasons.map((season) => (
          <li key={season.id}>{season.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ManageSeasons;
