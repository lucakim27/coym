<template>
  <div>
    <HeaderComponent />
    <NavigationComponent />
    <router-view />
  </div>
</template>


<script>
import NavigationComponent from '@/components/NavigationComponent';
import HeaderComponent from '@/components/HeaderComponent';

export default {
  name: 'App',
  components: {
    NavigationComponent,
    HeaderComponent,
  }
}
</script>