<!-- TODO: Refactor code!!! -->

<template>
  <v-app>
    <v-card class="location-card">
      <v-card-title primary-title>
        <div>
          <p class="headline">Welcome to Driver Simulation 🚖</p>
          <div>This driver simulation project will simulate <br> how the Uber or Lyft transportation will work.</div>
        </div>
      </v-card-title>
      <v-form class="container">
        <v-text-field
          :value="pickupLocation.lat === 0 ? '' : (pickupLocation.lat + ', ' + pickupLocation.lng)"
          label="Your pickup location"
          required
        >
        </v-text-field>

        <v-text-field
          :value="destinationLocation.lat === 0 ? '' : (destinationLocation.lat + ', ' + destinationLocation.lng)"
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
      :zoom="zoom"
      :center="location"
      @click="clickOnMap"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>

      <l-marker
        v-if="haveUserLocation"
        :lat-lng="location"
        @click="chooseLocalLocation"
      >
        <!--<l-popup :content="'<div>Your location was selected!</div>'"></l-popup>-->
      </l-marker>

      <l-marker
        v-if="destinationLocation.lat != 0"
        :lat-lng="destinationLocation"
      >
      </l-marker>
    </l-map>

    <Menu />
  </v-app>
</template>

<script>
import { LMarker } from 'vue2-leaflet';
import Menu from '@/components/Menu';

export default {
  name: 'App',
  components: {
    LMarker,
    Menu
  },
  data() {
    return {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      haveUserLocation: false,
      zoom: 18,
      pickupLocation: {
        lat: 0,
        lng: 0
      },
      destinationLocation: {
        lat: 0,
        lng: 0
      }
    };
  },
  methods: {
    chooseLocalLocation() {
      this.pickupLocation = {
        lat: this.location.lat,
        lng: this.location.lng
      };
    },
    clickOnMap(event) {
      this.destinationLocation = {
        lat: event.latlng.lat,
        lng: event.latlng.lng
      };
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.haveUserLocation = true;
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
            this.haveUserLocation = true;
          });
      }
    );
  }
};
</script>

<style lang="scss">
.location-card {
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
