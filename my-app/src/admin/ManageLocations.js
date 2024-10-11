import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function ManageLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error('Error fetching locations:', error.message);
      } else {
        setLocations(data);
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  // Fetch quizzes when a location is selected
  const handleLocationClick = async (locationId) => {
    setSelectedLocation(locationId);
    setQuizLoading(true);

    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('location_id', locationId);

    if (error) {
      console.error('Error fetching quizzes:', error.message);
    } else {
      setQuizzes(data);
    }
    setQuizLoading(false);
  };

  const handleQuizClick = (quizId) => {
    navigate(`/manage-quiz/${quizId}`);
  };

  if (loading) {
    return <div>Načítám...</div>;
  }

  return (
    <div>
      <h1>Spravovat lokality a kvízy</h1>
      <div className="locations">
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-item"
            style={{ margin: '10px 0', cursor: 'pointer', padding: '10px', border: '1px solid black' }}
            onClick={() => handleLocationClick(location.id)}
          >
            {location.name}
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="quizzes">
          <h2>Kvízy pro lokaci: {locations.find(loc => loc.id === selectedLocation)?.name}</h2>
          {quizLoading ? (
            <div>Načítám kvízy...</div>
          ) : (
            <div className="quiz-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="quiz-item"
                    style={{ padding: '8px', border: '1px solid #ddd', marginBottom: '8px', cursor: 'pointer' }}
                    onClick={() => handleQuizClick(quiz.id)}
                  >
                    {quiz.quiz_name} - {quiz.quiz_date}
                  </div>
                ))
              ) : (
                <div>Žádné kvízy nalezeny</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageLocations;
