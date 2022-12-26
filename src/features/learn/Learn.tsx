import React from 'react'

import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'

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

        <Typography variant="h6" component="h2" sx={{ fontWeight: '600' }}>
          Learn “Pack Name”
        </Typography>

        <Card sx={{ minWidth: 440 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  )
}

export default Learn
