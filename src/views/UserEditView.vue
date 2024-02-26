<script lang="ts">
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";

import axios from "axios";

import IconPerson from "../components/icons/person.vue";
import IconCross from "../components/icons/cross.vue";
import IconSnils from "../components/icons/snils.vue";
import IconShowMenu from "../components/icons/menuShow.vue";
import IconJob from "../components/icons/job.vue";
import IconPhone from "../components/icons/phone.vue";
import IconEmail from "../components/icons/email.vue";

import InputField from "../components/InputField.vue";
import InputMenu from "../components/InputMenu.vue";

export default {
  components: {
    IconPerson,
    IconCross,
    IconSnils,
    IconShowMenu,
    IconJob,
    IconPhone,
    IconEmail,
    InputField,
    InputMenu,
  },
  setup() {
    const formData = {
      name: ref(""),
      surname: ref(""),
      secondName: ref(""),
      snils: ref(""),
      job: ref<string | undefined>(""),
      phone: ref(""),
      email: ref(""),
    };
    const selectedOption = ref("");
    const options = ref([]);

    const rules = {
      name: { required },
      surname: { required },
      secondName: {},
      snils: { numeric, maxLength: maxLength(11), minLength: minLength(11) },
      job: { minLength: minLength(1) },
      phone: { required, numeric, maxLength: maxLength(11), minLength: minLength(11) },
      email: { required, email },
    };

    const $v = useVuelidate(rules, formData);

    $v.value.$touch();
    $v.value.job.$validate();

    const submitForm = async () => {
      let selectElement = document.querySelector("select")?.value;
      if (selectElement !== "" && selectElement !== undefined) {
        formData.job.value = selectElement;
        $v.value.job.$validate();
      }

      const InvalidFields = [];

      if ($v.value.$silentErrors.length == 0) {
        console.log("✅Форма валидна, можно отправлять данные!");
      } else {
        console.log("❌Форма содержит ошибки валидации!");

        const Fields = [
          "name",
          "surname",
          "secondName",
          "snils",
          "job",
          "phone",
          "email",
        ];

        for (const field of Fields) {
          if ($v.value[field]?.$silentErrors.length > 0) {
            InvalidFields.push(field);
          }
        }
      }

      try {
        const response = await axios.post("/validateData", InvalidFields);
        console.log("Ответ от сервера:", response.data);
      } catch (error) {
        console.error("Ошибка при отправке POST-запроса:", error);
      }
    };

    return {
      formData,
      $v,
      submitForm,
      selectedOption,
      options,
    };
  },
  methods: {
    cancelEvent() {
      alert("Событие ОТМЕНЫ 👀");
    },
    closeEvent() {
      alert("Событие ЗАКРЫТИЯ 👀");
    },
  },
};
</script>

<template>
  <div class="form">
    <div class="form__head">
      <h1 class="form__head__title">Заголовок</h1>

      <IconCross class="form__head__button" @click="closeEvent" />
    </div>

    <div class="form__header">Заголовок</div>

    <div class="form__data__wrapper">
      <div class="form__data">
        <IconPerson class="form__data__icon" />
        <InputField
          label="Имя"
          :required="true"
          :value="formData?.name"
          :validators="$v.formData?.name"
          placeholder="не указано"
          :v="$v.name"
        />
      </div>
      <div class="form__data">
        <IconPerson class="form__data__icon" />
        <InputField
          label="Фамилия"
          :required="true"
          :value="formData?.surname"
          :validators="$v.formData?.surname"
          placeholder="не указано"
          :v="$v.surname"
        />
      </div>
      <div class="form__data">
        <IconPerson class="form__data__icon" />
        <InputField
          label="Отчество"
          :required="false"
          :value="formData?.secondName"
          :validators="$v.formData?.secondName"
          placeholder="не указано"
          :v="$v.secondName"
        />
      </div>
      <div class="form__data">
        <IconSnils class="form__data__icon" />
        <InputField
          label="СНИЛС"
          :required="false"
          :value="formData?.snils"
          :validators="$v.formData?.snils"
          placeholder="не указано"
          :v="$v.snils"
        />
      </div>
      <div class="form__data">
        <IconJob class="form__data__icon" />
        <InputMenu
          label="Должность"
          :required="true"
          :value="formData?.job"
          :validators="$v.formData?.job"
          :v="$v.job"
        />
      </div>
    </div>
    <div class="form__header">Заголовок</div>

    <div class="form__data__wrapper">
      <div class="form__data">
        <IconPhone class="form__data__icon" />
        <InputField
          label="Телефон"
          :required="true"
          :value="formData?.phone"
          :validators="$v.formData?.phone"
          placeholder="не указано"
          :v="$v.phone"
        />
      </div>

      <div class="form__data">
        <IconEmail class="form__data__icon" />
        <InputField
          label="Электронная почта"
          :required="true"
          :value="formData?.email"
          :validators="$v.formData?.email"
          placeholder="не указано"
          :v="$v.email"
        />
      </div>
    </div>
    <div class="form__separator"></div>

    <form
      @submit.prevent="submitForm"
      style="display: flex; justify-content: flex-end"
      class="form__buttons"
    >
      <button
        type="button"
        class="form__buttons__cancel"
        style="margin-right: 10px"
        @click="cancelEvent"
      >
        Отмена
      </button>
      <button type="submit" class="form__buttons__submit">Button</button>
    </form>
  </div>
</template>

<style lang="less">
@import "/src/assets/less/style.less";

body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}

.form {
  margin: 2em;
  -webkit-box-shadow: 0 @spacer2 var(--spacer-layout4) 0 #0000000f;
  box-shadow: 0 @spacer2 var(--spacer-layout4) 0 #0000000f;

  padding-bottom: 0.1px;

  &__head {
    position: relative;
    width: 100%;
    height: 4em;
    background: #f4f4f5;

    display: -webkit-box;

    display: -ms-flexbox;

    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    &__title {
      position: relative;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;

      left: 2em;
      margin-bottom: 0;

      font-style: normal;
      font-weight: @main-font-weight-header;
      font-size: @main-font-size;

      text-align: left;
      color: var(--color-body);
    }
    &__button {
      position: relative;
      width: 2em;
      height: 2em;

      right: 1em;

      border-radius: var(--border-radius5);

      &:hover {
        background: var(--color-disabled);
        fill: var(--color-grey);
      }
    }
  }

  &__header {
    position: relative;
    width: var(--width-fixed1);
    height: var(--spacer6);
    left: var(--spacer-layout3);
    margin-bottom: var(--spacer-layout2);
    margin-top: var(--spacer-layout3);
  }

  &__separator {
    margin-top: var(--spacer-layout3);

    position: relative;
    width: 100%;
    height: 0px;
    margin: var(--spacer-layout6) 0 0 0;
    border: 1px solid var(--color-border);
  }

  &__data {
    min-width: 334px;
    width: -webkit-min-content;
    width: -moz-min-content;
    width: min-content;
    height: 52px;
    margin-top: var(--spacer-layout2);

    padding: 0 var(--spacer6);

    display: -ms-grid;

    display: grid;
    -ms-grid-columns: 1fr 0px 1fr;
    grid-template-columns: repeat(2, 1fr);
    -ms-grid-rows: 1fr 0px 1fr;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    &__icon {
      -ms-grid-row: 1;
      -ms-grid-row-span: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
      grid-area: 1 / 1 / 3 / 2;

      width: 24px;
      height: 52px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      max-width: 24px;
    }

    &__label {
      color: var(--color-primary);
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 4;
      grid-area: 1 / 2 / 2 / 6;

      position: relative;
      left: 14px;
      text-align: left;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: 1em;
      line-height: 1em;
      letter-spacing: 0.4px;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;
    }

    &__input {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 4;
      grid-area: 2 / 2 / 3 / 6;

      position: relative;
      width: 298px;
      height: 40px;
      left: 14px;
      top: -5px;

      -webkit-box-align: center;

      -ms-flex-align: center;

      align-items: center;
    }
  }

  &__data > *:nth-child(1) {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
  }

  &__data > *:nth-child(2) {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
  }

  &__data > *:nth-child(3) {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
  }

  &__data > *:nth-child(4) {
    -ms-grid-row: 3;
    -ms-grid-column: 3;
  }

  &__buttons {
    position: relative;
    width: 100%;
    right: 2em;
    margin-top: var(--spacer-layout2);
    margin-bottom: var(--spacer-layout2);
    margin-right: var(--spacer-layout2);

    display: -webkit-box;

    display: -ms-flexbox;

    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    &__cancel {
      height: var(--spacer6);

      font-family: "Roboto";
      font-style: normal;
      font-weight: 400;
      font-size: @spacer5;
      line-height: @btn-line-height;
      letter-spacing: @spacer1;

      color: var(--color-link);
      background: none;
      border: none;
    }
    &__submit {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: @btn-padding;

      position: relative;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      height: @btn-height;

      background: var(--color-primary);
      color: var(--color-white);
      border-radius: @btn-border-radius;
      border-color: var(--color-primary);
      margin-left: var(--spacer-layout1);

      &:hover {
        background: @color-primary-hover;
      }
    }
  }
}

@media (max-width: @viewport-s) {
  *,
  *::before,
  *::after {
    // font-size: @font-size;
    // font-size: calc(@font-size - 2pt);
  }
  .form {
    width: @width-fixed3;

    &__data {
      grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));

      &__icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
      }
      &__input {
        width: 250px;
      }
    }
  }
}

@media (max-width: @viewport-m) {
  .form {
    &__head {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    &__buttons {
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-align: baseline;
      -ms-flex-align: baseline;
      align-items: baseline;
    }
  }
}
</style>
