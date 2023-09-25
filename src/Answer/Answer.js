import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import qs from 'qs'
import { Modal, ModalBody } from 'reactstrap'

import { Icon, Col } from '../component/Component'
import EditorConvertToHTML from '../Teditor/Wysiwyg'
import { WEB_BASE } from '../APIBase'

export default function Answer() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [questionCategory, setQuestionCategory] = useState('')
  const [questionDate, setQuestionDate] = useState('')
  const [answer, setAnswer] = useState('')

  const [modal, setModal] = useState({
    add: true,
  })

  useEffect(() => {
    axios
      .get(WEB_BASE + `single_question/${id}`, {
        headers: { 'x-api-key': '987654' },
      })
      .then((res) => {
        setQuestion(res.data.result[0].question)
        setQuestionCategory(res.data.result[0].category)
        setQuestionDate(res.data.result[0].insert_dt)
      })
  }, [id])
  const sheikh_id = sessionStorage.getItem('sheikh_id')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(id, answer, sheikh_id)
    try {
      const res = axios.post(
        WEB_BASE + 'answer_question',
        qs.stringify({ question_id: id, answer: answer, sheikh_id: sheikh_id }),
        {
          headers: {
            'x-api-key': '987654',
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      console.log(res)
      alert('Campaign Approved Successfully')
      navigate('/campaign')
    } catch (e) {
      console.log(e.response)
    }
  }
  return (
    <div className="w-10/12 mx-auto ">
      <Modal
        isOpen={modal.add}
        toggle={() => setModal({ add: true })}
        className="modal-dialog-centered "
        size="md"
      >
        <ModalBody>
          <Link to="/" className="close">
            <Icon name="cross-sm"></Icon>
          </Link>
          <div className="p-2">
            <h1 className="pb-3 text-center text-gray-500  title">
              {' '}
              Question Details
            </h1>

            <div className="overflow-y-auto ">
              <h3 className="pb-3 ">
                {' '}
                <span className="font-bold "> Question Category:</span>{' '}
                {questionCategory}{' '}
              </h3>
              <h3 className="pb-3 ">
                <span className="font-bold "> Question date:</span>{' '}
                {questionDate}{' '}
              </h3>
              <h3 className="pb-3 ">
                {' '}
                <span className="font-bold "> Question: </span> {question}{' '}
              </h3>

              <h5 className="mt-3 mb-3 text-center text-green-900 ">
                {' '}
                Answer question
              </h5>
              <form onSubmit={handleSubmit} className="mt-4 row gy-4">
                <Col md="12">
                  <EditorConvertToHTML setAnswer={setAnswer} />
                </Col>

                <button
                  className="text-white bg-green-800 rounded-md  form-control hover:bg-green-500"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
