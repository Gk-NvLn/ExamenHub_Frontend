import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/login';

import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Students from './pages/admin/Students';
import Courses from './pages/admin/Courses';
import Exams from './pages/admin/Exams';
import ExamQuestions from './pages/admin/ExamQuestion';
import ExamResults from './pages/admin/ExamResults';

import StudentLayout from './components/layout/StudentLayout';
import AvailableExams from './pages/student/AvailableExams';
import TakeExam from './pages/student/TakeExam';
import ExamResult from './pages/student/ExamResult';
import MyResults from './pages/student/MyResults';

function HomeRedirect() {
  const { user, token } = useContext(AuthContext);
  if (!token || !user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />


      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="courses" element={<Courses />} />
        <Route path="exams" element={<Exams />} />
        <Route path="exams/:id/questions" element={<ExamQuestions />} />
        <Route path="exams/:id/results" element={<ExamResults />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AvailableExams />} />
        <Route path="exams/:id" element={<TakeExam />} />
        <Route path="exams/:id/result" element={<ExamResult />} />
        <Route path="results" element={<MyResults />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
