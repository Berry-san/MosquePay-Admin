import React, { useState, useEffect, useMemo } from 'react'
import Search from '../Search/Search'
import { Link } from 'react-router-dom'
import Content from '../Layout/Content/Content'
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

export default function Question() {
  const [questions, setQuestions] = useState([])
  const [onSearch, setonSearch] = useState(true)
  //change
  const [totalItems, setTotalItems] = useState(0)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  useEffect(() => {
    axios
      .get(WEB_BASE + 'list_allquestion', {
        headers: { 'x-api-key': '987655' },
      })
      .then((res) => {
        setQuestions(res.data.result)
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
    let productDetails = questions

    if (search) {
      productDetails = productDetails.filter(
        (comment) =>
          //  comment.user_name.toLowerCase().includes(search.toLowerCase()) ||
          comment.question.toLowerCase().includes(search.toLowerCase()) ||
          comment.category.toLowerCase().includes(search.toLowerCase()) ||
          comment.answer_status.toLowerCase().includes(search.toLowerCase())
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
                  <h5 className="title">Questions</h5>
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
            <div className="p-0 overflow-x-auto card-inner">
              <table className="w-full mx-4 my-6 overflow-scroll overflow-x-scroll text-center table-auto md:ml-0 min-w-max">
                <thead>
                  <tr className="tb-tnx-head border-y-2">
                    <th className="border-2">
                      <span>Name</span>
                    </th>
                    <th className="border-2">
                      <span>Question</span>
                    </th>
                    <th className="border-2">
                      <span>Category</span>
                    </th>
                    <th className="border-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((ques) => (
                    <tr key={ques.question_id} className="border-2 tb-tnx-item">
                      <td className="border-2">{ques.user_name}</td>
                      <td className="border-2">{ques.question}</td>
                      <td className="border-2">{ques.category}</td>
                      <td className="border-2">{ques.insert_dt}</td>
                      <td className="border-2">
                        <Link to={`/answer/${ques.question_id}`}>
                          {ques.answer_status == 0 ? (
                            <span className="p-3 text-white bg-green-900 rounded-md cursor-pointer">
                              Answered
                            </span>
                          ) : (
                            <span className="p-3 text-white bg-red-800 rounded-md cursor-pointer ">
                              Unanswered
                            </span>
                          )}
                        </Link>{' '}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {questions.length === 0 ? (
              <p className="text-center text-red-800 "> No Question asked</p>
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
