import { spaceship } from '@prisma/client'
import { FormikProps, useFormik } from 'formik'
import React, { SetStateAction, use, useState } from 'react'
import { TypeOf } from 'zod'
import { trpc } from '../../../utils/trpc'
import { UpdateSpaceshipInterface, updateSpaceshipValidate } from '../../../utils/validateInput'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {
  data: spaceship
}

const SpaceshipUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editSpaceship = trpc.adminRouter.spaceship.updateSpaceship.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: UpdateSpaceshipInterface) {
    editSpaceship.mutate(values)
  }

  const formik: FormikProps<UpdateSpaceshipInterface> = useFormik<UpdateSpaceshipInterface>({
    initialValues: {
      id: props.data.id_spaceship,
      name: props.data.name,
      image: props.data.image!,
      description: props.data.description,
      model: props.data.model,
    },
    validate: updateSpaceshipValidate,
    onSubmit
  })

  return (
    <div>
      {callback.visible && (
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? callback.data.error : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div className=' flex flex-col gap-8'>
        <div className='w-full rounded-xl bg-gray-600 p-3'>
          <div className='base__button bg-lime-500 hover:bg-lime-700' onClick={() => setEnableEdit(false)}>Update</div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='input__wrapper'>
            <label>Name :</label>
            <input
              id='name'
              placeholder='Input Name'
              type="text"
              className='input__field'
              disabled={enableEdit}
              {...formik.getFieldProps('name')}
            // onChange={(e) => setInitialValues({ ...initialValues, name: e.target.value })}
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
              disabled={enableEdit}
              {...formik.getFieldProps('image')}
              // onChange={(e) => setInitialValues({ ...initialValues, image: e.target.value })}
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
              disabled={enableEdit}
              {...formik.getFieldProps('model')}
              // onChange={(e) => setInitialValues({ ...initialValues, model: e.target.value })}
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
              disabled={enableEdit}
              {...formik.getFieldProps('description')}
              // onChange={(e) => setInitialValues({ ...initialValues, description: e.target.value })}
            ></textarea>
            {formik.errors.description && formik.touched.description ? <span className='text-rose-500'>{formik.errors.description}</span> : <></>}
          </div>
          <div >
            <input className=" base__button bg-lime-500 hover:bg-lime-700" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SpaceshipUpdate