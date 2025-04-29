<script setup lang="ts">
import AccountForm from './components/AccountForm.vue'
import { useAccounts } from './stores/accounts.ts'

const {
  forms,
  addAccountForm,
  updateAccountForm,
  removeAccountForm,
} = useAccounts()
</script>

<template>
  <div class="accounts-page">
    <div class="title-container">
      <h1 class="title">Учетные записи</h1>
      <button class="add-button" @click="addAccountForm">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" class="plus-icon">
          <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </g>
        </svg>
      </button>
    </div>
    <div class="description-container">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16" class="question-icon">
        <g fill="none">
          <path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 1a5 5 0 1 0 0 10A5 5 0 0 0 8 3zm0 7.5A.75.75 0 1 1 8 12a.75.75 0 0 1 0-1.5zm0-6a2 2 0 0 1 2 2c0 .73-.212 1.14-.754 1.708l-.264.27C8.605 8.87 8.5 9.082 8.5 9.5a.5.5 0 0 1-1 0c0-.73.212-1.14.754-1.708l.264-.27C8.895 7.13 9 6.918 9 6.5a1 1 0 0 0-2 0a.5.5 0 0 1-1 0a2 2 0 0 1 2-2z" fill="currentColor"></path>
        </g>
      </svg>
      <div class="description">
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </div>
    </div>
    <div v-if="forms.length > 0" class="accounts-list">
      <div class="header">Метки</div>
      <div class="header">Тип записи</div>
      <div class="header">Логин</div>
      <div class="header">Пароль</div>
      <div class="header"></div>
      <AccountForm
          v-for="form in forms"
          :key="form.id"
          :form="form"
          @update="updateAccountForm($event)"
          @delete="removeAccountForm($event)"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.accounts-page {
  width: 980px;
  margin: 0 auto;
  padding: 1rem 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #1d1d1d;
}

.title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.add-button {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.plus-icon,
.question-icon {
  width: 24px;
  height: 24px;
  color: #767676;
}

.description-container {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 8px;
  background-color: #e1ebef;
}

.description {
  font-size: 14px;
  color: #767676;
}

.accounts-list {
  display: grid;
  grid-template-columns: 2fr 1.5fr 2fr 2fr 24px;
  gap: 1rem;
  margin-top: 1rem;
}

.header {
  font-size: 14px;
  color: #767676;
}
</style>
