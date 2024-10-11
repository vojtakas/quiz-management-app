import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../supabaseClient';

export default function ManageSingleQuiz() {
  const { id } = useRouter().query;  // Getting location id from route params
  const router = useRouter();
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch months for selection
  useEffect(() => {
    const fetchMonths = async () => {
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
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('location_id', id)
      .ilike('quiz_date', `%${month}%`);

    if (error) {
      console.error('Error fetching quizzes', error.message);
    } else {
      setQuizzes(data);
    }
    setLoading(false);
  };

  const handleQuizSelect = (quizId) => {
    router.push(`/quiz-management/${quizId}`);  // Navigate to quiz management
  };

  if (loading) {
    return <Text>Načítám...</Text>;
  }

  return (
    <View>
      <Text>Spravovat Kvíz</Text>
      <Text>Vyberte měsíc:</Text>
      <ScrollView horizontal>
        {months.map((month) => (
          <Button key={month} title={month} onPress={() => handleMonthSelect(month)} />
        ))}
      </ScrollView>

      {selectedMonth && (
        <View>
          <Text>Seznam kvízů v {selectedMonth}:</Text>
          {quizzes.length > 0 ? (
            <ScrollView>
              {quizzes.map((quiz) => (
                <Button
                  key={quiz.id}
                  title={`${quiz.quiz_name} (${new Date(quiz.quiz_date).toLocaleDateString('cs-CZ')})`}
                  onPress={() => handleQuizSelect(quiz.id)}
                />
              ))}
            </ScrollView>
          ) : (
            <Text>Žádné kvízy v tomto měsíci.</Text>
          )}
        </View>
      )}
    </View>
  );
}
