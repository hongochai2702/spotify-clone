import { create } from "zustand";

interface PlayerStorage {
	id: string;
	ids: string[];
	activeId?: string;
	setId: (id: string) => void;
	setIds: (ids: string[]) => void;
	reset: () => void;
}

const usePlayer = create<PlayerStorage>((set) => ({
	id: "",
	ids: [],
	activeId: undefined,
	setId: (id: string) => set({ activeId: id }),
	setIds: (ids: string[]) => set({ ids }),
	reset: () => set({ id: "", ids: [], activeId: undefined }),
}));

export default usePlayer;
