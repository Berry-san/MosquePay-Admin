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
import ReferralDetails from './ReferralDetails'
import axiosInstance from '../utils/axios'

function Referral() {
  const [campaign, setCampaign] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [reference, setReference] = useState('')
  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axiosInstance
      .get('campaign_payment_details')
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

  return (
    <div className="w-10/12 pt-16 mx-auto ">
      <ReferralDetails
        open={open}
        payment={reference}
        handleClose={handleClose}
      />
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
                  <h5 className="title">Campaign Details</h5>
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
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="p-2 mt-1 mr-2 text-white underline bg-green-700 rounded-xl underline-offset-1"
                table="referral-table"
                filename="Campaign"
                sheet="tablexls"
                buttonText="DownLoad Data"
              />
            </div>
            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full mx-4 my-6 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="referral-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">
                      <span>Campaign Name</span>
                    </th>
                    <th className="border-2">
                      <span>Campaign Amount</span>
                    </th>
                    <th className="border-2">
                      <span>Amount Raise</span>
                    </th>
                    <th className="border-2">Campaign Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((camp, i) => (
                    <tr key={i} className="border-2 tb-tnx-item">
                      <td className="border-2">{camp.title}</td>
                      <td className="border-2">{camp.campaign_amount}</td>
                      <td className="border-2">{camp.Amount_Raise}</td>
                      <td className="border-2">{camp.campaign_reference}</td>
                      <td
                        className="text-blue-600 underline border-2 cursor-pointer"
                        onClick={() => {
                          setOpen(true)
                          setReference(camp.campaign_reference)
                        }}
                      >
                        Details
                      </td>
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

export default Referral
