<template>
  <v-card class="location-card">
    <v-card-title primary-title>
      <div>
        <p class="headline">Welcome to Driver Simulation 🚖</p>
        <div>This driver simulation project will simulate <br> how the Uber or Lyft transportation will work.</div>
      </div>
    </v-card-title>
    <v-form class="container">
      <v-text-field
        :value="pickupLocation.name"
        label="Your pickup location"
        required
      >
      </v-text-field>

      <v-text-field
        :value="destinationLocation.name"
        label="Your destination"
        required
      >
      </v-text-field>

      <v-btn
        depressed
        large
        color="info"
        :disabled="pickupLocation.name == '' || destinationLocation.name == ''"
      >Search for driver</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LocationCard',
  props: ['pickupLocation', 'destinationLocation']
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
