import { GetServerSidePropsContext } from 'next/types';
import { InputBlogInterface } from '../../../utils/validateInput';

import React, { useState } from 'react'
import { Field, FormikProps, useFormik } from 'formik'

import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';
import AdminLayout from '../../../components/admin/AdminLayout';
import { inputBlogValidate } from '../../../utils/validateInput';

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {}

export async function getServerSideProps(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerAuthSession(ctx)

  if (!session || session.user?.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/redirect",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const InputBlog = (props: Props) => {
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const formik: FormikProps<InputBlogInterface> = useFormik<InputBlogInterface>({
    initialValues: {
      title: "",
      description: "",
      link: "",
      image: "",
    },
    validate: inputBlogValidate,
    onSubmit,
  })

  const insertData = trpc.adminRouter.blog.inputBlog.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: InputBlogInterface) {
    insertData.mutate(values)
  }

  return (
    <AdminLayout>

      {callback.visible && (
        <div className='popup'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "Error Occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='input__wrapper'>
            <label>Title :</label>
            <input
              id='name'
              placeholder='Input Name'
              type="text"
              className='input__field'
              required
              {...formik.getFieldProps('title')}
            />
            {formik.errors.title && formik.touched.title ? <span className='text-rose-500'>{formik.errors.title}</span> : <></>}
          </div>
          <div className='input__wrapper'>
            <label>Image :</label>
            <input
              id='image'
              placeholder='Input Image'
              type="text"
              className='input__field'
              required
              {...formik.getFieldProps('image')}
            />
            {formik.errors.image && formik.touched.image ? <span className='text-rose-500'>{formik.errors.image}</span> : <></>}
          </div>
          <div className='input__wrapper'>
            <label>Link :</label>
            <input
              id='image'
              placeholder='Input Image'
              type="text"
              className='input__field'
              required
              {...formik.getFieldProps('link')}
            />
            {formik.errors.link && formik.touched.link ? <span className='text-rose-500'>{formik.errors.link}</span> : <></>}
          </div>
          <div className='input__wrapper'>
            <label>Description :</label>
            <textarea
              id="desc"
              cols={30}
              rows={10}
              placeholder="Input Description"
              className=' input__field'
              required
              {...formik.getFieldProps('description')}
            ></textarea>
            {formik.errors.description && formik.touched.description ? <span className='text-rose-500'>{formik.errors.description}</span> : <></>}
          </div>
          

          <div >
            <input className="button__confirm" type="submit" value="Input" />
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default InputBlog