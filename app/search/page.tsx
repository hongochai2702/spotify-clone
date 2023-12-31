import React from "react";

import getSongsByTitle from "@/actions/getSongsByTitle";

import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import ContentPage from "@/components/ContentPage";

import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps {
	searchParams: { title: string };
}
const Search: React.FC<SearchProps> = async ({ searchParams }) => {
	const songs = await getSongsByTitle(searchParams.title);

	return (
		<ContentPage>
			<Header className="from-bg-neutral-900">
				<div className="mb-2 flex flex-col gap-y-6">
					<h1 className="text-white text-3xl font-semibold">Search</h1>
					<SearchInput />
					<SearchContent songs={songs} />
				</div>
			</Header>
		</ContentPage>
	);
};

export default Search;
