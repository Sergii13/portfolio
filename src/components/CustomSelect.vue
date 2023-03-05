<template>
  <div
    class="custom-select"
    :class="{open: open}"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div class="selected" @click="open = !open">
      <span class="custom-select__label">
        {{ selected.label }}
      </span>
      <span class="custom-select__icon-title">
        <img :src="selected.icon" alt="" />
      </span>
    </div>
    <div class="items" :class="{selectHide: !open}">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click=";(selected = option), (open = false), emit('input', option)"
      >
        {{ option.label }}
        <span class="custom-select__icon"
          ><img :src="option.icon" alt=""
        /></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, defineEmits, ref} from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: Number,
    required: false,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
  },
})
const selected = props.defaultValue
  ? props.options[props.defaultValue]
  : props.options.length > 0
  ? props.options[0]
  : null

const open = ref(false)

const emit = defineEmits(['input'])

onMounted(() => {
  emit('input', selected)
})
</script>

<style lang="scss" scoped>
.custom-select {
  color: inherit;
  position: relative;
  width: 124px;
  outline: none;
  height: 73px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #858894;
  border-right: 1px solid #858894;
  @media (max-width: em(1600)) {
    height: 55px;
  }
}

.custom-select .selected {
  cursor: pointer;
  font-size: 15px;
  line-height: 17px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
  user-select: none;
}

.custom-select.open {
  background: #c9d3f6;
  background-blend-mode: soft-light;
  .dark-theme & {
    background: linear-gradient(
      180.06deg,
      rgba(25, 30, 39, 0.5) 0.05%,
      rgba(26, 32, 41, 0.5) 105.88%
    );
  }
}

.custom-select .items {
  overflow: hidden;
  position: absolute;
  background: #c9d3f6;
  background-blend-mode: soft-light;
  border-radius: 0px 0px 10px 10px;
  left: 0;
  top: 100%;
  right: 0;
  z-index: 1;
  border: 1px solid #858894;
  margin: 0 -1px;
  .dark-theme & {
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      180.06deg,
      rgba(25, 30, 39, 0.5) 0.05%,
      rgba(26, 32, 41, 0.5) 105.88%
    );
  }
}
.custom-select__icon-title {
  width: 0.9375rem;
  height: 0.9375rem;
  flex-shrink: 0;
}
.custom-select .items {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 10px 21px;
  &.selectHide {
    display: none;
  }
}
.custom-select .items div {
  padding: 11px 10px;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  line-height: 17px;
  display: inline-flex;
  align-items: center;
  gap: 15px;
}

.custom-select .items div:hover {
  text-decoration: underline;
}
</style>
