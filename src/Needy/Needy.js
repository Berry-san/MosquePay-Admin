import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import qs from 'qs'
import Updatee from '../images/pen-solid.svg'
import { Link, Outlet } from 'react-router-dom'
import Content from '../Layout/Content/Content'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import Delete from '../images/trash.svg'
import { Card, FormGroup, Modal, ModalBody } from 'reactstrap'
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

export default function Needy() {
  const [needy, setNeedy] = useState([])
  const [onSearch, setonSearch] = useState(true)

  const [modal, setModal] = useState({
    add: false,
  })
  const [needyName, setNeedyName] = useState('')
  const [needyDescription, setNeedyDescription] = useState('')

  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(needyName, needyDescription)
    try {
      const res = axios.post(
        WEB_BASE + 'create_needy_category',
        qs.stringify({ category: needyName, description: needyDescription }),
        {
          headers: {
            'x-api-key': '987654',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Needy Campaign Created Successfully')
      window.location.href = '/needy'

      //  setModal({ add: false })
    } catch (e) {
      console.log(e.response)
      alert('Error in creating needy campaign')
    }
  }
  useEffect(() => {
    axios
      .get(WEB_BASE + 'needy_category', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setNeedy(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])
  // function to close the form modal
  const onFormCancel = () => {
    setModal({ add: false })
  }

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = needy

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          comment.category.toLowerCase().includes(search.toLowerCase()) ||
          comment.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [needy, currentPage, search])

  return (
    <div className=" pt-20 md:pt-16 w-10/12 mx-auto ">
      <Outlet />
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
              <div className="card-title-group ">
                <div className="card-title">
                  <h5 className="title">Needy Category</h5>
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
                      place="Search by name or description"
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <ReactHTMLTableToExcel
                  id="table-xls-button"
                  className="p-2 rounded-xl bg-green-700 mt-1 mr-2 underline underline-offset-1 text-white"
                  table="needy-table"
                  filename="NeedyCategory"
                  sheet="tablexls"
                  buttonText="DownLoad Data"
                />
              </div>
            </div>
            <div className="card-inner p-0 overflow-x-auto">
              <table
                className="table-auto w-full md:ml-0 ml-4  text-center my-6 overflow-x-scroll min-w-max overflow-scroll"
                id="needy-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="md:border-2 border-2">
                      <span>NO</span>
                    </th>
                    <th className="md:border-2 border-2">
                      <span>Name</span>
                    </th>
                    <th className="md:border-2  border-2">
                      <span>Description</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((needys) => (
                    <tr
                      key={needys.needy_category_id}
                      className="tb-tnx-item border-2 border-y-2 md:border-2"
                    >
                      <td className="border-2 md:border-2">
                        {needys.needy_category_id}
                      </td>
                      <td className="border-2 md:border-2">
                        {needys.category}
                      </td>
                      <td className="border-2  md:border-2">
                        {' '}
                        <span className=" w-1/4">
                          {needys.description}
                        </span>{' '}
                      </td>
                      <td className="border-2 md:border-2">
                        <Link to={`/needyupdate/${needys.needy_category_id}`}>
                          <img
                            src={Updatee}
                            className="h-5 w-5 mx-auto text-blue-400 hidden underline hover:underline-offset-4 md:block"
                            alt="update"
                          />
                          <p className=" block md:hidden underline hover:underline-offset-4 text-blue-500">
                            Update{' '}
                          </p>
                        </Link>{' '}
                      </td>
                      <td className="border-2 md:border-2">
                        <Link
                          to={`${needys.needy_category_id}/${needys.category}`}
                        >
                          <img
                            src={Delete}
                            className="h-5 w-5 mx-auto text-blue-400 hidden underline hover:underline-offset-4 md:block"
                            alt="delete"
                          />
                          <p className=" block md:hidden underline hover:underline-offset-4 text-blue-500">
                            Delete
                          </p>
                        </Link>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {needy.length === 0 ? (
              <p className=" text-center text-red-800">
                No Needy category data found
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
            <h5 className="title"> Create Needy Category</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className=" row w-3/4 min-w-fit mx-auto  ">
                  <Col md="12">
                    <FormGroup>
                      <label>Category Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={needyName}
                        onChange={(e) => setNeedyName(e.target.value)}
                        className=" w-full mb-3 p-3 rounded-md input-round bg-gray-100 "
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className=" mt-3">Description</label>
                      <textarea
                        required
                        name="description"
                        value={needyDescription}
                        onChange={(e) => setNeedyDescription(e.target.value)}
                        className=" form-control rounded-md  bg-gray-100 "
                      ></textarea>
                    </FormGroup>
                  </Col>
                  <button
                    className="  form-control  mt-4 rounded-md text-white  bg-green-800 hover:bg-green-500"
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
