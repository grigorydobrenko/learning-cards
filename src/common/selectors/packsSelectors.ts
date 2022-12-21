import { AppRootState } from '../../app/store'

export const cardPacks = (state: AppRootState) => state.packs.cardPacks
export const minCountCardsInPacks = (state: AppRootState) => state.packs.minCountCardsInPacks
export const maxCountCardsInPacks = (state: AppRootState) => state.packs.maxCountCardsInPacks
export const isMyPacks = (state: AppRootState) => state.packs.isMyPacks
export const search = (state: AppRootState) => state.packs.search
export const sort = (state: AppRootState) => state.packs.sort
export const pageCount = (state: AppRootState) => state.packs.pageCount
