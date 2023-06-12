import React, { useEffect, useState } from 'react'
import { getAllExams } from '../../../apicalls/exams';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import PageTitle from '../../../components/PageTitle';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.users)

  const getExams = async () => {
    try{
      dispatch(ShowLoading());
      const response = await getAllExams()
      if(response.success){
        setExams(response.data)
      } else{
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch(error){
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  useEffect(() => {
    getExams();
  }, [])
  return (
    <div>
      <PageTitle title={
        `Hi ${user.name}, Welcome to TOEIC prep!`
      } />

      <Row gutter={[16,16]}>
        {exams.map((exam) => (
          <Col span={6}>
            <div className='card-lg flex flex-col gap-1 p-2'>
              <h1 className="text-2xl">
                <b>{exam.name}</b>
              </h1>
              <hr />
              <h1 className='text-md'>
                Category: {exam.category}
              </h1>
              <h1 className='text-md'>
                Total Marks: {exam.totalMarks}
              </h1>
              <h1 className='text-md'>
                Passing Marks: {exam.passingMark}
              </h1>
              <h1 className='text-md'>
                Duration: {exam.duration}
              </h1>
              <button className='primary-outlined-btn'
                onClick={() => navigate(`user/write/exam/${exam._id}`)}
              >
                Start Mock Test!
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home