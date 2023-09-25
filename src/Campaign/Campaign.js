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

import { Card } from 'reactstrap'
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Icon,
  // PaginationComponent,
  NewPagination,
} from '../component/Component'
import axios from 'axios'

export default function Campaign() {
  const [campaign, setCampaign] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      // .get(WEB_BASE + 'short_campaign', { headers: { 'x-api-key': '987654' } })
      .get('https://mosquepay.org/mosquepayapi/v1/api/short_campaign', {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setCampaign(res.data.result)
      })
  }, [])

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = campaign

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          comment.title.toLowerCase().includes(search.toLowerCase()) ||
          comment.CampaignID.toLowerCase().includes(search.toLowerCase())
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
  }, [campaign, currentPage, search])

  const [sortDirection, setSortDirection] = useState('asc')

  const handleSort = () => {
    const sortedData = [...campaign]
    sortedData.sort((a, b) => {
      const dateA = new Date(a.start_date)
      const dateB = new Date(b.start_date)
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
    })
    setCampaign(sortedData)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handleExportExcel = () => {
    exportToExcel(campaign)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = campaign.map((user) => [
      user.firstname,
      user.lastname,
      user.email,
      user.status === 0 ? 'Active' : ' Inactive',
    ])
    autoTable(doc, {
      head: [['First Name', 'Last Name', 'Email', 'Status']],
      body: tableData,
    })
    doc.save('campaign.pdf')
  }

  const csvData = campaign.map((user) => ({
    'First Name': user.firstname,
    'Last Name': user.lastname,
    Email: user.email,
    Status: user.status,
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
                
                <th class="px-6">First Name</th>
                <th class="px-6">Last Name</th>
                <th class="px-6">Email</th>
                <th class="px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              ${campaign
                .map(
                  (item) => `
                    <tr class="bg-white border-b text-black text-[13px]">
                      <td class="px-6 py-4 font-medium">
                        ${item.firstname}
                      </td>
                      <td class="px-6 py-4">
                        ${item.lastname}
                      </td>
                      <td class="px-6 py-4">
                       ${item.email}
                      </td>
                      <td class="px-6 py-4">
                        ${item.status == 0 ? 'Active' : ' Inactive'}
                      </td>
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
                  <h5 className="title">Campaigns</h5>
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
                      place="Search by Campaign Name and Reference No"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3 mr-5">
              {/* <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="p-2 mt-1 mr-2 text-white underline bg-green-700 rounded-xl underline-offset-1"
                table="campaign-table"
                filename="Campaign"
                sheet="tablexls"
                buttonText="DownLoad Data"
              /> */}
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
            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full mx-4 my-6 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="campaign-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">Campaign Name</th>
                    <th className="border-2">Campaign Type</th>
                    <th className="border-2">Email</th>
                    <th
                      className="border-2 cursor-pointer"
                      onClick={() => {
                        handleSort()
                      }}
                    >
                      Start Date
                    </th>
                    <th className="border-2">End Date</th>
                    {/* <th
                      className="flex items-center justify-center mx-auto space-x-3 text-center border cursor-pointer"
                      onClick={handleSort}
                    >
                      <span>End Date</span>
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
                    <th className="border-2">Amount</th>
                    <th className="border-2">Image</th>
                    <th className="border-2">Video</th>
                    <th className="border-2">Status</th>
                    <th className="border-2">Payments</th>
                    <th className="border-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((camp) => (
                    <tr key={camp.ID} className="tb-tnx-item">
                      <td className="border-2">{camp.title}</td>
                      <td className="border-2">{camp.Campaign_Type}</td>
                      <td className="border-2">{camp.email}</td>
                      <td className="border-2">{camp.start_date}</td>
                      <td className="border-2">{camp.end_date}</td>
                      <td className="border-2">{camp.amount}</td>
                      <td className="border-2">
                        <a
                          href={`https://mosquepay.org/mosquepaynew/assets/img/campaigns/${camp.image}`}
                          className="text-blue-500 underline hover:underline-offset-4"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          View image
                        </a>{' '}
                      </td>
                      <td className="border-2">
                        <a
                          href={camp.video_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          <img
                            src={Youtube}
                            alt="youtube"
                            className="text-red-700 "
                          />
                        </a>
                      </td>
                      <td className="border-2">
                        {camp.admin_status === '0' ? (
                          <span className="p-2 font-bold text-green-700">
                            Approved
                          </span>
                        ) : camp.admin_status === '1' ? (
                          <span className="p-2 font-bold text-yellow-500">
                            Pending
                          </span>
                        ) : (
                          <span className="p-2 font-bold text-red-700">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="text-blue-500 underline border-2 hover:underline-offset-4">
                        <Link to={`payment/${camp.CampaignID}`}>Payments</Link>
                      </td>
                      <td className="text-blue-500 underline border-2 hover:underline-offset-4">
                        <Link to={`${camp.CampaignID}`}>Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {campaign.length === 0 ? (
              <p className="text-center text-red-800 ">
                No campaign data found
              </p>
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
