import { GetServerSidePropsContext } from 'next/types';
import { InputPlanetInterface } from '../../../utils/validateInput';

import React, { useState } from 'react'
import { Field, FormikProps, useFormik } from 'formik'

import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { trpc } from '../../../utils/trpc';
import AdminLayout from '../../../components/admin/AdminLayout';
import { inputPlanetValidate } from '../../../utils/validateInput';

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

  const formik: FormikProps<InputPlanetInterface> = useFormik<InputPlanetInterface>({
    initialValues: {
      name: "",
      image: "",
      description: "",
      distance: 0,
      is_explored: false,
      is_populated: false
    },
    validate: inputPlanetValidate,
    onSubmit,
  })

  const insertData = trpc.adminRouter.planet.inputPlanet.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: InputPlanetInterface) {
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
          <div className='input__wrapper'>
            <label>Distance Y/L:</label>
            <input
              id='distance'
              placeholder='Input Image'
              type="number"
              className='input__field'
              required
              name="distance"
              value={formik.values.distance}
              onChange={e => { formik.setFieldValue('distance', parseInt(e.target.value)); console.log(e.target.value) }}
            />
            {formik.errors.distance && formik.touched.distance ? <span className='text-rose-500'>{formik.errors.distance}</span> : <></>}
          </div>
          <div className='input__wrapper '>
            <label>Explored ?</label>
            <input 
              type="checkbox"
              className='input__check'
              id="is_explored" 
              {...formik.getFieldProps('is_explored')}
              checked={formik.values.is_explored!}
            />
          </div>
          <div className='input__wrapper '>
            <label>Populated ? :</label>
            <input 
              type="checkbox" 
              className='input__check'
              id="is_populated" 
              {...formik.getFieldProps('is_populated')}
              checked={formik.values.is_populated!}
            />
          </div>

          <div >
            <input className="button__confirm" type="submit" value="Input" />
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}

export default InputSpaceship