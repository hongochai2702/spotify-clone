"use client";
import React from "react";
import { BounceLoader } from "react-spinners";

const Loading: React.FC = () => {
	return (
		<div className="bg-neutral-900 h-full flex items-center justify-center">
			<BounceLoader color="#22c55e" size={40} />
		</div>
	);
};

export default Loading;
