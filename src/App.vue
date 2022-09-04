<template>
  <div class="masterContainer">
    <HeaderComponent />
    <router-view v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
  </div>
</template>
<script>
  
  import HeaderComponent from '@/components/HeaderComponent'
  export default {
    name: 'App',
    components: {
      HeaderComponent
    }
  }
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Condensed");
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.masterContainer {
  font-family: 'Roboto', sans-serif;
}

::-webkit-scrollbar {
   display: none;
}
</style>