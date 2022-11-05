<script setup>
const route = useRoute();
const alerts = useAlertsStore();

const { auth } = useDeskree();

const altogic = useAltogic();

definePageMeta({
  layout: "form-focus",
});

if (route.query.access_token) {
  const res = await altogic.user.get(route.query.access_token);
  if (!res.errors) {
    await altogic.user.getUser();
  }
}

const form = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
async function handleLogin() {
  loading.value = true;
  try {
    const res = await altogic.auth.signIn(form);
    if (res.errors) {
      alerts.error(
        res.errors.items[0].message
      );
      return;
    }
    // await auth.login(form);
    useRouter().push("/");
  } catch (err) {
    alerts.error(
      "Error logging in. Please ensure email and password are correct"
    );
  } finally {
    loading.value = false;
  }
}

</script>
<template>
  <div>
    <h2 class="card-title mb-5">Login</h2>
    <a class="btn mb-5 w-full" href="https://c2-europe.altogic.com/_auth/6358d60c6e23b2d594f76481/google">
      Google Login
    </a>
    <FormKit
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="handleLogin"
      :actions="false"
      v-model="form"
    >
      <FormKit
        type="text"
        label="Email"
        name="email"
        validation="required|email"
      />

      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required"
      />
      <AppButton class="btn-primary" :loading="loading">Login</AppButton>
    </FormKit>
  </div>
</template>
