"use client";
import { useGetSongById } from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import React from "react";
import PlayerContent from "./PlayerContent";

interface PlayerProps {}
const Player: React.FC<PlayerProps> = () => {
	const player = usePlayer();
	const { song, isLoading } = useGetSongById(player.activeId);
	const songUrl = useLoadSongUrl(song);

	if (!song || !songUrl || !player.activeId) {
		return null;
	}

	return (
		<div
			className="
      fixed
      bottom-0
      bg-black
      w-full
      h-[80px]
      px-4
      py-2
    "
		>
			<PlayerContent key={songUrl} song={song} songUrl={songUrl} />
		</div>
	);
};

export default Player;
