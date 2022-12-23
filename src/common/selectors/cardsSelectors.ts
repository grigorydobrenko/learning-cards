import { AppRootState } from '../../app/store'

export const cards = (state: AppRootState) => state.cards

export const packName = (state: AppRootState) => state.cards.packName

export const packUserId = (state: AppRootState) => state.cards.packUserId
