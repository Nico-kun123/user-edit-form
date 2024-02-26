<template>
  <div class="form__data__label">{{ label }}{{ required ? "*" : "" }}</div>
  <div class="form__data__input">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="value"
      @blur="validate"
      :name="label"
      @input="handleInput"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";

import IconPerson from "../components/icons/person.vue";
import IconCross from "../components/icons/cross.vue";

export default {
  props: {
    icon: String,
    label: String,
    required: Boolean,
    value: Object,
    validators: Object,
    placeholder: String,
    v: Object,
  },
  setup(props) {
    const value = ref(props.value);
    const { validate } = useVuelidate(props.validators, { value });

    const validateField = () => {
      validate();
    };

    return {
      value,
      validateField,
    };
  },
  methods: {
    handleInput(e) {
      if (this.v.$silentErrors.length > 0) {
        let labels = document.querySelectorAll(".form__data__label");

        let isRequired = this.required == true ? "*" : "";

        labels.forEach((label) => {
          if (label.textContent == this.label + isRequired) {
            label.style.color = "red";
          }
        });
      } else {
        let labels = document.querySelectorAll(".form__data__label");

        let isRequired = this.required == true ? "*" : "";
        labels.forEach((label) => {
          if (label.textContent == this.label + isRequired) {
            label.style.color = "#007AFF";
          }
        });
      }
    },
  },
};
</script>

<style lang="less"></style>
