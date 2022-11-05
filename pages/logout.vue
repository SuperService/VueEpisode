<script setup>
// const { auth } = useDeskree();
const { auth } = useAltogic();
const router = useRouter();
await auth.signOut();

onMounted(() => {
  window.location = "/login";
});
</script>
