<script setup>
const alerts = useAlertsStore();
const loading = ref(false);
const route = useRoute();
const altogic = useAltogic();
const accessToken = route.query.access_token;

definePageMeta({
  layout: "form-focus",
});
const form = reactive({
  email: "",
});

async function resendVerificationEmail() {
  loading.value = true;
  try {
    const res = await altogic.auth.resendVerificationEmail(form.email)
    console.log(res);
    if (res.errors) {
      alerts.error(
        res.errors.items[0].message
      );
      return;
    }
    // #ToDO
  } catch (error) {
    alerts.error(
      "Error logging in. Please ensure email and password are correct"
    );
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (accessToken) {
    const res = await altogic.user.get(accessToken);
    window.location = "/";
  }
})

</script>
<template>
  <div>Again Send Verify Code</div>
  <FormKit
      type="form"
      :config="{ validationVisibility: 'submit' }"
      @submit="resendVerificationEmail"
      :actions="false"
      v-model="form"
    >
      <FormKit
        type="text"
        label="Email"
        name="email"
        validation="required|email"
      />
      <AppButton class="btn-primary" :loading="loading">Resend Verify</AppButton>
    </FormKit>
</template>
