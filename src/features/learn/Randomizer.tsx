import { CardType } from '../cards/cards-reducer'

export const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

const LearnPage = () => {
  // const [first, setFirst] = useState<boolean>(true)
  // // const [first, setFirst] = useState<boolean>(0);
  // const { cards } = useSelector((store: AppRootState) => store.cards)
  // const { id } = useParams()
  //
  // const [card, setCard] = useState<CardType>({
  //   _id: 'fake',
  //   cardsPack_id: '',
  //
  //   answer: 'answer fake',
  //   question: 'question fake',
  //   grade: 0,
  //   shots: 0,
  //   user_id: '',
  //   created: '',
  //   updated: '',
  // })
  //
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   console.log('LearnContainer useEffect')
  //
  //   if (first) {
  //     // dispatch(getCards(id))
  //     setFirst(false)
  //   }
  //
  //   console.log('cards', cards)
  //   if (cards.length > 0) setCard(getCard(cards))
  //
  //   return () => {
  //     console.log('LearnContainer useEffect off')
  //   }
  // }, [dispatch, id, cards, first])
  //
  // const onNext = () => {
  //   // setIsChecked(false)
  //
  //   if (cards.length > 0) {
  //     // dispatch
  //     setCard(getCard(cards))
  //   }
  //   // else {
  //   // }
  // }
  //
  // return <div>{/*<Button onClick={onNext}>next</Button>*/}</div>
}
