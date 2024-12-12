import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
	const [feedType, setFeedType] = useState("Post");
		const { data: authUser } = useQuery({
			queryKey: ["authUser"],
			queryFn: async () => {
				try {
					const res = await fetch("/api/auth/me");
					const data = await res.json();
					if (!res.ok) {
						throw new Error(data.error || "Something went wrong");
					}
					return data;
				} catch (error) {
					console.error("Error in auth query:", error);
					return null;
				}
			},
			retry: false,
		});

	return (
		<>
			<div className='pt-16 flex-[4_4_0] mr-auto border-r border-l border-gray-700 min-h-screen'>
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("post")}
					>
						Posts
						{feedType === "post" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>
				{authUser && <CreatePost />}
				<Posts feedType="post" />
			</div>
		</>
	);
};
export default HomePage;