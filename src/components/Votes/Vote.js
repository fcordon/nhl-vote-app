import React, { useState, useEffect } from 'react'
import axios from 'axios'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
    <div>
      <section>
        Nombre d'équipe sélectionnée : {teamsCount}
      </section>
      <section className='Home-vote'>
        {teams.map((team, index) => (
          <div key={team.name}>
            <img src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.id + '.svg'} alt={team.name} />
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
      </section>
      <section>
        <Button variant="contained" disabled={teamsCount < 16} color="primary">Valider</Button>
      </section>
    </div>
  )
}

export default Vote
