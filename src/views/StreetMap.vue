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
        v-if="movingMarkerLocation.lat != 0"
        :lat-lng="movingMarkerLocation"
        :duration="2000"
        :icon="icon"
      >
      </l-moving-marker>

      <l-polyline
        :lat-lngs="polyline.latLngs"
        :color="polyline.color"
        :fill="false"
      >
      </l-polyline>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet';
import { LMarker, LPolyline } from 'vue2-leaflet';
import LMovingMarker from 'vue2-leaflet-movingmarker';
import LocationCard from '@/components/LocationCard';

import { config } from '@/config.js';
import carMarkerUrl from '@/assets/car-marker.png';

export default {
  name: 'StreetMap',
  components: {
    LMarker,
    LMovingMarker,
    LPolyline,
    LocationCard
  },
  data() {
    return {
      location: {
        lat: 51.505,
        lng: -0.09
      },
      movingMarkerLocation: {
        lat: 0,
        lng: 0
      },
      polyline: {
        latLngs: [],
        color: 'green'
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

          fetch(
            'https://api.openrouteservice.org/directions?api_key=' +
              config.API_KEY +
              '&coordinates=' +
              this.pickupLocation.lng +
              ',' +
              this.pickupLocation.lat +
              '|' +
              this.destinationLocation.lng +
              ',' +
              this.destinationLocation.lat +
              '&profile=driving-car&geometry=true&geometry_format=polyline'
          )
            .then(data => data.json())
            .then(jsonData => {
              this.polyline.latLngs = [];
              jsonData.routes[0].geometry.forEach(geo => {
                const latLng = L.latLng(geo[0], geo[1]);
                this.polyline.latLngs.push([latLng.lng, latLng.lat]);
              });

              this.movingMarkerLocation = {
                lat: this.polyline.latLngs[0][0],
                lng: this.polyline.latLngs[0][1]
              };

              let i = 1;
              setInterval(() => {
                if (i == this.polyline.latLngs.length) {
                  i = 0;
                }
                this.movingMarkerLocation = {
                  lat: this.polyline.latLngs[i][0],
                  lng: this.polyline.latLngs[i][1]
                };
                i++;
              }, 3000);
            });
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
  }
};
</script>

<style>
.street-map .vue2leaflet-map {
  position: absolute !important;
}
</style>
