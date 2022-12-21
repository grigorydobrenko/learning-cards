import { AppRootState } from '../../app/store'

export const cardPacks = (state: AppRootState) => state.packs.cardPacks
export const min = (state: AppRootState) => state.packs.min
export const max = (state: AppRootState) => state.packs.max
export const isMyPacks = (state: AppRootState) => state.packs.isMyPacks
export const search = (state: AppRootState) => state.packs.packName
export const sort = (state: AppRootState) => state.packs.sort
export const pageCount = (state: AppRootState) => state.packs.pageCount
export const userId = (state: AppRootState) => state.packs.userId
