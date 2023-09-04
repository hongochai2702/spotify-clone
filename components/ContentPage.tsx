"use client";
import React from "react";

interface ContentPageProps {
	children: React.ReactNode;
}
const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
	return (
		<div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
			{children}
		</div>
	);
};

export default ContentPage;
