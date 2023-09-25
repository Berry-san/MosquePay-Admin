import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'
import { WEB_BASE } from '../APIBase'

export default function DonationChart() {
  const [active, setActive] = useState('')

  useEffect(() => {
    axios
      .get(WEB_BASE + 'friday_donation', { headers: { 'x-api-key': '987655' } })
      .then((res) => {
        setActive(res.data.result[0].Number_of_Friday_donation)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      <Pie
        data={{
          labels: ['Friday Donation'],
          datasets: [
            {
              label: 'Friday Donation Count',
              data: [active],
              backgroundColor: ['green'],
            },
          ],
        }}
        height={900}
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
