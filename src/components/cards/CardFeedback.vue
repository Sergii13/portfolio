<template>
  <div class="card-feedback">
    <div class="card-feedback__head">
      <div class="card-feedback__title">{{ feedback.name }}</div>
      <a :href="feedback.link" class="card-feedback__button">
        view <img :src="feedback.icon" alt="" />
      </a>
    </div>
    <div class="card-feedback__body">
      <p>
        {{ feedback.text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from 'vue'

const props = defineProps({
  feedback: {
    type: Object,
    required: true,
  },
})

const {feedback} = toRefs(props)
</script>

<style lang="scss" scoped>
.card-feedback {
  display: flex;
  flex-direction: column;
  gap: rem(15);
  // .card-feedback__head
  &__head {
    display: flex;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.7) -5.43%,
      rgba(255, 255, 255, 0) 87.71%
    );
    backdrop-filter: blur(35px);
    border-radius: 30px;
    gap: rem(10);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) -5.43%,
        rgba(255, 255, 255, 0) 87.71%
      );
    }
  }
  // .card-feedback__title
  &__title {
    flex: 1 1 auto;
    font-weight: 500;
    font-size: 20px;
    line-height: 115%; /* 23/20 */
    padding: rem(5) rem(0) rem(5) rem(22);
    max-width: calc(100% - 90px);
    word-break: break-word;
    @media (max-width: $pc) {
      font-size: rem(16);
    }
    @media (max-width: $mobileSmall) {
      font-size: 12px;
      line-height: 14px;
    }
  }
  // .card-feedback__button
  &__button {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) -5.43%,
      rgba(255, 255, 255, 0.5) 87.71%
    );
    backdrop-filter: blur(35px);
    height: 46px;
    border-radius: 30px;
    line-height: 17px;
    padding: rem(5) rem(16);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: rem(10);
    transition: all 0.3s cubic-bezier(0.5, 0.02, 0.13, 0.5);
    .dark-theme & {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) -5.43%,
        rgba(255, 255, 255, 0.05) 87.71%
      );
    }
    &:hover {
      box-shadow: 0 0 15px var(--main-color);
    }
    @media (max-width: $mobileSmall) {
      height: 30px;
      min-width: rem(115);
      font-size: rem(12);
    }
    img {
      width: 15px;
      height: 15px;
      flex-shrink: 0;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  // .card-feedback__body
  &__body {
    flex: 1 1 auto;
    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.7) -5.43%,
        rgba(255, 255, 255, 0) 87.71%
      ),
      linear-gradient(
        92.03deg,
        rgba(255, 255, 255, 0.21) -3.15%,
        rgba(255, 255, 255, 0.12) 51.71%
      );
    backdrop-filter: blur(35px);
    border-radius: 30px;
    padding: rem(36) rem(12) rem(36) rem(22);
    font-size: 20px;
    height: rem(215);
    text-overflow: ellipsis;
    line-height: 115%; /* 23/20 */
    border: solid 3px transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
    p {
      height: 100%;
      overflow: auto;
      padding-right: rem(10);
    }
    @media (max-width: $pc) {
      font-size: rem(16);
      max-height: rem(204);
      padding: rem(26) rem(12) rem(26) rem(15);
    }
    .dark-theme & {
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.001),
          rgba(255, 255, 255, 0.001)
        ),
        linear-gradient(
          92.03deg,
          rgba(255, 255, 255, 0.21) -3.15%,
          rgba(255, 255, 255, 0.12) 51.71%
        );
      @media (max-width: $tablet) {
        background-image: none;
      }
    }
    @media (max-width: $tablet) {
      background-image: none;
      backdrop-filter: blur(0px);
      padding: rem(0) rem(12) 0 rem(22);
      max-height: rem(95);
      border: none;
    }
    @media (max-width: $mobileSmall) {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>
