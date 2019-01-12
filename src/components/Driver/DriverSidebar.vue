<template>
  <div class="driver-sidebar">
    <transition name="fade">
      <v-card v-if="driver.selected" class="d-inline-block elevation-12 pa-3">
        <v-navigation-drawer
          floating
          permanent
          stateless
          value="true"
        >
          <h1 class="headline">Information about Driver</h1>
        </v-navigation-drawer>
      </v-card>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DriverSidebar',
  props: ['driver'],
  data() {
    return {
      //
    };
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

  .v-card {
    z-index: 9999;
    margin: 100px 0 0 25px;

    h1 {
      color: gray;
    }
  }
}
</style>
