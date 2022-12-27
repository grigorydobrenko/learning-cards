import React from 'react'

import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { BpRadio } from '../../common/components/ui/Radio/Radio'

import s from './Learn.module.css'

const Learn = () => {
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
          Learn “Pack Name”
        </Typography>

        <Card sx={{ minWidth: 440 }}>
          <CardContent sx={{ padding: '33px' }}>
            <Typography sx={{ fontSize: 16, mb: 1.8 }}>
              <span className={s.bold}>Question:</span> How This works in JavaScript?
            </Typography>
            <Typography sx={{ mb: 4 }} color="text.secondary">
              Количество попыток ответов на вопрос: <span className={s.bold}>10</span>
            </Typography>
            <Button variant="contained" sx={{ borderRadius: 30, mb: 4 }} fullWidth>
              Show answer
            </Button>
            <Typography sx={{ fontSize: 16, mb: 1.8 }}>
              <span className={s.bold}>Answer:</span>This is how This works in JavaScript
            </Typography>
            <FormControl sx={{ mb: 4 }}>
              <Typography id="demo-customized-radios" sx={{ mb: 1.5 }}>
                Rate yourself:
              </Typography>
              <RadioGroup
                defaultValue="Did not know"
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
              >
                <FormControlLabel value="Did not know" control={<BpRadio />} label="Did not know" />
                <FormControlLabel value="Forgot" control={<BpRadio />} label="Forgot" />
                <FormControlLabel
                  value="A lot of thought"
                  control={<BpRadio />}
                  label="A lot of thought"
                />
                <FormControlLabel value="Сonfused" control={<BpRadio />} label="Сonfused" />
                <FormControlLabel
                  value="Knew the answer"
                  control={<BpRadio />}
                  label="Knew the answer"
                />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" sx={{ borderRadius: 30 }} fullWidth>
              Next
            </Button>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default Learn
