import { Stack } from 'expo-router';
import CaptainDashboard from '../src/CaptainDashboard';
import UserDashboard from '../src/UserDashboard';
import ModeratorDashboard from '../src/ModeratorDashboard';
import AdminDashboard from '../src/admin/AdminDashboard';
import ManageSeasons from '../src/admin/ManageSeasons';
import ManageLocations from '../src/admin/ManageLocations';
import ManageSpecials from '../src/admin/ManageSpecials';
import ViewResults from '../src/admin/ViewResults';
import ManageTeams from '../src/admin/ManageTeams';
import ManageSingleQuiz from '../src/admin/ManageSingleQuiz';
import Login from '../src/Login';
import SignUpOptions from '../src/SignUpOptions';
import SignUpUser from '../src/SignUpUser';
import SignUpCaptain from '../src/SignUpCaptain';
import InitialScreen from '../src/InitialScreen';

export default function App() {
  return (
    <Stack>
      <Stack.Screen name="InitialScreen" component={InitialScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUpOptions" component={SignUpOptions} />
      <Stack.Screen name="SignUpUser" component={SignUpUser} />
      <Stack.Screen name="SignUpCaptain" component={SignUpCaptain} />
      <Stack.Screen name="CaptainDashboard" component={CaptainDashboard} />
      <Stack.Screen name="UserDashboard" component={UserDashboard} />
      <Stack.Screen name="ModeratorDashboard" component={ModeratorDashboard} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="ManageSeasons" component={ManageSeasons} />
      <Stack.Screen name="ManageLocations" component={ManageLocations} />
      <Stack.Screen name="ManageSpecials" component={ManageSpecials} />
      <Stack.Screen name="ViewResults" component={ViewResults} />
      <Stack.Screen name="ManageTeams" component={ManageTeams} />
      <Stack.Screen name="ManageSingleQuiz" component={ManageSingleQuiz} />
    </Stack>
  );
}
