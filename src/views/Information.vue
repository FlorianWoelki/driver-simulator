<template>
  <div class="information container">
    <v-data-table
      :headers="headers"
      :items="driver"
      item-key="name"
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props"
      >
        <tr @click="props.expanded = !props.expanded">
          <td>
            <v-avatar
              :size="65"
              color="grey lighten-4"
            >
              <img
                :src="props.item.avatar"
                alt="avatar"
              >
            </v-avatar>
            {{ props.item.name }}
          </td>
          <td class="text-xs-right">{{ props.item.distance }}</td>
          <td class="text-xs-right">{{ props.item.price }}€</td>
          <td class="text-xs-right">{{ props.item.car }}</td>
        </tr>
      </template>
      <template
        slot="expand"
        slot-scope="props"
      >
        <v-card flat>
          <v-card-text>
            <DriverButtons :name="props.item.name" />
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import DriverButtons from '@/components/DriverButtons';

export default {
  name: 'Information',
  components: {
    DriverButtons
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Distance', value: 'distance', align: 'right' },
        { text: 'Price (€ / minute)', value: 'price', align: 'right' },
        { text: 'Car', value: 'car', align: 'right' }
      ],
      driver: [
        {
          value: false,
          name: 'Peter Gregon',
          avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
          distance: 3.75,
          price: 0.75,
          car: 'Mercedes'
        },
        {
          value: false,
          name: 'Alex Grosh',
          avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
          distance: 1.09,
          price: 1.75,
          car: 'Bentley'
        },
        {
          value: false,
          name: 'Ryan McLey',
          avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
          distance: 2,
          price: 0.9,
          car: 'Mercedes'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.information {
  .v-avatar {
    margin: 10px;
  }
}
</style>
