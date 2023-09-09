"use client";
import React, { useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

interface PlayerContentProps {
	song: Song;
	songUrl: string;
}
const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
	const player = usePlayer();
	const [volume, setVolume] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);

	const Icon = isPlaying ? BsPauseFill : BsPlayFill;
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

	const handleChangeVolume = (value: number) => {
		setVolume(value);
	};

	const onPlayPrevious = () => {
		if (player.ids.length === 0) {
			return;
		}

		const currentIdx = player.ids.findIndex((id) => id === player.activeId);
		const prevSong = player.ids[currentIdx - 1];
		if (!prevSong) {
			/** Load last song in playlist. */
			return player.setId(player.ids[player.ids.length - 1]);
		}

		player.setId(prevSong);
	};
	const onPlayNext = () => {
		if (player.ids.length === 0) {
			return;
		}

		const currentIdx = player.ids.findIndex((id) => id === player.activeId);
		const nextSong = player.ids[currentIdx + 1];
		if (!nextSong) {
			return player.setId(player.ids[0]);
		}

		player.setId(nextSong);
	};

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 h-full">
			<div className="flex justify-start w-full">
				<div className="flex items-center gap-x-4">
					<MediaItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>
			<div className="flex md:hidden col-auto w-full justify-end items-center">
				<div className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-full bg-white p-1">
					<Icon size={30} color="#000000" />
				</div>
			</div>
			<div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
				<AiFillStepBackward
					onClick={onPlayPrevious}
					size={30}
					className="text-neutral-400 cursor-pointer hover:text-white transition"
				/>
				<div
					className="flex items-center justify-center w-10 h-10 rounded-full bg-white p-1 cursor-pointer"
					onClick={() => {}}
				>
					<Icon size={30} color="black" />
				</div>
				<AiFillStepForward
					onClick={onPlayNext}
					size={30}
					className="text-neutral-400 cursor-pointer hover:text-white transition"
				/>
			</div>

			<div className="hidden md:flex w-full justify-end pr-2">
				<div className="flex items-center gap-x-2 w-[120px]">
					<VolumeIcon
						size={34}
						onClick={() => {}}
						className="cursor-pointer`"
					/>
					<Slider onChange={handleChangeVolume} value={volume} />
				</div>
			</div>
		</div>
	);
};

export default PlayerContent;
