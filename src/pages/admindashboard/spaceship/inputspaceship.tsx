import { GetServerSidePropsContext } from 'next/types';
import { InputSpaceshipInterface } from '../../../utils/validateInput';

import React, { useState } from 'react'
import { FormikProps, useFormik } from 'formik'

import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';
import AdminLayout from '../../../components/admin/AdminLayout';
import { inputSpaceshipValidate } from '../../../utils/validateInput';

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

const InputSpaceship = (props: Props) => {
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const formik: FormikProps<InputSpaceshipInterface> = useFormik<InputSpaceshipInterface>({
    initialValues: {
      name: "",
      image: "",
      description: "",
      model: "",
    },
    validate: inputSpaceshipValidate,
    onSubmit
  })

  const insertData = trpc.adminRouter.spaceship.inputSpaceship.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: InputSpaceshipInterface) {
    insertData.mutate(values)
  }
  
  return (
    <AdminLayout>

      {callback.visible && (
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? callback.data.error : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='input__wrapper'>
            <label>Name :</label>
            <input
              id='name'
              placeholder='Input Name'
              type="text"
              className='input__field'
              required
              {...formik.getFieldProps('name')}
            />
            {formik.errors.name && formik.touched.name ? <span className='text-rose-500'>{formik.errors.name}</span> : <></>}
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
            <label>Model :</label>
            <input
              id='model'
              placeholder='Input Model'
              type="text"
              className='input__field'
              required
              {...formik.getFieldProps('model')}
            />
            {formik.errors.model && formik.touched.model ? <span className='text-rose-500'>{formik.errors.model}</span> : <></>}
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
            <input className=" base__button bg-lime-500 hover:bg-lime-700" type="submit" value="Input" />
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default InputSpaceship