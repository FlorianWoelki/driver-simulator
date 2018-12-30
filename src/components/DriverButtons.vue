<template>
  <div class="driver-buttons">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-btn
        slot="activator"
        color="success"
      >Call '{{ name }}' to You!</v-btn>
      <v-card>
        <v-card-title class="headline">Call '{{ name }}' to You!</v-card-title>
        <v-card-text>If you click on the Button 'Call' you will call {{ name }} to you.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            flat
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            color="green darken-1"
            flat
            @click="handleCallClicked"
          >Call</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
      disabled
      color="error"
    >Report driver</v-btn>
  </div>
</template>

<script>
export default {
  props: ['name'],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    handleCallClicked() {
      this.dialog = false;
      // TODO:
    }
  }
};
</script>
