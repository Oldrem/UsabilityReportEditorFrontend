import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Header from '../components/Header'
import LoginPage from '../pages/LoginPage'
import RegistrationPage from '../pages/RegistrationPage'
import ReportEditor from '../pages/ReportEditor'
import HomePage from '../pages/HomePage'
import ProtectedRoute from '../routes/ProtectedRoute'
import '../styles/App.css';

function App() {
  return (
      <Router>
          <Header />
          <main className='container content'>
              <Routes>
                  <Route element={<ProtectedRoute />}>
                      <Route path='/' element={<HomePage />} />
                  </Route>
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegistrationPage />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path='/home' element={<HomePage />} />
                  </Route>
                  <Route element={<ProtectedRoute />}>
                      <Route path='/report/:id' element={<ReportEditor />} />
                  </Route>
                  <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
          </main>
      </Router>
  );
}

export default App;
