import React, { ChangeEvent, useEffect, useState } from 'react'

import { Box, Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import { Link, useParams } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { BpRadio } from '../../common/components/ui/Radio/Radio'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { cardsSelector } from '../../common/selectors'
import { getCard } from '../../common/utils/randomizer'
import { CardType, getCardsTC, rateCardTC } from '../cards/cards-reducer'

import s from './Learn.module.css'
import { MyLoader } from './Skeleton'

const Learn = () => {
  const [showAnswer, setShowAnswer] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const packName = useAppSelector(cardsSelector.packName)
  const cards = useAppSelector(cardsSelector.cards)

  const dispatch = useAppDispatch()

  const [first, setFirst] = useState<boolean>(true)

  const { pack_id } = useParams()

  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(pack_id))
      setFirst(false)
    }
    if (cards.cards.length > 0) setCard(getCard(cards.cards))
    setLoading(false)
  }, [dispatch, pack_id, cards, first])

  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const formik = useFormik({
    initialValues: {
      picked: value,
    },
    validate: (values: any) => {
      const errors: any = {}

      if (!values.picked) {
        errors.picked = 'Pick your answer'
      }

      return errors
    },
    onSubmit: (values: any) => {
      console.log(values)
      if (cards.cards.length > 0) {
        dispatch(rateCardTC(values.picked, card._id))
        setCard(getCard(cards.cards))
      }
      formik.resetForm()
      setValue('')
      setShowAnswer(false)
      setLoading(true)
    },
  })

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
      >
        <Link className={s.profileLink} to={PATH.PACKS}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Back to pack list</span>
        </Link>

        <Typography variant="h6" component="h2" sx={{ fontWeight: '600', marginBottom: '0' }}>
          Learn {packName}
        </Typography>
        {loading ? (
          <MyLoader />
        ) : (
          <Card sx={{ maxWidth: 440 }}>
            <CardContent sx={{ padding: '33px' }}>
              <Typography sx={{ fontSize: 16, mb: 1.8 }}>
                <span className={s.bold}>Question: </span>
                {card.questionImg ? (
                  <Box
                    component="img"
                    sx={{
                      display: 'block',
                      height: 233,
                      width: '100%',
                    }}
                    alt="The house from the offer."
                    src={card.questionImg}
                  />
                ) : (
                  card.question
                )}
              </Typography>

              <Typography sx={{ mb: 2.5 }} color="text.secondary">
                Количество попыток ответов на вопрос: <span className={s.bold}>{card.shots}</span>
              </Typography>

              {!showAnswer && (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 30, mb: 4 }}
                  fullWidth
                  onClick={() => setShowAnswer(true)}
                >
                  Show answer
                </Button>
              )}

              {showAnswer && (
                <FormGroup>
                  <Typography sx={{ fontSize: 16, mb: 2.5, maxWidth: '395px' }}>
                    <span className={s.bold}>Answer: </span>
                    <span style={{ overflow: 'hidden' }}>{card.answer} </span>
                  </Typography>
                  <form onSubmit={formik.handleSubmit} className={s.form}>
                    <FormControl sx={{ mb: 2.5 }}>
                      <Typography id="demo-customized-radios">Rate yourself:</Typography>

                      <RadioGroup
                        // defaultValue={defaultValue}
                        value={value}
                        onChange={handleChange}
                        aria-labelledby="demo-customized-radios"
                        name="customized-radios"
                      >
                        <Radio value={1} label="Did not know" handleChange={formik.handleChange} />
                        <Radio value={2} label="Forgot" handleChange={formik.handleChange} />
                        <Radio
                          value={3}
                          label="A lot of thought"
                          handleChange={formik.handleChange}
                        />
                        <Radio value={4} label="Сonfused" handleChange={formik.handleChange} />
                        <Radio
                          value={5}
                          label="Knew the answer"
                          handleChange={formik.handleChange}
                        />
                      </RadioGroup>
                      {formik.errors.picked && (
                        <div style={{ marginTop: '15px', color: 'red' }}>
                          {formik.errors.picked}
                        </div>
                      )}
                    </FormControl>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: 30, width: '100%' }}
                      type={'submit'}
                      // onClick={onNext}
                    >
                      Next
                    </Button>
                  </form>
                </FormGroup>
              )}
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  )
}

type Props = {
  value: number
  label: string
  handleChange: { (e: ChangeEvent<any>): void }
}

const Radio = ({ value, label, handleChange }: Props) => {
  return (
    <FormControlLabel
      name="picked"
      value={value}
      control={<BpRadio />}
      label={label}
      onChange={handleChange}
    />
  )
}

export default Learn
