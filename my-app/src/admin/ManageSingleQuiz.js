import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ManageSingleQuiz() {
  const { id } = useParams();  // Getting location id from the URL
  const navigate = useNavigate();
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch months for selection
  useEffect(() => {
    const fetchMonths = async () => {
      // Assume there are quizzes in different months, just simplify for now
      const availableMonths = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
      ];
      setMonths(availableMonths);
    };

    fetchMonths();
  }, []);

  const handleMonthSelect = async (month) => {
    setSelectedMonth(month);
    setLoading(true);
    // Fetch quizzes based on the month and location id
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('location_id', id)
      .ilike('quiz_date', `%${month}%`); // Adjust based on the month

    if (error) {
      console.error('Error fetching quizzes', error.message);
    } else {
      setQuizzes(data);
    }

    setLoading(false);
  };

  const handleQuizSelect = (quizId) => {
    navigate(`/quiz-management/${quizId}`);  // Go to quiz management page
  };

  if (loading) {
    return <div>Načítám...</div>;
  }

  return (
    <div>
      <h1>Spravovat Kvíz</h1>
      <p>Vyberte měsíc:</p>
      <div>
        {months.map((month) => (
          <button key={month} onClick={() => handleMonthSelect(month)}>
            {month}
          </button>
        ))}
      </div>

      {selectedMonth && (
        <div>
          <h2>Seznam kvízů v {selectedMonth}:</h2>
          {quizzes.length > 0 ? (
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz.id} onClick={() => handleQuizSelect(quiz.id)}>
                  {quiz.quiz_name} ({new Date(quiz.quiz_date).toLocaleDateString('cs-CZ')})
                </li>
              ))}
            </ul>
          ) : (
            <p>Žádné kvízy v tomto měsíci.</p>
          )}
        </div>
      )}
    </div>
  );
}
