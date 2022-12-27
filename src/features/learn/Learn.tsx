import React, { ChangeEvent } from 'react'

import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { BpRadio } from '../../common/components/ui/Radio/Radio'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { cardsSelector } from '../../common/selectors'
import { rateCardTC } from '../cards/cards-reducer'

import s from './Learn.module.css'

const Learn = () => {
  const [showAnswer, setShowAnswer] = React.useState(false)

  const packName = useAppSelector(cardsSelector.packName)

  const cards = useAppSelector(cardsSelector.cards)

  const rateCardHandler = (grade: number, card_id: string) => {}

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      picked: 1,
    },
    onSubmit: (values: any) => {
      console.log(values)
      dispatch(rateCardTC(values.picked, cards.cards[0]._id))
    },
  })

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}
      >
        <Link className={s.profileLink} to={PATH.PACKS}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Back to pack list</span>
        </Link>

        <Typography variant="h6" component="h2" sx={{ fontWeight: '600', marginBottom: '0' }}>
          Learn {packName}
        </Typography>

        <Card sx={{ minWidth: 440 }}>
          <CardContent sx={{ padding: '33px' }}>
            <Typography sx={{ fontSize: 16, mb: 1.8 }}>
              <span className={s.bold}>Question: </span>
              {cards.cards[0]?.question}
            </Typography>

            <Typography sx={{ mb: 4 }} color="text.secondary">
              Количество попыток ответов на вопрос:{' '}
              <span className={s.bold}>{cards.cards[0]?.shots}</span>
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
                <Typography sx={{ fontSize: 16, mb: 1.8 }}>
                  <span className={s.bold}>Answer: </span>
                  {cards.cards[0]?.answer}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl sx={{ mb: 4 }}>
                    <Typography id="demo-customized-radios" sx={{ mb: 1.5 }}>
                      Rate yourself:
                    </Typography>

                    <RadioGroup
                      defaultValue={1}
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
                      <Radio value={5} label="Knew the answer" handleChange={formik.handleChange} />
                    </RadioGroup>
                  </FormControl>
                  <Button variant="contained" sx={{ borderRadius: 30 }} fullWidth type={'submit'}>
                    Next
                  </Button>
                </form>
              </FormGroup>
            )}
          </CardContent>
        </Card>
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
