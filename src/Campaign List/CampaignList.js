import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import { WEB_BASE } from '../APIBase'
import { Link, Outlet } from 'react-router-dom'
import Content from '../Layout/Content/Content'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Youtube from '../images/youtube.svg'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import { exportToExcel } from '../component/utils/exportUtils'
import qs from 'qs'

import { Card } from 'reactstrap'
import {
  Button,
  Block,
  Icon,
  // PaginationComponent,
  NewPagination,
} from '../component/Component'
import axios from 'axios'
import Campaign from '../Campaign/Campaign'

export default function CampaignList() {
  const [selectedOption, setSelectedOption] = useState('')
  const [campaign, setCampaign] = useState([])
  const [list, setList] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    axios
      // .get(WEB_BASE + 'short_list', { headers: { 'x-api-key': '987655' } })
      .get('http://mosquepay.org/mosquepayapi/v1/api/list_campaign_reference', {
        headers: { 'x-api-key': '987655' },
      })
      .then((res) => {
        const dataWithId = res.data.result.map((item, index) => ({
          ...item,
          id: index + 1,
        }))
        setList(dataWithId)
      })
  }, [])

  // useEffect(() => {
  //   if (selectedOption) {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'x-api-key': 987655,
  //       },
  //     }
  //     axios
  //       .post(
  //         `http://mosquepay.org/mosquepayapi/v1/api/campiagn_payment_camp_ref`,
  //         qs.stringify({ campaign_reference: selectedOption }),
  //         config
  //       )
  //       .then((res) => {
  //         const dataWithId = res.data.result?.map((item, index) => ({
  //           ...item,
  //           id: index + 1,
  //         }))
  //         if (dataWithId) {
  //           setCampaign(dataWithId)
  //         } else {
  //           setCampaign([])
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         // setFetchingData(false)
  //       })
  //   }
  // }, [selectedOption])
  useEffect(() => {
    if (selectedOption) {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': 987655,
        },
      }
      axios
        .post(
          `http://mosquepay.org/mosquepayapi/v1/api/campiagn_payment_camp_ref`,
          qs.stringify({ campaign_reference: selectedOption }),
          config
        )
        .then((res) => {
          if (res.data.result && Array.isArray(res.data.result)) {
            const dataWithId = res.data.result.map((item, index) => ({
              ...item,
              id: index + 1,
            }))
            setCampaign(dataWithId)
          } else {
            setCampaign([])
          }
        })
        .catch((err) => {
          console.log(err)
          setCampaign([])
        })
    } else {
      setCampaign([])
    }
  }, [selectedOption])

  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = campaign

    if (search) {
      productDetails = productDetails.filter((comment) =>
        comment.fullname.toLowerCase().includes(search.toLowerCase())
      )
    }
    //window.alert(productData);
    //console.log(productData)

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [currentPage, search, campaign])

  const handleSort = () => {
    const sortedData = [...list]
    sortedData.sort((a, b) => {
      const dateA = new Date(a.txn_date)
      const dateB = new Date(b.txn_date)
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
    })
    setList(sortedData)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handleExportExcel = () => {
    exportToExcel(campaign)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = campaign.map((user) => [
      user.payment_channel,
      user.txn_count,
      user.amt,
      user.txn_date,
    ])
    autoTable(doc, {
      head: [['Payment Channel', 'Transaction Count', 'Amount', 'Date']],
      body: tableData,
    })
    doc.save('list.pdf')
  }

  const csvData = campaign.map((user) => ({
    'Payment Channel': user.payment_channel,
    'Transaction Count': user.txn_count,
    Amount: user.amt,
    Date: user.txn_date,
  }))

  const handlePrint = () => {
    // Create a new window and document
    const printWindow = window.open('', '_blank')
    printWindow.document.open()

    // Generate the HTML content for printing
    const htmlContent = `
      <html>
        <head>
          <title>Print transactions</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1rem;
                text: black
              }
              th, td {
                padding: 0.5rem;
                border-bottom: 1px solid #ddd;
              }
              th {
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <p class="text-md font-bold text-center pb-10"> Transactions. </p>
          <table class="w-full text-sm text-left text-[#127EC8] bg-[#127EC830]">
            <thead>
              <tr>
                
                <th class="px-6">Payment Channel</th>
                <th class="px-6">Transaction Count</th>
                <th class="px-6">Amount</th>
                <th class="px-6">Date</th>
              </tr>
            </thead>
            <tbody>
              ${campaign
                .map(
                  (camp) => `
                    <tr key={camp.id} className="text-black tb-tnx-item">
                      <td className="border-2">
                        ${
                          camp.payment_channel === ''
                            ? 'FLUTTERWAVE'
                            : camp.payment_channel
                        }
                      </td>
                      <td className="border-2">${camp.txn_count}</td>
                      <td className="border-2">
                        ${Number(camp.amt).toLocaleString()}
                      </td>
                      <td className="border-2">${camp.txn_date}</td>
                    </tr>
                  `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="w-10/12 pt-16 mx-auto ">
      <Outlet />
      {/* <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent></BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button color="primary" className="btn-icon">
                    <Icon name="plus"></Icon>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content> */}
      <Block>
        <Card className="card-bordered card-stretch">
          <div className="card-inner-group">
            <div className="card-inner">
              <div className="card-title-group ">
                <div className="card-title">
                  <h5 className="title">Campaign List</h5>
                </div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar">
                    <li>
                      <Button
                        onClick={toggle}
                        className="btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                  </ul>
                </div>
                <div
                  className={`card-search search-wrap ${
                    !onSearch ? 'active' : ''
                  }`}
                >
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search"
                      onClick={() => {
                        toggle()
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <Search
                      onSearch={(value) => {
                        setSearch(value)
                        setCurrentPage(1)
                      }}
                      place="Search by list Name and Reference No"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between mx-4 mt-3 md:flex-row">
              <div className="flex flex-col">
                <label htmlFor="" className="mb-0 text-left">
                  Campaign
                </label>
                <select
                  name="campaign"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="p-2 rounded w-[22rem] xl:w-[26rem] focus:border-none mt-2 bg-[#F5F6FA]"
                >
                  <option value="">--</option>
                  {list.map((list) => {
                    return (
                      <option key={list.id} value={list.campaign_reference}>
                        {list.title}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex items-center justify-end mt-3">
                <span
                  className="px-2 font-semibold text-green-900 cursor-pointer"
                  onClick={handleExportPDF}
                >
                  PDF
                </span>
                <CSVLink
                  data={csvData}
                  filename={'users.csv'}
                  className="px-2 font-semibold text-green-900 cursor-pointer"
                >
                  CSV
                </CSVLink>
                <span
                  className="pr-2 font-semibold text-green-900 cursor-pointer"
                  onClick={handleExportExcel}
                >
                  Excel
                </span>
                <span
                  className="pl-2 font-semibold text-green-900 cursor-pointer"
                  onClick={handlePrint}
                >
                  Print
                </span>
              </div>
            </div>

            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full mx-4 my-6 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="list-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">PAYMENT CHANNEL</th>
                    <th className="border-2">COUNT</th>
                    <th className="border-2">AMOUNT</th>
                    <th
                      className="border-2 cursor-pointer"
                      onClick={() => {
                        handleSort()
                      }}
                    >
                      DATE
                    </th>
                    {/* <th
                      className="flex items-center justify-center mx-auto space-x-3 text-center border cursor-pointer"
                      onClick={handleSort}
                    >
                      <span>Date</span>
                      {sortDirection === 'asc' ? (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M12.9999 7.82843V20H10.9999V7.82843L5.63589 13.1924L4.22168 11.7782L11.9999 4L19.778 11.7782L18.3638 13.1924L12.9999 7.82843Z"
                              fill="rgba(82,100,132,1)"
                            ></path>
                          </svg>
                        </span>
                      ) : (
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z"
                              fill="rgba(82,100,132,1)"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {productData.map((camp) => (
                    <tr key={camp.id} className="tb-tnx-item">
                      <td className="border-2">
                        {camp.payment_channel === ''
                          ? 'FLUTTERWAVE'
                          : camp.payment_channel}
                      </td>
                      <td className="border-2">{camp.txn_count}</td>
                      <td className="border-2">
                        {Number(camp.amt).toLocaleString()}
                      </td>
                      <td className="border-2">{camp.txn_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {list.length === 0 ? (
              <p className="text-center text-red-800 ">No list data found</p>
            ) : null}
            {productData.length === 0 && list.length !== 0 ? (
              <p className="text-center text-red-800">Select a campaign</p>
            ) : null}
            <div className="card-inner">
              {/* <PaginationComponent
                noDown
                totalItems={totalItems}
                itemPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                paginate={paginate}
              /> */}
              <NewPagination
                totalCount={totalItems}
                pageSize={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={paginate}
                className="flex items-center justify-center"
              />
            </div>
          </div>
        </Card>
      </Block>
    </div>
  )
}
