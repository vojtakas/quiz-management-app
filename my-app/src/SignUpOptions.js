import { useNavigate } from 'react-router-dom';

export default function SignUpOptions() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Vyberte typ registrace</h1>
      <button onClick={() => navigate('/signup-captain')}>Registrovat jako kapitán</button>
      <button onClick={() => navigate('/signup-user')}>Registrovat jako uživatel</button>
      {/* Back Button */}
      <button onClick={() => navigate(-1)}>Zpět</button>
    </div>
  );
}
