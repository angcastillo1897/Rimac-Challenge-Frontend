import { ImmerStateCreator, AppSlice, State, User, Plan } from '../types/types.ts'

const initialState: State = {
    user: {
        name: '',
        lastName: '',
        birthDay: '',
        phone: '',
        documentType: 'DNI',
        documentNumber: '',
        acceptPrivacyPolicy: false,
        acceptCommunicationPolicy: false
    },
    plans: [],
    isAuthenticated: false
}


export const createAppSlice: ImmerStateCreator<AppSlice> = (set, get) => ({
    ...initialState,
    /* actions */
    resetUser: () => set((state) => {
        state.user = initialState.user
    }),
    setUser: (user: User) => set((state) => {
        Object.assign(state.user, user)
    }),
    setPlans: (plans: Plan[]) => set((state) => {
        state.plans = plans
    }),
    login: () => set((state) => {
        state.isAuthenticated = true
    }),
    logout: () => {
        set((state) => {
            state.isAuthenticated = false
        })
        get().resetUser()
        get().setPlans([])
    }
})

