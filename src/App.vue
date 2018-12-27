<template>
  <v-app>
    <v-card class="input-card">
      <v-card-title primary-title>
        <div>
          <p class="headline">Welcome to Driver Simulation</p>
          <div>This driver simulation project will simulate <br> how the Uber or Lyft transportation will work.</div>
        </div>
      </v-card-title>
    </v-card>
    <l-map
      :zoom=zoom
      :center=location
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-marker
        v-if="haveUsersLocation"
        :lat-lng=location
      >
        <l-popup :content="'<div>Hello World</div>'"></l-popup>
      </l-marker>
    </l-map>
  </v-app>
</template>

<script>
import { LMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'App',
  components: {
    LMarker,
    LPopup
  },
  data() {
    return {
      zoom: 13,
      location: [51.505, -0.09],
      haveUsersLocation: false
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.location = [position.coords.latitude, position.coords.longitude];
        this.haveUsersLocation = true;
      },
      () => {
        // Didn't give the location
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            this.location = [location.latitude, location.longitude];
            this.haveUsersLocation = true;
          });
      }
    );
  }
};
</script>

<style>
.input-card {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}
</style>
