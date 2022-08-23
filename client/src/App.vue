<template>
  <div>
    <HeaderComponent />
    <NavigationComponent />
    <router-view v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </Transition>
    </router-view>
    <FooterComponent />
  </div>
</template>
<script>
import NavigationComponent from '@/components/NavigationComponent'
import HeaderComponent from '@/components/HeaderComponent'
import FooterComponent from './components/FooterComponent.vue'
export default {
  name: 'App',
  components: {
    NavigationComponent,
    HeaderComponent,
    FooterComponent
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>