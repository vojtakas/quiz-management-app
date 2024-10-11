// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';  
import CaptainDashboard from './CaptainDashboard';
import UserDashboard from './UserDashboard';
import ModeratorDashboard from './ModeratorDashboard';
import AdminDashboard from './admin/AdminDashboard';  // Updated to import from admin folder
import ManageSeasons from './admin/ManageSeasons';     // Importing ManageSeasons
import ManageLocations from './admin/ManageLocations'; // Importing ManageLocations
import ManageSpecials from './admin/ManageSpecials';   // Importing ManageSpecials
import ViewResults from './admin/ViewResults';         // Importing ViewResults
import ManageTeams from './admin/ManageTeams';         // Importing ManageTeams
import ManageSingleQuiz from './admin/ManageSingleQuiz'; // Importing ManageSingleQuiz for individual quiz management
import Login from './Login';
import SignUpOptions from './SignUpOptions';
import SignUpUser from './SignUpUser';
import SignUpCaptain from './SignUpCaptain';
import InitialScreen from './InitialScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-options" element={<SignUpOptions />} />
        <Route path="/signup-user" element={<SignUpUser />} />
        <Route path="/signup-captain" element={<SignUpCaptain />} />

        {/* Protecting all dashboards */}
        <Route
          path="/captain-dashboard"
          element={
            <ProtectedRoute>
              <CaptainDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moderator-dashboard"
          element={
            <ProtectedRoute>
              <ModeratorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Adding protected routes for management features */}
        <Route
          path="/manage-seasons"
          element={
            <ProtectedRoute>
              <ManageSeasons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-locations"
          element={
            <ProtectedRoute>
              <ManageLocations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-specials"
          element={
            <ProtectedRoute>
              <ManageSpecials />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-results"
          element={
            <ProtectedRoute>
              <ViewResults />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-teams"
          element={
            <ProtectedRoute>
              <ManageTeams />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-quiz/:id"  // Route for managing individual quizzes
          element={
            <ProtectedRoute>
              <ManageSingleQuiz />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
