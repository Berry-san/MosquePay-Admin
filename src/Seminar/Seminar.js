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
import axiosInstance from '../utils/axios'

export default function Seminar() {
  const [seminar, setSeminar] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axiosInstance.get('list_seminar').then((res) => {
      setSeminar(res.data.result)
    })
  }, [])

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = seminar

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
  }, [seminar, currentPage, search])

  const handleSort = () => {
    const sortedData = [...seminar]
    sortedData.sort((a, b) => {
      const dateA = new Date(a.inserted_dt)
      const dateB = new Date(b.inserted_dt)
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA
    })
    setSeminar(sortedData)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const handleExportExcel = () => {
    exportToExcel(seminar, 'Seminar')
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = seminar.map((user) => [
      user.fullname,
      user.phonenumber,
      user.whatsapp_number,
      user.email,
      user.inserted_dt,
    ])
    autoTable(doc, {
      head: [['Name', 'Phone Number', 'Whatsapp Number', 'Email', 'Date']],
      body: tableData,
    })
    doc.save('seminar.pdf')
  }

  const csvData = seminar.map((user) => ({
    Name: user.fullname,
    'Last Name': user.phonenumber,
    'Whatsapp Number': user.whatsapp_number,
    Email: user.email,
    Date: user.inserted_dt,
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
                
                <th class="px-6">Name</th>
                <th class="px-6">Phone Number</th>
                <th class="px-6">Whatsapp Number</th>
                <th class="px-6">Email</th>
                <th class="px-6">Date</th>
              </tr>
            </thead>
            <tbody>
              ${seminar
                .map(
                  (item) => `
                    <tr class="bg-white border-b text-black text-[13px]">
                      <td class="px-6 py-4 font-medium">
                        ${item.fullname}
                      </td>
                      <td class="px-6 py-4">
                        ${item.phonenumber}
                      </td>
                      <td class="px-6 py-4">
                        ${item.whatsapp_number}
                      </td>
                      <td class="px-6 py-4">
                       ${item.email}
                      </td>
                      <td class="px-6 py-4">
                       ${item.inserted_dt}
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
                  <h5 className="title">Seminars</h5>
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
                      place="Search by seminar Name and Reference No"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3 mr-5">
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
                id="seminar-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">Name</th>
                    <th className="border-2">Phone Number</th>
                    <th className="border-2">Whatsapp Number</th>
                    <th className="border-2">Email</th>
                    <th
                      className="border-2 cursor-pointer"
                      onClick={() => {
                        handleSort()
                      }}
                    >
                      Date
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
                  {productData.map((camp, index) => (
                    <tr key={index} className="tb-tnx-item">
                      <td className="border-2">{camp.fullname}</td>
                      <td className="border-2">{camp.phonenumber}</td>
                      <td className="border-2">{camp.whatsapp_number}</td>
                      <td className="border-2">{camp.email}</td>
                      <td className="border-2">{camp.inserted_dt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {seminar.length === 0 ? (
              <p className="text-center text-red-800 ">No seminar data found</p>
            ) : null}
            <div className="card-inner">
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
