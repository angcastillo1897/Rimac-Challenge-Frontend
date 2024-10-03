
import { create } from 'zustand'
import { createAppSlice } from './appSlice'
import { devtools } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import { AppSlice } from '../types/types';

export const useStore = create<AppSlice>()(
    immer(
        devtools((...args) => ({
            ...createAppSlice(...args),
        }))
    )
);