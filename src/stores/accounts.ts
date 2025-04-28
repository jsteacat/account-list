import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccounts = defineStore('accounts', () => {
    const list = ref([])

    return {
        list,
    }
})
