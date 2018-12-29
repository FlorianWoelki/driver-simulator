<template>
  <v-app>
    <router-view />
    <Menu />
  </v-app>
</template>

<script>
import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    Menu
  }
};
</script>
