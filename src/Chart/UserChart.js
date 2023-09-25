import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'
import { WEB_BASE } from '../APIBase'

export default function UserChart() {
  const [active, setActive] = useState('')
  const [inActive, setInActive] = useState('')

  useEffect(() => {
    axios
      .get(WEB_BASE + 'count_all_user', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setActive(res.data.result.ACTIVE)
        setInActive(res.data.result.INACTIVE)
      })

      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      <Bar
        data={{
          labels: ['Active', 'Inactive'],
          datasets: [
            {
              label: 'Users Count',
              data: [active, inActive],
              backgroundColor: ['green', 'red'],
            },
          ],
        }}
        height={700}
        width={1200}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  )
}
