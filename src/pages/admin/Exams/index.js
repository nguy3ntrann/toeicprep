import React from 'react'
import PageTitle from '../../../components/PageTitle'
import { useNavigate } from 'react-router-dom'

function Exams() {
  const navigate = useNavigate()
  return (
    <div>
        <div className='flex justify-between mt-2'>
            <PageTitle title='Exams'></PageTitle>
            <button className='primary-outlined-btn flex item-center'
                onClick={() => navigate("/admin/exams/add")}
            >
                <i className='ri-add-line'></i>
                Add exam
            </button>
        </div>
    </div>
  )
}

export default Exams