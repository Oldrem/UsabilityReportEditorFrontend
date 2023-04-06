import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Header from '../components/Header'
import LoginPage from '../pages/LoginPage'
import RegistrationPage from '../pages/RegistrationPage'
import ProfilePage from '../pages/ReportEditor'
import HomePage from '../pages/HomePage'
import ProtectedRoute from '../routes/ProtectedRoute'
import '../App.css';

function App() {
  return (
      <Router>
          <Header />
          <main className='container content'>
              <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegistrationPage />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path='/user-profile' element={<ProfilePage />} />
                  </Route>
                  <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
          </main>
      </Router>
  );
}

export default App;
