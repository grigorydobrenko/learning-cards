import { AppRootState } from '../../app/store'

export const cardPacks = (state: AppRootState) => state.packs.cardPacks
export const min = (state: AppRootState) => state.packs.min
export const max = (state: AppRootState) => state.packs.max
export const isMyPacks = (state: AppRootState) => state.packs.isMyPacks
export const search = (state: AppRootState) => state.packs.packName
export const sort = (state: AppRootState) => state.packs.sortPacks
export const packName = (state: AppRootState) => state.packs.packName
export const user_id = (state: AppRootState) => state.packs.user_id
export const minCardsCount = (state: AppRootState) => state.packs.minCardsCount
export const maxCardsCount = (state: AppRootState) => state.packs.maxCardsCount
