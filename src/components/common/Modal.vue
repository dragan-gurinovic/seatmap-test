<template>
  <div v-if="open" class="modal-container" @click="handleClose">
    <div @click.stop :class="modalWidth" class="max-h-[85vh] flex flex-col overflow-hidden max-w-full m-5 bg-white rounded">
      <div class="flex md:flex-col px-4">
        <div class="flex flex justify-end flex-1 pt-4">
          <feather
            type="x"
            size="22"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>
        <h2 class="order-[-1] md:order-[1] font-bold text-[24px] leading-[28px] md:text-[36px] md:leading-[39px]">{{ title }}</h2>
      </div>
      <div class="flex-1 overflow-auto pt-3 px-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: "Modal",
  props: {
    open: Boolean,
    title: String,
    width: {
      type: String,
      default: 'normal'
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const handleClose = () => {
      emit('close');
    };

    const modalWidth = computed(() => {
      if (props.width === 'small') {
        return 'w-[470px]'
      }
      return 'w-[670px]'
    })

    return {
      handleClose,
      modalWidth
    }
  },
}
</script>

<style lang="scss" scoped>
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 0;
}
</style>
