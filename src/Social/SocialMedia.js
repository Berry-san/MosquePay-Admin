import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import { WEB_BASE } from '../APIBase'

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

export default function SocialMedia() {
  const [socialMedia, setSocialMedia] = useState([])

  const [onSearch, setonSearch] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      .get(WEB_BASE + 'social_media', { headers: { 'x-api-key': '987655' } })
      .then((res) => {
        setSocialMedia(res.data.result)
      })
  }, [])

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = socialMedia

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          comment.email.toLowerCase().includes(search.toLowerCase()) ||
          comment.social_media_type
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          comment.social_media_name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [socialMedia, currentPage, search])

  return (
    <div className="w-10/12 pt-16 mx-auto ">
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
                      place="Search by Email"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 overflow-x-auto card-inner">
              <table className="w-full my-6 ml-4 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max">
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">Email</th>
                    <th className="border-2">Name</th>
                    <th className="border-2">Social Media</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((camp) => (
                    <tr key={camp.id} className="tb-tnx-item">
                      <td className="border-2">{camp.email}</td>
                      <td className="border-2">{camp.username}</td>
                      <td className="border-2">{camp.social_media_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {socialMedia.length === 0 ? (
              <p className="text-center text-red-800 ">
                No Social media login data found
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
