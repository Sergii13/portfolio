<template>
  <ModalApp>
    <template #popup-head>
      <div class="popup__head-row">
        <div class="popup__left">
          <div class="popup__title">Requers Contact Form</div>
        </div>
        <div class="popup__right">
          <div class="popup__socials socials-popup">
            <div class="socials-popup__title">Contacts :</div>
            <div class="socials-popup__items">
              <a href="" class="popup__link">
                <img src="@/assets/images/icons/01.png" alt="" />
              </a>
              <a href="" class="popup__link">
                <img src="@/assets/images/icons/02.png" alt="" />
              </a>
              <a href="" class="popup__link">
                <img src="@/assets/images/icons/03.png" alt="" />
              </a>
              <a href="" class="popup__link">
                <img src="@/assets/images/icons/04.png" alt="" />
              </a>
              <a href="" class="popup__link">
                <img src="@/assets/images/icons/05.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #popup-body>
      <div class="popup-main__row">
        <div class="popup-main__contacts">
          <h4>Personal contacts:</h4>
          <ul>
            <li>
              <p>
                Email:
                <a href="mailto:example@example.com">example@example.com</a>
              </p>
            </li>
            <li>
              <p>
                LinkTree:
                <a href="mailto:example@example.com">example.lt/</a>
              </p>
            </li>
            <li>
              <p>
                Office:
                <a href="mailto:example@example.com"> Example ave. 69 </a>
              </p>
            </li>
            <li>
              <p>
                Adress:
                <a href="mailto:example@example.com"> Example ave. 96</a>
              </p>
            </li>
          </ul>
        </div>
        <form action="#" class="popup__form form">
          <div class="form__item">
            <input
              autocomplete="off"
              type="text"
              name="form[]"
              placeholder="Name :"
              class="input form__input"
            />
          </div>
          <div class="form__item">
            <input
              autocomplete="off"
              type="text"
              name="form[]"
              placeholder="Email :"
              class="input form__input"
            />
          </div>
          <div class="form__item">
            <textarea
              autocomplete="off"
              type="text"
              name="form[]"
              data-error="Ошибка"
              placeholder="Enter your message"
              class="input form__input"
            >
          {{ props.textMessage }}
          </textarea
            >
          </div>
          <div class="form__item">
            <button class="form__button">Send Request</button>
          </div>
        </form>
      </div>
      <div class="popup-main__bottom">
        <div class="popup-main__bottom-title">Personal contacts:</div>
        <div class="popup-main__bottom-items">
          <div class="popup-main__bottom-item">
            Email:
            <a href=""> example@example.com </a>
          </div>
          <div class="popup-main__bottom-item">
            LinkTree: <a href=""> example.lt </a>
          </div>
          <div class="popup-main__bottom-item">
            Office:
            <a href=""> Example ave. 69 </a>
          </div>
          <div class="popup-main__bottom-item">
            Adress: <a href=""> Example ave. 96 </a>
          </div>
        </div>
      </div>
    </template>
  </ModalApp>
</template>

<script setup>
import ModalApp from '@/components/ModalApp.vue'
import {useTheme} from '@/composables/useTheme.js'

const props = defineProps({
  textMessage: {
    type: String,
    required: false,
  },
})
const {currentTheme} = useTheme()
</script>

<style lang="scss" scoped></style>
