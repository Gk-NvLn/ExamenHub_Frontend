import { Navigate, Outlet, useLocation } from 'react-router-dom';


export default function RoleRoute({ roles = [], user }) {
	const location = useLocation();


	const currentUser = user ?? getStoredUser();

	if (!currentUser) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	const allowedRoles = Array.isArray(roles) ? roles : [roles];
	const userRole = currentUser.role ?? currentUser.roles;
	const hasRole =
		allowedRoles.length === 0 ||
		allowedRoles.some((role) =>
			Array.isArray(userRole) ? userRole.includes(role) : userRole === role,
		);

	if (!hasRole) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <Outlet />;
}

function getStoredUser() {
	try {
		const storedUser = localStorage.getItem('user');
		return storedUser ? JSON.parse(storedUser) : null;
	} catch {
		return null;
	}
}
