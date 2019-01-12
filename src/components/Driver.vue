<template>
  <div class="driver">
    <l-moving-marker
      v-for="driver in getValidDrivers"
      :key="driver.id"
      :lat-lng="driver.location"
      :icon="icon"
      :duration="5000"
    >
    </l-moving-marker>
  </div>
</template>

<script>
import L from 'leaflet';
import LMovingMarker from 'vue2-leaflet-movingmarker';

import { config } from '@/config.js';
import carMarkerUrl from '@/assets/car-marker.png';

export default {
  props: ['startLocation'],
  components: {
    LMovingMarker
  },
  data() {
    return {
      drivers: [
        {
          id: 0,
          location: {
            lat: 0,
            lng: 0
          }
        }
      ],
      driversLatLngs: [],
      icon: L.icon({
        iconUrl: carMarkerUrl,
        iconSize: [38, 38]
      })
    };
  },
  methods: {
    setDriversLocation(index) {
      this.drivers.forEach(driver => {
        driver.location = {
          lat: this.driversLatLngs[index][0],
          lng: this.driversLatLngs[index][1]
        };
      });
    },
    getRandomRoute(latitude, longitude) {
      const startCoordinates = this.getRandomLocation(latitude, longitude);
      const endCoordinates = this.getRandomLocation(latitude, longitude);

      fetch(
        'https://api.openrouteservice.org/directions?api_key=' +
          config.API_KEY +
          '&coordinates=' +
          startCoordinates.lng +
          ',' +
          startCoordinates.lat +
          '|' +
          endCoordinates.lng +
          ',' +
          endCoordinates.lat +
          '&profile=driving-car&geometry=true&geometry_format=polyline'
      )
        .then(data => data.json())
        .then(jsonData => {
          jsonData.routes[0].geometry.forEach(geo => {
            const latLng = L.latLng(geo[0], geo[1]);
            this.driversLatLngs.push([latLng.lng, latLng.lat]);
          });

          this.setDriversLocation(0);
        });
    },
    getRandomLocation(startLat, startLng) {
      const maxLat = startLat + 0.01;
      const minLat = startLat - 0.01;
      const maxLng = startLng + 0.01;
      const minLng = startLng - 0.01;
      return {
        lat: Math.random() * (maxLat - minLat) + minLat,
        lng: Math.random() * (maxLng - minLng) + minLng
      };
    }
  },
  mounted() {
    this.getRandomRoute(this.startLocation.lat, this.startLocation.lng);

    let index = 0;
    setInterval(() => {
      index++;
      if (index == this.driversLatLngs.length) {
        index = 0;
      }
      this.setDriversLocation(index);
    }, 5000);
  },
  computed: {
    getValidDrivers() {
      return this.drivers.filter(driver => driver.location.lat != 0);
    }
  }
};
</script>
