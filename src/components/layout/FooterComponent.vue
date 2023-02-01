<script setup>
import FooterIcon from '@/assets/images/icons/footer-icon.svg'
const isDarkTheme = document.body.classList.contains('dark-theme')
</script>
<template>
  <footer class="footer">
    <div class="footer__row">
      <div class="footer__copy">
        <span class="footer__icon">
          <img :src="FooterIcon" alt="Icon" />
        </span>
        Copyright All rights reserved 2022
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 30px 0;
  overflow: hidden;
  // .footer__row
  &__row {
    display: flex;
    justify-content: center;
  }
  // .footer__copy
  &__copy {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: #3a3a3a;
    position: relative;
    padding: 0 15px;
    &::after,
    &::before {
      content: '';
      position: absolute;
      background: var(--border-color);
      width: 100vw;
      height: 1px;
      top: 50%;
      left: 100%;
    }
    &::before {
      left: auto;
      right: 100%;
    }
  }
  // .footer__icon
  &__icon {
    width: 13px;
    flex-shrink: 0;
  }
}
</style>
