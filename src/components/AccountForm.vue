<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'
import { NInput, NSelect } from 'naive-ui'
import { AccountTypes, type IAccountForm } from '../types.ts'

const emit = defineEmits(['update', 'delete'])

const props = defineProps({
  form: {
    type: Object as PropType<IAccountForm>,
    required: true,
  },
})

const localForm = ref(props.form)

function createTypeOptions(): { label: string; value: string }[] {
  const options = []

  for (let type in AccountTypes) {
    if (AccountTypes.hasOwnProperty(type)) {
      options.push({ label: AccountTypes[type as keyof typeof AccountTypes], value: type })
    }
  }

  return options
}

function updateType(value: keyof typeof AccountTypes) {
  if (value === 'ldap') localForm.value.password = ''
}

watch(localForm.value, (newVal) => {
  emit('update', newVal)
})
</script>

<template>
  <textarea v-model="localForm.marks" maxlength="30" />
  <n-select v-model:value="localForm.type" :options="createTypeOptions()" @update:value="updateType($event)" />
  <n-input v-model:value="localForm.login" type="text" maxlength="100" placeholder="" />
  <n-input
      v-model:value="localForm.password"
      type="password"
      :disabled="localForm.type === 'ldap'"
      maxlength="100" show-password-on="click"
      placeholder=""
  />
  <button class="delete-button" @click="$emit('delete', localForm.id)">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" class="delete-icon">
      <g fill="none">
        <path d="M6.5 7v4a.5.5 0 0 0 1 0V7a.5.5 0 0 0-1 0zM9 6.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM10 4h3a.5.5 0 0 1 0 1h-.553l-.752 6.776A2.5 2.5 0 0 1 9.21 14H6.79a2.5 2.5 0 0 1-2.485-2.224L3.552 5H3a.5.5 0 0 1 0-1h3a2 2 0 1 1 4 0zM8 3a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zM4.559 5l.74 6.666A1.5 1.5 0 0 0 6.79 13h2.42a1.5 1.5 0 0 0 1.49-1.334L11.442 5H4.56z" fill="currentColor"></path>
      </g>
    </svg>
  </button>
</template>

<style>
textarea {
  height: 22px;
  resize: none;
  overflow: hidden;
  outline: none;
  border: 1px solid #e0e0e5;
  border-radius: 3px;
  padding: 8px 12px;
}

textarea:hover,
textarea:focus {
  border-color: #36ad6a;
}

.n-input,
.n-base-selection,
.n-base-selection .n-base-selection-label {
  height: 40px;
}

.n-input .n-input__input-el {
  caret-color: #1d1d1d;
}

.delete-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.delete-icon {
  width: 24px;
  height: 24px;
  color: #767676;
}
</style>
