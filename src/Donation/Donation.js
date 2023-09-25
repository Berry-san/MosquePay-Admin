import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import Content from '../Layout/Content/Content'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { Card, FormGroup, Modal, ModalBody } from 'reactstrap'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import { exportToExcel } from '../component/utils/exportUtils'
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Icon,
  Col,
  // PaginationComponent,
  NewPagination,
} from '../component/Component'
import axios from 'axios'
import { WEB_BASE } from '../APIBase'

export default function Donation() {
  const [donation, setDonation] = useState([])
  const [onSearch, setonSearch] = useState(true)

  const [modal, setModal] = useState({
    add: false,
  })
  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      .get(WEB_BASE + 'friday_donation_list', {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setDonation(res.data.result)
        console.log(res.data.result[0].status)
      })
      .catch((err) => console.log(err))
  }, [])
  const [needyD, setNeedyD] = useState([])
  const [donationEmail, setDonationEmail] = useState('')
  const [donationStartDate, setDonationStartDate] = useState('')
  const [donationEndDate, setDonationEndDate] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [donationNeedyId, setDonationNeedyId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(WEB_BASE + 'needy_category', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setNeedyD(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      const res = axios.post(
        WEB_BASE + 'friday_donation_insert',
        qs.stringify({
          email: donationEmail,
          start_dt: donationStartDate,
          end_dt: donationEndDate,
          amount: donationAmount,
          needy_category_id: donationNeedyId,
        }),
        {
          headers: {
            'x-api-key': '987654',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Donation Campaign Created Successfully')
      navigate('/donation')

      setDonationEmail('')
      setDonationStartDate('')
      setDonationEndDate('')
      setDonationAmount('')
      setDonationNeedyId('')
    } catch (e) {
      console.log(e.response)
    }
  }
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false })
  }

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = donation

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          comment.category.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [donation, currentPage, search])

  const handleExportExcel = () => {
    exportToExcel(donation)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = donation.map((item) => [
      item.category,
      item.email,
      item.start_dt,
      item.end_dt,
      item.amount,
      item.status,
      item.card_details,
    ])
    autoTable(doc, {
      head: [
        [
          'Category',
          'Email',
          'Start Date',
          'End Date',
          'Amount',
          'Status',
          'Card Details',
        ],
      ],
      body: tableData,
    })
    doc.save('Donation.pdf')
  }

  const csvData = donation.map((item) => ({
    Category: item.category,
    Email: item.email,
    'Start Date': item.start_dt,
    'End Date': item.end_dt,
    Amount: item.amount,
    Status: item.status,
    'Card Details': item.card_details,
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
                
                <th class="px-6">Category</th>
                <th class="px-6">Email</th>
                <th class="px-6">Start date</th>
                <th class="px-6">End Date</th>
                <th class="px-6">Amount</th>
                <th class="px-6">Status</th>
                <th class="px-6">Card Details</th>
              </tr>
            </thead>
            <tbody>
              ${donation
                .map(
                  (item) => `
                    <tr class="bg-white border-b text-black text-[13px]">
                      <td class="px-6 py-4 font-medium">
                        ${item.category}
                      </td>
                      <td class="px-6 py-4">
                        ${item.email}
                      </td>
                      <td class="px-6 py-4">
                       ${item.start_dt ? item.start_dt : ''}
                      </td>
                      <td class="px-6 py-4">
                        ${item.end_dt ? item.end_dt : ''}
                      </td>
                      <td class="px-6 py-4">
                        ${item.amount}
                      </td>
                      <td class="px-6 py-4">
                        ${item.status ? item.status : ''}
                      </td>
                      <td class="px-6 py-4">
                        ${item.card_details ? item.card_details : ''}
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
    <div className="w-10/12 pt-20 mx-auto  md:pt-16">
      {/* <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent></BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li>
                  <Button
                    color="primary"
                    className="btn-icon"
                    onClick={() => setModal({ add: true })}
                  >
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
              <div className="card-title-group">
                <div className="card-title">
                  <h5 className="title">Friday Donation</h5>
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
              <div className="flex justify-end">
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
                    filename={'Donation.csv'}
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
            </div>
            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full my-6 ml-4 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="donation-table"
              >
                <thead>
                  <tr className="border-2 tb-tnx-head">
                    <th className="border-2">
                      <span>Category</span>
                    </th>
                    <th className="border-2">
                      <span>Email</span>
                    </th>
                    <th className="border-2">
                      <span>Start date</span>
                    </th>
                    <th className="border-2">
                      <span>End date</span>
                    </th>
                    <th className="border-2">
                      <span>Amount</span>
                    </th>
                    <th className="border-2">Status</th>
                    <th className="border-2">Card Details</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((donate) => (
                    <tr key={donate.category} className="border-2 tb-tnx-item">
                      <td className="border-2">{donate.category}</td>
                      <td className="border-2">{donate.email}</td>
                      <td className="border-2">{donate.start_dt}</td>
                      <td className="border-2">{donate.end_dt}</td>
                      <td className="border-2">{donate.amount}</td>
                      <td className="border-2">{donate.status}</td>
                      <td className="border-2">{donate.card_details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {donation.length === 0 ? (
              <p className="text-center text-red-800 ">
                No friday donation data found
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
      <Modal
        isOpen={modal.add}
        toggle={() => setModal({ add: false })}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault()
              onFormCancel()
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title"> Create Friday Donation</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="w-3/4 mx-auto  row min-w-fit">
                  <Col md="12">
                    <FormGroup>
                      <label>Email</label>
                      <input
                        type="email"
                        required
                        value={donationEmail}
                        onChange={(e) => setDonationEmail(e.target.value)}
                        className="bg-gray-100  form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="mt-3 ">Start Date</label>
                      <input
                        type="date"
                        required
                        value={donationStartDate}
                        onChange={(e) => setDonationStartDate(e.target.value)}
                        className="bg-gray-100 rounded-md  form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="mt-3 ">End Date</label>
                      <input
                        type="date"
                        required
                        value={donationEndDate}
                        onChange={(e) => setDonationEndDate(e.target.value)}
                        className="bg-gray-100 rounded-md  form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mt-3 ">Amount:</label>
                      <input
                        type="text"
                        required
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="bg-gray-100 rounded-md  form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mt-3 ">Amount:</label>
                      <select
                        value={donationNeedyId}
                        required
                        onChange={(e) => setDonationNeedyId(e.target.value)}
                        className="bg-gray-100 rounded-md form-control "
                      >
                        <option value="">Select Needy Category</option>
                        {needyD.map((need) => (
                          <option
                            key={need.needy_category_id}
                            value={need.needy_category_id}
                          >
                            {need.category}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <button
                    className="mt-4 text-white bg-green-800 rounded-md  form-control hover:bg-green-500"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
