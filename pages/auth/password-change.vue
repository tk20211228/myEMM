<template>
  <div>
    Password Change

    <section class="section">
      {{ $auth.user.email }}
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>

<style></style>
