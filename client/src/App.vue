<template>
  <div>
    <HeaderComponent />
    <NavigationComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>
<script>
import NavigationComponent from '@/components/NavigationComponent';
import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';

export default {
  name: 'App',
  components: {
    NavigationComponent,
    HeaderComponent,
    FooterComponent
  }
}
</script>