import React, { useState, useEffect } from 'react'
import axios from 'axios'

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

import './index.scss';

const Vote = () => {
  const [teams, setTeams] = useState([])
  const [teamsSelected, setTeamsSelected] = useState([])
  const [teamsCount, setTeamsCount] = useState(0)
  const [inputChecked, setInputChecked] = useState({})

  const handleVote = index => event => {
    if (event.target.checked && teamsCount < 16) {
      setTeamsSelected([...teamsSelected, event.target.value])
      setTeamsCount(teamsCount + 1)
      setInputChecked({...inputChecked, [index]: true})
    }
    if(!event.target.checked) {
      const teamIndex = teamsSelected.indexOf(event.target.value)
      teamsSelected.splice(teamIndex, 1)

      setTeamsSelected(teamsSelected)
      setTeamsCount(teamsCount - 1)
    }
  }

  const getTeams = async () => {
    const response = await axios.get('https://statsapi.web.nhl.com/api/v1/teams')
    const body = await response.data
    return body.teams
  }

  useEffect(() => {
    let isSubscribed = true

    getTeams()
    .then(res => isSubscribed && setTeams(res))
    .catch(err => console.log(err))

    return () => isSubscribed = false
  }, [])

  return (
    <section className='content page-vote'>
      <div className='page-vote-count'>
        Nombre {teamsCount <= 1 ? 'd\'équipe sélectionnée' : 'd\'équipes sélectionnées'} : {teamsCount}
      </div>
      <div className='page-vote-teams'>
        {teams.map((team, index) => (
          <div className='page-vote-teams-team' key={team.name}>
            <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.id + '.svg'} alt={team.name} onClick={() => handleVote(index)} />
            <FormControlLabel
              control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}
              value={team.name}
              onChange={handleVote(index)}
              disabled={(teamsCount === 16 && !inputChecked[index])}
              />}
              label={team.name}
            />
          </div>
        ))}
      </div>
      <div>
        <Button variant="contained" disabled={teamsCount < 16} color="primary">Valider</Button>
      </div>
    </section>
  )
}

export default Vote
