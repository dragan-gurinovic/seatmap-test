<template>
  <Modal
    :open="!!data"
    @close="handleClose"
  >
    <div class="flex flex-col items-center">
      <h2 class="font-bold text-3xl -mt-4 mb-5">{{ data?.seatDesignator }} Economic</h2>

      <div class="flex">
        <div class="w-32 mr-10">
          <img src="../assets/images/seat-details.svg" alt="">
        </div>
        <ul class="py-6 px-4 list-disc">
          <li v-for="characteristic in data?.seatCharacteristics">{{characteristic.value}}</li>
        </ul>
      </div>

      <div v-if="data.seatPaxAmount" class="text-center mt-5">
        <p class="font-bold text-4xl">{{data.seatPaxAmount[0].price.net}} {{data.seatPaxAmount[0].price.currency}}</p>
      </div>

      <div class="flex items-center py-6">
        <button class="rounded bg-[#6b7280] mx-4 text-white hover:opacity-90 px-6 py-1.5" @click="handleSelect">Select</button>
        <button class="rounded hover:bg-gray-100 mx-4 px-6 py-1.5" @click="handleClose">Cancel</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/common/Modal.vue";

export default {
  name: "SeatModal",
  components: { Modal },
  props: {
    data: Object,
  },
  emits: ['close', 'select'],
  setup(props, { emit }) {
    const handleClose = () => {
      emit('close')
    };
    const handleSelect = () => {
      emit('select')
    };

    return {
      handleSelect,
      handleClose,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
