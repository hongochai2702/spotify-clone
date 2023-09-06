import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";

import { Song } from "@/types";

const useGetSongById = (id?: string) => {
	const [isLoading, setIsLoading] = useState(false);
	const [song, setSong] = useState<Song | undefined>(undefined);
	const { supabaseClient } = useSessionContext();

	useEffect(() => {
		if (!id) {
			return;
		}

		setIsLoading(true);
		const fetchSong = async () => {
			const { data, error } = await supabaseClient
				.from("songs")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				toast.error(error.message);
				setIsLoading(false);
				return;
			}

			setSong(data as Song);
			setIsLoading(false);
		};

		fetchSong();
	}, [id, supabaseClient]);

	return useMemo(() => ({ song, isLoading }), [song, isLoading]);
};

export { useGetSongById };
