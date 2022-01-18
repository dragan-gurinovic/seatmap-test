<template>
  <div>
    <div class="flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl my-4">Seat Map</h1>
      <div class="flex w-min flex-col items-center">
        <template v-for="(row, i) in rows">
          <div v-if="exitPositions.includes(row.number)" class="flex justify-between w-full p-1 mb-2">
            <span class="font-bold">Exit</span>
            <span class="font-bold">Exit</span>
          </div>

          <div class="flex">
            <div v-for="(seat, j) in row.seats" class="flex items-center mx-1 mb-2">
              <div class="flex flex-col items-center">
                <div class="flex w-full">
                  <span v-if="i === 0" class="pb-1 text-center w-9">{{seat.column}}</span>
                </div>
                <div class="flex items-center">
                  <div class="w-9 h-10">
                    <img v-if="seat.seatAvailability ==='Reserved'" class="w-full h-full" src="../assets/images/eco-seat-not-available.svg" alt="">
                    <div @click="selectSeat(i, j)" v-if="seat.seatAvailability ==='Available'" class="cursor-pointer">
                      <img v-if="seat.seatPaxAmount" class="w-full h-full" src="../assets/images/eco-seat-paying.svg" alt="">
                      <img v-else class="w-full h-full" src="../assets/images/eco-seat-available.svg" alt="">
                    </div>
                  </div>
                  <p class="pl-3 pr-1" v-if="j === 2 || j === 6">
                    {{row.number}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <SeatModal
      :data="activeSeat"
      @select="reverseSeat"
      @close="unSelectSeat"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import SeatModal from "@/components/SeatModal.vue";
import data from "../data/seat_map.json";

export default defineComponent({
  components: { SeatModal },
  setup() {
    const rows = ref([]);
    const exitPositions = ref([]);

    const activeSeat = ref(null);

    const selectSeat = (rowIndex, columnIndex) => {
      activeSeat.value = rows.value[rowIndex]?.seats[columnIndex];
    };

    const unSelectSeat = () => {
      activeSeat.value = null;
    };

    const reverseSeat = () => {
      if (activeSeat.value) {
        rows.value = rows.value.map((row) => {
          row.seats = row.seats?.map((seat) => {
            if (seat.seatDesignator === activeSeat.value.seatDesignator) {
              seat = {
                ...seat,
                seatAvailability: 'Reserved'
              };
            }
            return seat;
          })
          return row;
        });
      }
      unSelectSeat();
    };

    onMounted(() => {
      rows.value = data.deck[0].rows;
      exitPositions.value = data.deck[0].deckCharacteristics.exitRowPosition.rowPositions.map((position) => position.first);
    });

    return {
      rows,
      exitPositions,
      activeSeat,
      selectSeat,
      unSelectSeat,
      reverseSeat
    };
  }
})
</script>
