<template>
  <div class="driver-sidebar">
    <transition name="fade">
      <v-navigation-drawer
        floating
        permanent
        stateless
        value="true"
      >
        <p>Name: {{ this.driver.fullName }}</p>
        <p>Current Location: {{ this.driver.driverAddress }}</p>
        <p>Price: {{ this.driver.pricePerKm }}€/km</p>

        <DriverReliabilityChart />
      </v-navigation-drawer>
    </transition>
  </div>
</template>

<script>
import DriverReliabilityChart from '@/components/Driver/DriverReliabilityChart';

export default {
  name: 'DriverSidebar',
  props: ['driver'],
  components: {
    DriverReliabilityChart
  },
  methods: {
    updateCurrentDriverLocation() {
      fetch(
        'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
          this.driver.location.lat +
          '&lon=' +
          this.driver.location.lng
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
          this.driver.driverAddress = address;
        });
    }
  },
  mounted() {
    this.updateCurrentDriverLocation();
    setInterval(() => {
      this.updateCurrentDriverLocation();
    }, 10000);
  }
};
</script>

<style lang="scss">
.driver-sidebar {
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s;
  }

  p {
    font-size: 18px;
  }
}
</style>
