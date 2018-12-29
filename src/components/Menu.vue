<template>
  <div class="menu">
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>

      <v-btn
        fab
        dark
        small
        color="blue lighten-2"
        v-for="menuItem in menuItems"
        :key="menuItem"
      >
        <v-icon>{{ menuItem }}</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      direction: 'top',
      fab: false,
      hover: false,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      menuItems: ['dashboard']
    };
  }
};
</script>

<style lang="scss">
.menu {
  z-index: 999;

  .v-speed-dial {
    position: absolute;
  }
  .v-btn--floating {
    position: relative;
  }
}
</style>
