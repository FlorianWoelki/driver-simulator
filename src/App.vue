<!-- TODO: Refactor code!!! -->

<template>
  <v-app>
    <v-card>
      <v-card-title primary-title>
        <div>
          <p class="headline">Welcome to Driver Simulation 🚖</p>
          <div>This driver simulation project will simulate <br> how the Uber or Lyft transportation will work.</div>
        </div>
      </v-card-title>
      <v-form class="container">
        <v-text-field
          label="Your pickup location"
          required
        >
        </v-text-field>
        <v-text-field
          label="Your destination"
          required
        >
        </v-text-field>
        <v-btn
          depressed
          large
          color="info"
        >Search for driver</v-btn>
      </v-form>
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
      location: {
        lat: 51.505,
        lng: -0.09
      },
      haveUsersLocation: false,
      zoom: 18
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.haveUsersLocation = true;
      },
      () => {
        // Didn't give the location
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            this.location = {
              lat: location.latitude,
              lng: location.longitude
            };
          });
      }
    );
  }
};
</script>

<style lang="scss">
.v-card {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;

  .v-form {
    padding-top: 5px;

    .v-btn {
      margin-top: 15px;
    }
  }
}
</style>
