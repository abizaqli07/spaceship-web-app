import Head from 'next/head'
import Link from 'next/link'
import PilotLayout from '../components/SignUp/pilotLayout'

import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'
import { trpc } from '../utils/trpc'
import { FormRegisterPilotInterface, registerPilotValidate } from '../utils/validateSignUp'

import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi"

import { useRouter } from 'next/router'

type Props = {}


const SignUpPilot = (props: Props) => {
  const [show, setShow] = useState({ password: false, cpassword: false })

  const formik: FormikProps<FormRegisterPilotInterface> = useFormik<FormRegisterPilotInterface>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
      name: "",
      datebirth: "",
      gender: "MALE",
      no_tlp: "",
    },
    validate: registerPilotValidate,
    onSubmit
  })

  const router = useRouter()
  const { mutate, error } = trpc.signUp.pilotSignUp.useMutation({
    onSuccess: (data) => {
      console.log(data)
    }
  })

  async function onSubmit(values: FormRegisterPilotInterface) {
    mutate(values)
  }

  return (
    <PilotLayout>
      <Head>
        <title>Register</title>
      </Head>

      <div className="title text-center w-full">
        <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
        <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
      </div>

      <form className='grid lg:grid-cols-2 gap-8 items-start' onSubmit={formik.handleSubmit}>

        <section className='w-3/4 mx-auto flex flex-col gap-5'>

          {/* form */}
          <div className="input__group">
            <input
              type="text"
              placeholder='Username'
              className="input__text"
              {...formik.getFieldProps('username')}
            />
            <span className='icon flex items-center px-4'>
              <HiOutlineUser size={20} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username ? <span className='text-rose-500 text-xs'>{formik.errors.username}</span> : <></>}
          <div className="input__group">
            <input
              type="email"
              placeholder='Email'
              className="input__text"
              {...formik.getFieldProps('email')}
            />
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={20} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-xs'>{formik.errors.email}</span> : <></>}
          <div className="input__group">
            <input
              type={`${show.password ? "text" : "password"}`}
              placeholder='password'
              className="input__text"
              {...formik.getFieldProps('password')}
            />
            <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-xs'>{formik.errors.password}</span> : <></>}

          <div className={`input__group ${formik.errors.cpassword && formik.touched.cpassword ? "border-rose-600" : ""}`}>
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              placeholder='Confirm Password'
              className="input__text"
              {...formik.getFieldProps('cpassword')}
            />
            <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500 text-xs'>{formik.errors.cpassword}</span> : <></>}

        </section>

        <section className='w-3/4 m-auto flex flex-col gap-5'>
          <div className='input__wrapper'>
            <label>Fullname :</label>
            <div className='input__group'>
              <input
                id='fullname'
                placeholder='Input Name'
                type="text"
                className='input__text outline-[2px]'
                {...formik.getFieldProps('name')}
              />
            </div>
          </div>
          <div className='input__wrapper'>
            <label>No Telephone :</label>
            <div className='input__group'>
              <input
                id='no_tlp'
                placeholder='Input Image'
                type="text"
                className='input__text border'
                {...formik.getFieldProps('no_tlp')}
              />
              <div></div>
            </div>
          </div>
          <div className='input__wrapper'>
            <label> Datebirth :</label>
            <div className='input__group'>
              <input className='input__text border' type="datetime-local" id="time_land" {...formik.getFieldProps('datebirth')} />
            </div>
          </div>
          <div className='input__wrapper'>
            <label>Gender :</label>
            <div className='input__group'>
              <select id="gender" {...formik.getFieldProps('gender')} className="input__text border">
                <option className='input__text border' value="MALE" > Male </option>
                <option className='input__text border' value="FEMALE" > Female </option>
              </select>
            </div>
          </div>
          {/* login buttons */}
          <div className="input-button">
            <button type='submit' className="button">
              Sign Up
            </button>
          </div>
        </section>

      </form>

      {/* bottom */}
      <div className='text-center text-gray-400 '>
        Have an account? <Link href={'/signin'}><div className='text-blue-700'>Login</div></Link>
      </div>
    </PilotLayout >
  )
}

export default SignUpPilot