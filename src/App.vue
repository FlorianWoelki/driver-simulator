<template>
  <v-app>
    <l-map
      :zoom=13
      :center="[47.413220, -1.219482]"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker :lat-lng="[47.413220, -1.219482]"></l-marker>
    </l-map>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data() {
    return {
      //
    };
  }
};
</script>
