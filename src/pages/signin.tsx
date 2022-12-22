import { signIn } from 'next-auth/react'
import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/SignUp/layout'

import { FormikProps, useFormik } from 'formik'
import { useRouter } from 'next/router'
import loginValidate, { FormLoginInterface } from '../utils/validateSignUp'


import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"

const Signin = () => {

  const [show, setShow] = useState(false)
  const router = useRouter()

  const formik: FormikProps<FormLoginInterface> = useFormik<FormLoginInterface>({
    initialValues: {
      email: "",
      password: ""
    },
    validate: loginValidate,
    onSubmit
  })

  async function onSubmit(values: FormLoginInterface) {
    const status = await signIn("multiuser-login", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/redirect"
    });

    if (status?.ok) {
      router.push(status.url!)
    }
  }


  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>

      {/* Title */}
      <section className=' w-3/4 mx-auto flex flex-col gap-10'>
        <div className="title">
          <h1 className='text-3xl font-bold py-4 text-gray-200'>Explore</h1>
          <p className='w-3/4 mx-auto text-gray-400 text-xs'>Login and explore more with us</p>
        </div>

        {/* Form Login */}
        <form className=' flex flex-col gap-3' onSubmit={formik.handleSubmit}>
          <div className="input__group">
            <input
              type="email"
              placeholder='Email'
              className="input__text"
              {...formik.getFieldProps('email')}
            />

            <span className='icon flex items-center px-2'>
              <HiAtSymbol size={20} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span className='text-rose-500 text-xs'>{formik.errors.email}</span> : <></>}

          <div className="input__group">
            <input
              type={`${show ? "text" : "password"}`}
              placeholder='Password'
              className="input__text"
              {...formik.getFieldProps('password')}
            />

            <span className='icon flex items-center px-2' onClick={() => setShow(!show)}>
              <HiFingerPrint size={20} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password ? <span className='text-rose-500 text-xs'>{formik.errors.password}</span> : <></>}

          <div className="input-button">
            <button type='submit' className="button">
              Login
            </button>
          </div>

        </form>

        {/* Bottom */}
        <div className='text-center text-gray-400 '>
          dont have an account yet? <Link href={'/signup'}><div className='text-blue-700'>Sign Up</div></Link>
        </div>
      </section>
    </Layout>
  )
}


export default Signin