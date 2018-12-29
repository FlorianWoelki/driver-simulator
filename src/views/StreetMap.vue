<template>
  <!-- TODO: Not able to surround l-map with div.. see if we can fix it.. -->
  <l-map
    :zoom="zoom"
    :center="location"
    @click="clickOnMap"
  >
    <LocationCard
      :pickupLocation="pickupLocation"
      :destinationLocation="destinationLocation"
    />

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
</template>

<script>
import { LMarker } from 'vue2-leaflet';
import LocationCard from '@/components/LocationCard';

export default {
  name: 'StreetMap',
  components: {
    LMarker,
    LocationCard
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
