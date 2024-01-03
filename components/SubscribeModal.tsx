"use client";

import { useUser } from "@/hooks/useUsers";
import { Price, ProductWithPrice } from "@/types";
import React, { memo, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import toast from "react-hot-toast";

interface SubscribeModalProps {
	products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
	const priceString = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: price.currency,
		minimumFractionDigits: 0,
	}).format((price?.unit_amount || 0) / 100);
	return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
	const {user,isLoading,subscription} = useUser();

	const [priceIdLoading, setPriceIdLoading] = useState<string>();

	const handleCheckout = async (price: Price) => {
		setPriceIdLoading(price.id);

		if (!user) {
			setPriceIdLoading(undefined);
			return toast.error('Must be logged in');
		}

		if (subscription) {
			setPriceIdLoading(undefined);
			return toast('Already subscribed');
		}

		try {
			const {} = await
		} catch (error) {
			toast.error((error as Error).message);
		}
	}

	let content = <div className="text-center">No products available.</div>;
	if (products.length) {
		content = (
			<div>
				{products.map((product) => {
					if (!product.prices?.length) {
						return <div key={product.id}>No prices</div>;
					}

					return product.prices.map((price) => (
						<Button
							onClick={() => handleCheckout(price)}
							disabled={isLoading || price.id === priceIdLoading}
							className="mb-4"
							key={price.id}
						>
							{`Subscribe for ${formatPrice(price)} a ${price.interval}`}
						</Button>
					));
				})}
			</div>
		);
	}
	return (
		<Modal
			title="Only for premium users"
			description="Listen to music with Spotify Premium"
			isOpen
			onChange={() => {}}
		>
			{content}
		</Modal>
	);
};

export default memo(SubscribeModal);
