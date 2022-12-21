import { AppRootState } from '../../app/store'

export const cardPacks = (state: AppRootState) => state.packs.cardPacks
export const minCountCardsInPacks = (state: AppRootState) => state.packs.minCountCardsInPacks
export const maxCountCardsInPacks = (state: AppRootState) => state.packs.maxCountCardsInPacks
