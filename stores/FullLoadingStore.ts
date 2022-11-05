import { defineStore, acceptHMRUpdate } from "pinia";

export const useFullLoadingStore = defineStore('FullLoadingStore', {
    state: () => {
        return {
            loading: true
        }
    },
    actions: {
        setLoading(status: boolean) {
            this.loading = status;
        }
    },
    getters: {
        getLoading(): boolean {
            return this.loading;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFullLoadingStore, import.meta.hot));
}