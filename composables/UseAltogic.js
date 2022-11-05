import { createClient } from "altogic";


const loggedInUser = ref(null);

export function useAltogic() {
    const envUrl = useRuntimeConfig().public.altogicEnvUrl;
    const clientKey = useRuntimeConfig().public.altogicClientKey;
    
    const altogic = createClient(envUrl, clientKey);
    const fullLoadingStore = useFullLoadingStore();

    onMounted(async () => {
        if (!loggedInUser.value) {
            await user.getUser();
        }
    })

    const auth = {
        async signUp({ email, password }) {
            const res = await altogic.auth.signUpWithEmail(email, password);            
        },

        async signIn({ email, password }) {
            const res = await altogic.auth.signInWithEmail(email, password);
            loggedInUser.value = res.user;
            return res
        },

        async signOut() {
            const { errors } = await altogic.auth.signOut();
        },

        async resendVerificationEmail(email) {
            return await altogic.auth.resendVerificationEmail(email);
        },

        async googleLogin() {
            await altogic.auth.signInWithProvider('google');
        }
    }

    const user = {
        async get(token) {
            return await altogic.auth.getAuthGrant(token);
        },

        async getUser() {
            const res = await altogic.auth.getUser();
            fullLoadingStore.setLoading(false);
            loggedInUser.value = res;
        }
    }

    const product = {
        async getProducts() {
            return await altogic.db
                .model('products')                
                .get()
        }
    }

    return {
        auth,
        user,
        product,
        loggedInUser
    }
}
