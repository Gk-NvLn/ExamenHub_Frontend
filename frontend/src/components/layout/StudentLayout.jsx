import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function StudentLayout() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">Exam Hub</div>
        <nav className="sidebar-nav">
          <NavLink to="/student" end>Examens disponibles</NavLink>
          <NavLink to="/student/results">Mes résultats</NavLink>
        </nav>
      </aside>
      <div className="app-main">
        <header className="topbar">
          <span className="topbar-role">Étudiant</span>
          <span className="topbar-user">{user?.name}</span>
          <button className="btn btn-ghost" onClick={handleLogout}>Déconnexion</button>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
