"use client";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUsers";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
	songId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
	const router = useRouter();
	const { supabaseClient } = useSessionContext();

	const authModal = useAuthModal();
	const { user } = useUser();

	const [isLiked, setIsLiked] = useState<boolean>(false);

	useEffect(() => {
		if (!user?.id) {
			return;
		}

		const fetchData = async () => {
			const { data, error } = await supabaseClient
				.from("liked_songs")
				.select("*")
				.eq("user_id", user.id)
				.eq("song_id", songId)
				.single();

			if (!error && data) {
				setIsLiked(true);
			}
		};

		fetchData();
	}, [user?.id, songId, supabaseClient]);

	const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

	const handleClick = async () => {
		if (!user) {
			authModal.onOpen();
			return;
		}

		if (isLiked) {
			const { data, error } = await supabaseClient
				.from("liked_songs")
				.delete()
				.eq("user_id", user.id)
				.eq("song_id", songId);

			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(false);
			}
		} else {
			const { data, error } = await supabaseClient.from("liked_songs").insert({
				user_id: user.id,
				song_id: songId,
			});
			if (error) {
				toast.error(error.message);
			} else {
				setIsLiked(true);
				toast.success("Liked");
			}
		}

		router.refresh();
	};

	return (
		<button onClick={handleClick} className="hover:opacity-75 transition">
			<Icon size={25} color={isLiked ? "#22c55e" : "#fff"} />
		</button>
	);
};

export default LikeButton;
