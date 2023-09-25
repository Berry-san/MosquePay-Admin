import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import Updatee from '../images/pen-solid.svg'
import qs from 'qs'
import { Link } from 'react-router-dom'
import Content from '../Layout/Content/Content'
import { WEB_BASE } from '../APIBase'
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

export default function Question() {
  const [questions, setQuestions] = useState([])
  const [onSearch, setonSearch] = useState(true)
  const [modal, setModal] = useState({
    add: false,
  })
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [search, setSearch] = useState('')
  const [totalItems, setTotalItems] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  let admin_idd = sessionStorage.getItem('admin_iid')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(question, description)
    try {
      const res = axios.post(
        WEB_BASE + 'create_questioncategory',
        qs.stringify({
          category: question,
          description: description,
          admin_id: admin_idd,
        }),
        {
          headers: {
            'x-api-key': '987655',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Question Created Successfully')
      setQuestion('')
      setDescription('')
    } catch (e) {
      console.log(e.response)
    }
  }

  useEffect(() => {
    axios
      .get(WEB_BASE + 'question_category', {
        headers: { 'x-api-key': '987655' },
      })
      .then((res) => {
        setQuestions(res.data.result)
      })
      .catch((err) => console.log(err))
  }, [])

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch)

  const onFormCancel = () => {
    setModal({ add: false })
  }
  //   // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const productData = useMemo(() => {
    let productDetails = questions

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
  }, [questions, currentPage, search])

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
                  <h5 className="title">Question list</h5>
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
                      place="Search by Category name or description"
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
                table="que-table"
                filename="Questions"
                sheet="tablexls"
                buttonText="DownLoad Data"
              />
            </div>
            <div className="p-0 overflow-x-auto card-inner">
              <table
                className="w-full my-6 ml-4 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max"
                id="que-table"
              >
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">
                      <span>NO</span>
                    </th>
                    <th className="border-2">
                      <span>Category Name</span>
                    </th>
                    <th className="border-2">
                      <span>Description</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((ques, index) => (
                    <tr key={ques.id} className="border-2 tb-tnx-item">
                      <td className="border-2">{index + 1}</td>
                      <td className="border-2">{ques.category}</td>
                      <td className="border-2">{ques.description}</td>
                      <td className="border-2">
                        <Link to={`/questionupdate/${ques.id}`}>
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
            {questions.length === 0 ? (
              <p className="text-center text-red-800 ">
                {' '}
                No Question list data
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
            <h5 className="title"> Create Question Category</h5>
            <div className="mt-4">
              <form onSubmit={handleSubmit}>
                <div className="w-3/4 mx-auto  row min-w-fit">
                  <Col md="12">
                    <FormGroup>
                      <label>Category Name</label>
                      <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="bg-gray-100 rounded-md  form-control"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <label className="mt-3 ">Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-100 rounded-md form-control "
                      ></textarea>
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
