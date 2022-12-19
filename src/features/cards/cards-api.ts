import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsApi = {
  getCards() {
    return instance.get('/cards/card', {
      params: {
        // cardAnswer: 'english',
        // cardQuestion: 'english',
        cardsPack_id: '622b52e929bee9000469654f',
        // min: 1,
        // max: 4,
        // sortCards: '0grade',
        // page: 1,
        // pageCount: 7,
      },
    })
  },
}

// type CardsPayloadType = {
//     ?cardAnswer=english // не обязательно
//     &cardQuestion=english // не обязательно
//     &cardsPack_id=5eb6a2f72f849402d46c6ac7
//     &min=1 // не обязательно
//     &max=4 // не обязательно
//     &sortCards=0grade // не обязательно
//     &page=1 // не обязательно
//     &pageCount=7 // не обязательно
//
// }
