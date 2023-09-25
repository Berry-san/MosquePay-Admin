import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import Updatee from '../images/pen-solid.svg'
import qs from 'qs'
import { Link, useNavigate } from 'react-router-dom'
import Content from '../Layout/Content/Content'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
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

export default function Sheikh() {
  const [sheikh, setSheikh] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [modal, setModal] = useState({
    add: false,
  })
  const navigate = useNavigate()
  const [sheikhName, setSheikhName] = useState('')
  const [sheikhEmail, setSheikhEmail] = useState('')
  const [sheikhPassword, setSheikhPassword] = useState('')
  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      axios.post(
        WEB_BASE + 'create_sheikh',
        qs.stringify({
          sheikh_name: sheikhName,
          email: sheikhEmail,
          popular_name: sheikhPassword,
        }),
        { headers: { 'x-api-key': '987654' } }
      )
      alert('Sheikh Created Successfully')
      navigate('/sheikh')
      window.location.reload()
    } catch (err) {
      console.log(err)
      alert('Error in Creating Sheikh')
    }
  }
  useEffect(() => {
    axios
      .get(WEB_BASE + 'list_sheikh', { headers: { 'x-api-key': '987654' } })
      .then((res) => {
        setSheikh(res.data.result)
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
    let productDetails = sheikh

    if (search) {
      productDetails = productDetails.filter((comment) =>
        comment.sheikh_name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(productDetails.length)

    //Current Page slice
    return productDetails.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    )
  }, [sheikh, currentPage, search])

  const header = [
    { label: 'ID', key: 'id' },
    { label: 'sheikh_name', key: 'sheikh_name' },
    { label: 'email', key: 'email' },
    { label: 'status', key: 'status' },
    { label: 'popular_name', key: 'popular_name' },
  ]

  const data = sheikh

  return (
    <div className="w-10/12 pt-20 mx-auto  md:pt-16">
      <Content>
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
                    {/* <p>Add Sheikh</p> */}
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
                  <h5 className="title">Sheikh List</h5>
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
                      place="Search by name "
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
                table="sheikh-table"
                filename="Sheikh"
                sheet="tablexls"
                buttonText="DownLoad Data"
              />
            </div>
            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full my-6 ml-4 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="sheikh-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">
                      <span>Name</span>
                    </th>
                    <th className="border-2">
                      <span>Email</span>
                    </th>
                    <th className="border-2">
                      <span>Status</span>
                    </th>
                    <th className="border-2">
                      <span>Display name</span>
                    </th>
                    <th className="border-2">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((sheikh) => (
                    <tr key={sheikh.id} className="border-2 tb-tnx-item">
                      <td className="border-2">{sheikh.sheikh_name}</td>
                      <td className="border-2">{sheikh.email}</td>
                      <td className="border-2">{sheikh.status}</td>
                      <td className="border-2">{sheikh.popular_name}</td>
                      <td className="border-2">
                        <Link to={`/sheikhupdate/${sheikh.id}`}>
                          <img
                            src={Updatee}
                            className="hidden w-5 h-5 mx-auto text-blue-400 underline  hover:underline-offset-4 md:block"
                            alt="update"
                          />
                          <p className="block text-blue-500 underline  md:hidden hover:underline-offset-4">
                            Update{' '}
                          </p>
                        </Link>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {sheikh.length === 0 ? (
              <p className="text-center text-red-800 ">No Sheikh data found</p>
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
            <h5 className="text-center title"> Create Sheikh Account</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="w-3/4 mx-auto  row min-w-fit">
                  <Col md="12">
                    <FormGroup>
                      <label>Sheikh Name</label>
                      <input
                        type="text"
                        required
                        value={sheikhName}
                        onChange={(e) => setSheikhName(e.target.value)}
                        className="w-full p-3 mb-3 bg-gray-100 rounded-md  input-round"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mt-3 ">Email</label>
                      <input
                        type="email"
                        required
                        value={sheikhEmail}
                        onChange={(e) => setSheikhEmail(e.target.value)}
                        className="w-full p-3 mb-3 bg-gray-100 rounded-md  input-round"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mt-3 ">Popular Name</label>
                      <input
                        type="text"
                        required
                        value={sheikhPassword}
                        onChange={(e) => setSheikhPassword(e.target.value)}
                        className="w-full p-3 mb-3 bg-gray-100 rounded-md  input-round"
                      />
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
