import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecountProcess from '../views/RecountProcess.view';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage/>} /> */}
        
        {/* <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        /> */}
        <Route path="/" element={<RecountProcess />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
