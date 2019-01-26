<template>
  <v-app>
    <h1>{{ $store.state.test }}</h1>
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
