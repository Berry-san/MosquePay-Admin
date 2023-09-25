import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Pie } from 'react-chartjs-2'
import Chart from 'react-apexcharts'
import axios from 'axios'
import { WEB_BASE } from '../APIBase'

export default function CampaignChart() {
  const [campActive, setCampActive] = useState('')
  const [campInActive, setCampInActive] = useState('')
  const [campRejected, setCampRejected] = useState('')

  // const options = {
  //   chart: {
  //     type: 'donut',
  //   },
  //   colors: ['#10B981', '#375E83', '#259AE6', '#FFA70B'],
  //   labels: ['Remote', 'Hybrid', 'Onsite'],
  //   legend: {
  //     show: true,
  //     position: 'bottom',
  //   },
  //   plotOptions: {
  //     pie: {
  //       donut: {
  //         size: '65%',
  //         background: 'transparent',
  //       },
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 2600,
  //       options: {
  //         chart: {
  //           width: 380,
  //         },
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       options: {
  //         chart: {
  //           width: 200,
  //         },
  //       },
  //     },
  //   ],
  // }

  const chartData = {
    series: [+campActive, +campInActive, +campRejected],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Active', 'Inactive', 'Rejected'],
      colors: ['#10B981', '#375E83', '#FFA70B'],
      legend: {
        show: true,
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            background: 'transparent',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2600,
          options: {
            chart: {
              width: 380,
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 200,
            },
          },
        },
      ],
    },
  }

  useEffect(() => {
    axios
      .get(WEB_BASE + 'count_campaign', { headers: { 'x-api-key': '987655' } })
      .then((res) => {
        setCampActive(res.data.result.APPROVE)
        setCampRejected(res.data.result.REJECT)
        setCampInActive(res.data.result.PENDING)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="flex flex-col justify-between md:mb-28 space-y-8">
      {/* <Pie
        data={{
          labels: ['Active', 'Inactive', 'Rejected'],
          datasets: [
            {
              label: 'Campaign Count',
              data: [campActive, campInActive, campRejected],
              backgroundColor: ['green', '#90EE90', '#9FE2BF'],
            },
          ],
        }}
        height={1000}
        width={1200}
        options={{
          title: { text: 'Campaign Count', display: true },
          legend: {
            labels: {
              fontSize: 14,
            },
          },
        }}
      /> */}
      <p className="text-center font-bold text-xl ">Campaign Count</p>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
      />
    </div>
  )
}
