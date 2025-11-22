import { create } from 'zustand'
export const useAuth = create(() => ({ user: null, login: () => {}, logout: () => {} }))
