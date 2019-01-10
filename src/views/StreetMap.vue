<template>
  <div class="street-map">
    <LocationCard
      :pickupLocation="pickupLocation"
      :destinationLocation="destinationLocation"
    />

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

      <l-moving-marker
        :lat-lng="movingMarkerLocation"
        :duration="2000"
        :icon="icon"
      >
      </l-moving-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMarker } from 'vue2-leaflet';
import LMovingMarker from 'vue2-leaflet-movingmarker';
import LocationCard from '@/components/LocationCard';

import carMarkerUrl from '@/assets/car-marker.png';

function rand(n) {
  let max = n + 0.001;
  let min = n - 0.001;
  return Math.random() * (max - min) + min;
}

export default {
  name: 'StreetMap',
  components: {
    LMarker,
    LMovingMarker,
    LocationCard
  },
  data() {
    return {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      movingMarkerLocation: {
        lat: rand(51.505),
        lng: rand(-0.09)
      },
      haveUserLocation: false,
      zoom: 18,
      pickupLocation: {
        lat: 0,
        lng: 0,
        name: ''
      },
      destinationLocation: {
        lat: 0,
        lng: 0,
        name: ''
      },
      icon: L.icon({
        iconUrl: carMarkerUrl,
        iconSize: [38, 38]
      })
    };
  },
  methods: {
    chooseLocalLocation() {
      if (this.pickupLocation.address === '') {
        this.pickupLocation.lat = this.location.lat;
        this.pickupLocation.lng = this.location.lng;
      }
      fetch(
        'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
          this.location.lat +
          '&lon=' +
          this.location.lng
      )
        .then(data => data.json())
        .then(location => {
          const splittedAddress = location.display_name.split(',');
          const address =
            splittedAddress[1].trim() +
            ' ' +
            splittedAddress[0].trim() +
            ', ' +
            splittedAddress[2].trim();
          this.pickupLocation = {
            lat: this.location.lat,
            lng: this.location.lng,
            name: address
          };
        });
    },
    clickOnMap(event) {
      if (this.destinationLocation.address === '') {
        this.destinationLocation.lat = event.latlng.lat;
        this.destinationLocation.lng = event.latlng.lng;
      }
      fetch(
        'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
          event.latlng.lat +
          '&lon=' +
          event.latlng.lng
      )
        .then(data => data.json())
        .then(location => {
          const splittedAddress = location.display_name.split(',');
          const address =
            splittedAddress[1].trim() +
            ' ' +
            splittedAddress[0].trim() +
            ', ' +
            splittedAddress[2].trim();
          this.destinationLocation = {
            lat: event.latlng.lat,
            lng: event.latlng.lng,
            name: address
          };
        });
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
      },
      { timeout: 10000 }
    );

    setInterval(() => {
      this.movingMarkerLocation = {
        lat: rand(this.destinationLocation.lat),
        lng: rand(this.destinationLocation.lng)
      };
    }, 2000);
  }
};
</script>

<style>
.street-map .vue2leaflet-map {
  position: absolute !important;
}
</style>
