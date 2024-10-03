import { StateCreator } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type UserInputs = {
    phone: string,
    documentType: 'DNI' | 'RUC',
    documentNumber: string,
    acceptPrivacyPolicy: boolean,
    acceptCommunicationPolicy: boolean
}

export type UserApi = {
    name?: string,
    lastName?: string,
    birthDay?: string,
}

export type User = UserApi & UserInputs

export type Plan = {
    name: string,
    price: number,
    description: string[],
    age: number
}

/* Slice types */
export type Action = {
    resetUser: () => void,
    setUser: (user: User) => void,
    logout: () => void,
    login: () => void,
    setPlans: (plans: Plan[]) => void
}

export type State = {
    user: User,
    plans: Plan[],
    isAuthenticated: boolean
}

export type AppSlice = Action & State

export type ImmerStateCreator<T> = StateCreator<T, [["zustand/immer", never], never], [], T>;
