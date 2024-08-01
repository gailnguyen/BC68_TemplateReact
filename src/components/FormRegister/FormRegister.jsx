import React from 'react'
import InputCustom from '../Input/InputCustom'

const FormRegister = () => {
  return (
    <div>
      <h1>Form đăng ký</h1>
      <form>
        <div className='flex flex-wrap'>
          <InputCustom contentLabel={"Họ tên"} name="name" placeHolder="Vui lòng nhập tên" classWrapper='w-1/2'/>
        </div>
      </form>
    </div>
  )
}

export default FormRegister