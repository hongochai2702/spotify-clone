import ContentPage from "@/components/ContentPage";
import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";

const AccountPage: React.FC = () => {
	return (
		<ContentPage>
			<Header className="from-bg-neutral-900">
				<div className="mb-2 flex flex-col gap-y-6">
					<h1 className="text-white text-3xl font-semibold">
						Account Settings
					</h1>
					<AccountContent />
				</div>
			</Header>
		</ContentPage>
	);
};

export default AccountPage;
