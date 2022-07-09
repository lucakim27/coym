<template>
  <div>
    <ModalComponent />
    <HeaderComponent />
    <NavigationComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>


<script>
import FooterComponent from '@/components/FooterComponent';
import NavigationComponent from '@/components/NavigationComponent';
import HeaderComponent from '@/components/HeaderComponent';
import ModalComponent from '@/components/ModalComponent';

export default {
  name: 'App',
  components: {
    FooterComponent,
    NavigationComponent,
    HeaderComponent,
    ModalComponent
  }
}
</script>