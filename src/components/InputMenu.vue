<template>
  <div class="form__data__label">{{ label }}{{ required ? "*" : "" }}</div>
  <div class="form__data__input">
    <!-- <input
      type="text"
      :placeholder="placeholder"
      v-model="value"
      @blur="validate"
      :name="label"
      @input="handleInput"
    /> -->
    <select v-model="selectedOption" @input="handleInput" :name="label">
      <option value="" disabled hidden>не указано</option>
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";

import axios from "axios";

export default {
  props: {
    label: String,
    value: Object,
    required: Boolean,
    validators: Object,
    v: Object,
  },
  setup(props) {
    const selectedOption = ref("");
    const options = ref([]);


    const validateField = () => {
      validate();
    };


    onMounted(async () => {
      try {
        const response = await axios.get("/getJobs");
        options.value = response.data.jobs;
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    });

    return {
      validateField,
      selectedOption,
      options,
    };
  },
  methods: {
    handleInput(e) {
      this.v.$validate();
    },
  },
};
</script>

<style lang="less"></style>
