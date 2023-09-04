"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUsers";

const UploadModal: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const uploadModal = useUploadModal();
	const { user } = useUser();
	const supabaseClient = useSupabaseClient();
	const router = useRouter();

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			author: "",
			title: "",
			song: null,
			image: null,
		},
	});

	const onChange = (open: boolean) => {
		if (!open) {
			reset();
			uploadModal.onClose();
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		//TODO: Upload to Supabase.
		try {
			setIsLoading(true);
			const imageFile = values.image?.[0];
			const songFile = values.song?.[0];
			if (!imageFile || !songFile || !user) {
				toast.error("Missing fields");
				return;
			}
			const uniqueID = uniqid();
			const { data: songData, error: songError } = await supabaseClient.storage
				.from("songs")
				.upload(`song-${values.title}-${uniqueID}`, songFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (songError) {
				setIsLoading(false);
				return toast.error("Failed song upload.");
			}

			const { data: imageData, error: imageError } =
				await supabaseClient.storage
					.from("images")
					.upload(`image -${values.title}-${uniqueID}`, imageFile, {
						cacheControl: "3600",
						upsert: false,
					});

			if (imageError) {
				setIsLoading(false);
				return toast.error("Failed images upload");
			}

			// Save to DB
			const { error: supabaseError } = await supabaseClient
				.from("songs")
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					song_path: songData.path,
					image_path: imageData.path,
				});

			if (supabaseError) {
				setIsLoading(false);
				return toast.error(supabaseError.message);
			}

			router.refresh();
			setIsLoading(false);
			toast.success("Song created.");
			reset();
			uploadModal.onClose();
		} catch (e) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			title="Add a songs"
			description="Upload to mp3 file"
			isOpen={uploadModal.isOpen}
			onChange={onChange}
		>
			<form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
				<Input
					id="title"
					disabled={isLoading}
					placeholder="Song title"
					{...register("title", { required: true })}
				/>
				<Input
					id="author"
					disabled={isLoading}
					placeholder="Song author"
					{...register("author", { required: true })}
				/>
				<div>
					<div className="pb-1">Select a song file</div>
					<Input
						id="song"
						type="file"
						disabled={isLoading}
						accept=".mp3"
						{...register("song", { required: true })}
					/>
				</div>
				<div>
					<div className="pb-1">Select an image</div>
					<Input
						id="image"
						type="file"
						disabled={isLoading}
						accept="image/*"
						{...register("image", { required: true })}
					/>
				</div>
				<Button type="submit">Create</Button>
			</form>
		</Modal>
	);
};

export default UploadModal;
