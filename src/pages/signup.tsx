import React from 'react'
import Layout from '../components/SignUp/layout'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '../server/db/client'

import { useState } from 'react';
import { useFormik, FormikProps } from 'formik'
import { FormRegisterInterface, registerValidate } from '../utils/validateSignUp' 
import { trpc } from '../utils/trpc'

import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

import { useRouter } from 'next/router';
import { hash } from 'bcryptjs'

type Props = {}


const SignUp = (props: Props) => {
  const [show, setShow] = useState({ password: false, cpassword: false })
  
  const formik: FormikProps<FormRegisterInterface> = useFormik<FormRegisterInterface>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: ""
    },
    validate: registerValidate,
    onSubmit
  })

  const router = useRouter()
  const { mutate, error } = trpc.signUp.userSignUp.useMutation({
    onSuccess: () => {
      router.push('/signin')
    }
  })

  async function onSubmit(values: { email: string; username: string, password: string }) {
    mutate(values)
  }

  return (
    <Layout>


      <Head>
        <title>Register</title>
      </Head>

      <section className='w-3/4 mx-auto flex flex-col gap-5'>
        <div className="title">
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
          <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
        </div>

        {/* form */}
        <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
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
          {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500 text-xs'>{formik.errors.cpassword}</span> : <></>} */}

          {/* login buttons */}
          <div className="input-button">
            <button type='submit' className="button">
              Sign Up
            </button>
          </div>
        </form>

        {/* bottom */}
        <div className='text-center text-gray-400 '>
          Have an account? <Link href={'/signin'}><div className='text-blue-700'>Login</div></Link>
        </div>
      </section>
    </Layout>
  )
}

export default SignUp