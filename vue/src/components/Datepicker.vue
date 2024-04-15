<template>
    <Datepicker
        :enableTimePicker="false"
        :class="class"
        v-model="value"
        :format="format"
        locale="vi"
        :format-locale="vi"
        cancelText=""
        selectText=""
        auto-apply
        keep-action-row
        :close-on-auto-apply="true"
        :day-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7','CN']"
        :month-names="['T2', 'T3', 'T4', 'T5', 'T6', 'T7','CN']"
        >
    </Datepicker>
</template>
<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import { vi } from 'date-fns/locale';
</script>
<script>
export default {
  props: {
    modelValue: {},
    class: { type: String },
    format: { type: String, default: 'dd-MM-yyyy' },
    position: { type: String, default: 'right' }
  },
  emits: ['update:modelValue'],
  data: function () {
    return {
      value: null
    }
  },
  computed: {},
  watch: {
    'value': function () {
      this.$emit('update:modelValue', this.value)
    },
    'modelValue': function () {
      this.value = this.modelValue
    }
  },
  created: function () {
    this.value = this.modelValue
  }
}
</script>