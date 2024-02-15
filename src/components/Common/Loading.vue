<template>
    <div class="loader" />
</template>
    
<script>
export default {
    name: 'Loading',
}
</script>
    
<style scoped lang="scss">
.loader{
  border: 10px solid #f3f3f3;
  border-top: 10px solid #158CBA;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
    