import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';  // Adjust to your Supabase client path
import ManageSeries from './ManageSeries';
import ManageSingleQuiz from './ManageSingleQuiz';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [currentView, setCurrentView] = useState('locations');  // Track the current view
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Fetch locations from Supabase
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        setLocations(data);
      }
    };
    fetchLocations();
  }, []);

  // Handle clicking on a location to manage it
  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setCurrentView('location-detail');
  };

  // Handle switching to manage series
  const handleManageSeries = () => {
    setCurrentView('manage-series');
  };

  // Handle switching to manage single quiz
  const handleManageSingleQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentView('manage-single-quiz');
  };

  return (
    <div>
      {currentView === 'locations' && (
        <div>
          <h2>Manage Locations</h2>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Capacity</th>
                <th>Quiz Day</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>{location.capacity}</td>
                  <td>{location.quiz_days}</td>
                  <td>
                    <button onClick={() => handleLocationClick(location)}>
                      Manage Location
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Location Details View */}
      {currentView === 'location-detail' && selectedLocation && (
        <div>
          <h2>{selectedLocation.name}</h2>
          <button onClick={() => setCurrentView('locations')}>
            Back to Locations
          </button>

          <div>
            <button onClick={handleManageSeries}>Manage Series</button>
            <button onClick={() => setCurrentView('single-quiz-select')}>
              Manage Individual Quizzes
            </button>
          </div>
        </div>
      )}

      {/* Manage Series View */}
      {currentView === 'manage-series' && (
        <ManageSeries
          location={selectedLocation}
          backToLocationDetail={() => setCurrentView('location-detail')}
        />
      )}

      {/* Manage Single Quiz Selection */}
      {currentView === 'single-quiz-select' && (
        <div>
          <h3>Select a Quiz Date</h3>
          {/* Dummy dates for quizzes */}
          {['2024-10-10', '2024-10-17', '2024-10-24'].map((date) => (
            <button
              key={date}
              onClick={() => handleManageSingleQuiz({ date })}
            >
              {date}
            </button>
          ))}

          <button onClick={() => setCurrentView('location-detail')}>
            Back to Location Detail
          </button>
        </div>
      )}

      {/* Manage Single Quiz View */}
      {currentView === 'manage-single-quiz' && selectedQuiz && (
        <ManageSingleQuiz
          quiz={selectedQuiz}
          backToLocationDetail={() => setCurrentView('location-detail')}
        />
      )}
    </div>
  );
};

export default ManageLocations;
