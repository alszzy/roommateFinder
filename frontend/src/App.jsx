import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
function App() {
    const { data: authUser } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.error) return null;
                return data;
            } catch (error) {
                return null;
            }
        },
        retry: false,
        suspense: false,
        useErrorBoundary: false,
    });

	return (
		<div className='flex max-w-6xl mx-auto'>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;