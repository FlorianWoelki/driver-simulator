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
        <!-- TODO: Make it easier, no nested if in :value -->
        <v-text-field
          :value="pickupLocation === '' ? '' : (pickupLocation.lat + ', ' + pickupLocation.lng)"
          label="Your pickup location"
          required
        >
        </v-text-field>
        
        <!-- TODO: Make it easier, no nested if in :value -->
        <v-text-field
          :value="destinationLocation === '' ? '' : (destinationLocation.lat + ', ' + destinationLocation.lng)"
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
        v-if="destinationLocation != ''"
        :lat-lng="destinationLocation"
      >
        <!-- TODO: Go to data and look at object -->
      </l-marker>
    </l-map>
  </v-app>
</template>

<script>
import { LMarker } from 'vue2-leaflet';

export default {
  name: 'App',
  components: {
    LMarker
  },
  data() {
    return {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      haveUserLocation: false,
      zoom: 18,
      pickupLocation: '', // TODO: Fix and initialize with normal object.. not working right now caused by the text field
      destinationLocation: '' // TODO: Fix and initialize with normal object.. not working right now caused by the text field
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
