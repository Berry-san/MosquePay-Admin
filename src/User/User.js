import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import { exportToExcel } from '../component/utils/exportUtils'
import Content from '../Layout/Content/Content'
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
import { WEB_BASE } from '../APIBase'

export default function User() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [totalItems, setTotalItems] = useState(0)
  const [onSearch, setonSearch] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      .get(WEB_BASE + 'all_user_account', {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setUsers(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  //   // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = users

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          comment.firstname.toLowerCase().includes(search.toLowerCase()) ||
          comment.lastname.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [users, currentPage, search])

  const handleExportExcel = () => {
    exportToExcel(users, 'Users')
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = users.map((user) => [
      user.firstname,
      user.lastname,
      user.email,
      user.status === 0 ? 'Active' : ' Inactive',
    ])
    autoTable(doc, {
      head: [['First Name', 'Last Name', 'Email', 'Status']],
      body: tableData,
    })
    doc.save('users.pdf')
  }

  const csvData = users.map((user) => ({
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
          <title>Users</title>
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
          <p class="text-md font-bold text-center pb-10"> Users. </p>
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
              ${users
                .map(
                  (user) => `
                    <tr class="bg-white border-b text-black text-[13px]">
                      <td class="px-6 py-4 font-medium">
                        ${user.firstname}
                      </td>
                      <td class="px-6 py-4">
                        ${user.lastname}
                      </td>
                      <td class="px-6 py-4">
                       ${user.email}
                      </td>
                      <td class="px-6 py-4">
                        ${user.status == 0 ? 'Active' : ' Inactive'}
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
    <div className="w-10/12 pt-16 pb-3 mx-auto mt-16">
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
                  <h5 className="title">All Users</h5>
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
                      place="Search by name or email"
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
                id="table-xls-button"
                className="p-2 mt-1 mr-2 text-white underline bg-green-700 rounded-xl underline-offset-1"
                table="user-table"
                filename="UserDetails"
                sheet="tablexls"
                buttonText="Download Data"
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
                className="w-full my-6 ml-2 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="user-table"
              >
                <thead>
                  <tr className="border-2 tb-tnx-head">
                    <th className="border-2">
                      <span>FirstName</span>
                    </th>
                    <th className="border-2">
                      <span>LastName</span>
                    </th>
                    <th className="border-2">
                      <span>Email</span>
                    </th>
                    <th className="border-2">
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((user) => (
                    <tr key={user.id} className="border-2 tb-tnx-item">
                      <td className="border-2">{user.firstname}</td>
                      <td className="border-2">{user.lastname}</td>
                      <td className="border-2">{user.email}</td>
                      <td className="border-2">
                        {user.status == 0 ? (
                          <span className="p-3 font-semibold text-green-900 rounded-md cursor-pointer">
                            Active
                          </span>
                        ) : (
                          <span className="p-3 font-semibold rounded-md cursor-pointer text-rose-700">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 ? (
              <p className="text-center text-red-800 "> No user data</p>
            ) : null}
            <div className="card-inner">
              {}

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
