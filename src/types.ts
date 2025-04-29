export enum AccountTypes {
    local = 'Локальный',
    ldap = 'LDAP',
}

export interface IAccount {
    marks: string[];
    type: string;
    login: string;
    password: string;
}

export interface IAccountForm extends Omit<IAccount, 'marks'> {
    id: string;
    marks: string;
}
