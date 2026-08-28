import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'auth';

const readAuth = () => {
	if (typeof window === 'undefined') return null;

	try {
		const value = window.localStorage.getItem(STORAGE_KEY);
		return value ? JSON.parse(value) : null;
	} catch {
		return null;
	}
};

const saveAuth = (value) => {
	if (typeof window === 'undefined') return;

	if (value) {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	} else {
		window.localStorage.removeItem(STORAGE_KEY);
	}
};

export default function useAuth() {
	const [auth, setAuthState] = useState(readAuth);

	const setAuth = useCallback((value) => {
		setAuthState(value);
		saveAuth(value);
	}, []);

	const logout = useCallback(() => setAuth(null), [setAuth]);

	useEffect(() => {
		const handleStorage = (event) => {
			if (event.key === STORAGE_KEY) setAuthState(readAuth());
		};

		window.addEventListener('storage', handleStorage);
		return () => window.removeEventListener('storage', handleStorage);
	}, []);

	return {
		auth,
		user: auth?.user ?? null,
		token: auth?.token ?? null,
		isAuthenticated: Boolean(auth?.token),
		setAuth,
		logout,
	};
}
