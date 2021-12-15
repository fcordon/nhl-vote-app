import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Eastern from '../../assets/eastern_conference.png';
import Western from '../../assets/western_conference.png';

import './index.scss';

const Stats = () => {
  const [standings, setStandings] = useState([])

  const getStandings = async () => {
    const response = await axios.get('https://statsapi.web.nhl.com/api/v1/standings')
    const body = await response.data
    console.log('body : ', body.records)
    return body.records
  }

  useEffect(() => {
    let isSubscribed = true

    getStandings()
    .then(res => isSubscribed && setStandings(res))
    .catch(err => console.log(err))

    return () => isSubscribed = false
  }, [])

  return (
    <section className='content page-stats'>
      <div className="page-stats-conference">
        <img src={Eastern} alt="Eastern Conference" />
        Eastern Conference
      </div>
      {standings.map((stats) => stats.conference.id === 6 && (
        <TableContainer className="page-stats-table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="page-stats-table-division" colSpan={11}>{stats.division.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Division Rank</TableCell>
                <TableCell align="center">League Rank</TableCell>
                <TableCell align="center">GP</TableCell>
                <TableCell align="center">W</TableCell>
                <TableCell align="center">L</TableCell>
                <TableCell align="center">OT</TableCell>
                <TableCell align="center">PTS</TableCell>
                <TableCell align="center">GF</TableCell>
                <TableCell align="center">GA</TableCell>
                <TableCell align="center">DIFF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.teamRecords.map((team) => (
                <TableRow
                  key={team.team.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img className="page-stats-table-img" src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.team.id + '.svg'} alt={team.team.name} />
                    {team.team.name}
                  </TableCell>
                  <TableCell align="center">{team.divisionRank}</TableCell>
                  <TableCell align="center">{team.leagueRank}</TableCell>
                  <TableCell align="center">{team.gamesPlayed}</TableCell>
                  <TableCell align="center">{team.leagueRecord.wins}</TableCell>
                  <TableCell align="center">{team.leagueRecord.losses}</TableCell>
                  <TableCell align="center">{team.leagueRecord.ot}</TableCell>
                  <TableCell align="center">{team.points}</TableCell>
                  <TableCell align="center">{team.goalsScored}</TableCell>
                  <TableCell align="center">{team.goalsAgainst}</TableCell>
                  <TableCell align="center">{Number(team.goalsScored) - Number(team.goalsAgainst)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
      <div className="page-stats-conference">
        <img src={Western} alt="Western Conference" />
        Western Conference
      </div>
      {standings.map((stats) => stats.conference.id === 5 && (
        <TableContainer className="page-stats-table" component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="page-stats-table-division" colSpan={11}>{stats.division.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Division Rank</TableCell>
                <TableCell align="center">League Rank</TableCell>
                <TableCell align="center">GP</TableCell>
                <TableCell align="center">W</TableCell>
                <TableCell align="center">L</TableCell>
                <TableCell align="center">OT</TableCell>
                <TableCell align="center">PTS</TableCell>
                <TableCell align="center">GF</TableCell>
                <TableCell align="center">GA</TableCell>
                <TableCell align="center">DIFF</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.teamRecords.map((team) => (
                <TableRow
                  key={team.team.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img className="page-stats-table-img" src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + team.team.id + '.svg'} alt={team.team.name} />
                    {team.team.name}
                  </TableCell>
                  <TableCell align="center">{team.divisionRank}</TableCell>
                  <TableCell align="center">{team.leagueRank}</TableCell>
                  <TableCell align="center">{team.gamesPlayed}</TableCell>
                  <TableCell align="center">{team.leagueRecord.wins}</TableCell>
                  <TableCell align="center">{team.leagueRecord.losses}</TableCell>
                  <TableCell align="center">{team.leagueRecord.ot}</TableCell>
                  <TableCell align="center">{team.points}</TableCell>
                  <TableCell align="center">{team.goalsScored}</TableCell>
                  <TableCell align="center">{team.goalsAgainst}</TableCell>
                  <TableCell align="center">{Number(team.goalsScored) - Number(team.goalsAgainst)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </section>
  )
}

export default Stats
