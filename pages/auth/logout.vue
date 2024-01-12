<template>
  <div>
  </div>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('auth-firebase/logout')
  }

}
</script>

<style>

</style>
