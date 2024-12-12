import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch("/api/auth/logout", {
                    method: "POST",
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: () => {
            toast.error("Logout failed");
        },
    });
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    return (
        <div className="fixed top-0 left-0 w-full shadow-lg z-10 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo and Nav Links */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                        <img src="rommate-match.png" className="w-10 h-10" />
                        <span className="hidden md:block"></span>
                    </Link>
                </div>

                {/* Auth Section */}
                <div className="flex items-center space-x-4">
                    {authUser ? (
                        <div className="flex items-center space-x-4">
                            <Link to={`/profile/${authUser.username}`} className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-base-200 rounded-full overflow-hidden">
                                    <img 
                                        src={authUser?.profileImg || "/avatar-placeholder.png"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-semibold">{authUser?.fullName}</p>
                                    <p className="text-xs text-gray-500">@{authUser?.username}</p>
                                </div>
                            </Link>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                                className="btn btn-ghost btn-sm"
                            >
                                <BiLogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/login">
                                <button className="btn btn-ghost btn-sm">
                                    Login
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary btn-sm text-white">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;