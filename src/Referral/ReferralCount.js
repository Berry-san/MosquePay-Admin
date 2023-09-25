import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import Content from '../Layout/Content/Content'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { Card } from 'reactstrap'
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  Icon,
  // PaginationComponent
  NewPagination,
} from '../component/Component'
import axios from 'axios'
import { WEB_BASE } from '../APIBase'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { CSVLink } from 'react-csv'
import { exportToExcel } from '../component/utils/exportUtils'
function ReferralCount() {
  const [campaign, setCampaign] = useState([])
  const [onSearch, setonSearch] = useState(true)

  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      .get(WEB_BASE + 'count_referral', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setCampaign(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  // onChange function for searching name

  // function to close the form modal

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = campaign

    if (search) {
      productDetails = productDetails.filter((comment) =>
        //  comment.user_name.toLowerCase().includes(search.toLowerCase()) ||
        comment.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [campaign, currentPage, search])

  const handleExportExcel = () => {
    exportToExcel(campaign, 'Referral Count')
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = campaign.map((item) => [
      item.title,
      item.campaign_reference,
      item.sign_up,
    ])
    autoTable(doc, {
      head: [['Campaign Name', 'Campaign Reference', 'Referral Count']],
      body: tableData,
    })
    doc.save('Referral Count.pdf')
  }

  const csvData = campaign.map((item) => ({
    'Campaign Name': item.title,
    'Campaign reference': item.campaign_reference,
    'Refferal Count': item.sign_up,
  }))

  const handlePrint = () => {
    // Create a new window and document
    const printWindow = window.open('', '_blank')
    printWindow.document.open()

    // Generate the HTML content for printing
    const htmlContent = `
      <html>
        <head>
          <title>Referral Count</title>
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
          <p class="text-md font-bold text-center pb-10"> Referral Count. </p>
          <table class="w-full text-sm text-left text-[#127EC8] bg-[#127EC830]">
            <thead>
              <tr>
                <th class="px-6">Campaign Name</th>
                <th class="px-6">Campaign Reference</th>
                <th class="px-6">Referral Count</th>
              </tr>
            </thead>
            <tbody>
              ${campaign
                .map(
                  (item) => `
                    <tr class="bg-white border-b text-black text-[13px]">        
                      <td class="px-6 py-4">
                       ${item.title}
                      </td>
                      <td class="px-6 py-4">
                        ${item.campaign_reference}
                      </td>
                      <td class="px-6 py-4">
                        ${item.sign_up}
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
    <div className="w-10/12 pt-16 mx-auto">
      <Content>
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
      </Content>
      <Block>
        <Card className="card-bordered card-stretch">
          <div className="card-inner-group">
            <div className="card-inner">
              <div className="card-title-group ">
                <div className="card-title">
                  <h5 className="title">Referral Count</h5>
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
                      place="Search by name and 0 for answered questions and 1 for unanswered questions"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
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
                  filename={'Message.csv'}
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
                id="referral-count-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">
                      <span>Campaign Name</span>
                    </th>
                    <th className="border-2">
                      <span>Campaign reference</span>
                    </th>
                    <th className="border-2">
                      <span>Referral Count</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((camp, i) => (
                    <tr key={i} className="border-2 tb-tnx-item">
                      <td className="border-2">{camp.title}</td>
                      <td className="border-2">{camp.campaign_reference}</td>
                      <td className="border-2">{camp.sign_up}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {campaign.length === 0 ? (
              <p className="text-center text-red-800 "> Data Not Found</p>
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

export default ReferralCount
