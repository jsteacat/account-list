import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { IAccount, IAccountForm } from '../types.ts'

export const useAccounts = defineStore('accounts', () => {
    const forms = ref<IAccountForm[]>([])
    const accounts = computed<IAccount[]>(() => {
        return forms.value.map(({ id, ...form }) => ({
            ...form,
            marks: form.marks.length > 0 ? form.marks.replace(/\s+/g, '').split(';') : [],
        }))
    })

    function addAccountForm() {
        forms.value.push({
            id: uuidv4(),
            marks: '',
            type: '',
            login: '',
            password: '',
        })
    }

    function updateAccountForm(updatedForm: IAccountForm) {
        const index = forms.value.findIndex(({ id }) => id === updatedForm.id);
        if (index !== -1) {
            forms.value[index] = {
                ...forms.value[index],
                ...updatedForm,
            };
        }
    }

    function removeAccountForm(formId: string) {
        const index = forms.value.findIndex(({ id }) => id === formId);
        if (index !== -1) {
            forms.value.splice(index, 1);
        }
    }

    return {
        forms,
        accounts,
        addAccountForm,
        updateAccountForm,
        removeAccountForm,
    }
})
