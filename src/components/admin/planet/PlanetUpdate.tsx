import { planet } from '@prisma/client'
import { FormikProps, useFormik } from 'formik'
import React, { SetStateAction, use, useState } from 'react'
import { TypeOf } from 'zod'
import { trpc } from '../../../utils/trpc'
import { UpdatePlanetInterface, updatePlanetValidate } from '../../../utils/validateInput'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {
  data: planet
}

const SpaceshipUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editPlanet = trpc.adminRouter.planet.updatePlanet.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: UpdatePlanetInterface) {
    editPlanet.mutate(values)
  }

  const formik: FormikProps<UpdatePlanetInterface> = useFormik<UpdatePlanetInterface>({
    initialValues: {
      id: props.data.id_planet,
      name: props.data.name,
      image: props.data.image!,
      description: props.data.description,
      distance: props.data.distance,
      is_explored: props.data.is_explored!,
      is_populated: props.data.is_populated!
    },
    validate: updatePlanetValidate,
    onSubmit
  })

  return (
    <div>
      {callback.visible && (
        <div className=' popup'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? callback.data.error : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div className=' flex flex-col gap-8'>
        <div className='w-full rounded-xl bg-secondaryDark p-3'>
          <div className='button__confirm' onClick={() => setEnableEdit(false)}>Update</div>
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
              disabled={enableEdit}
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
              disabled={enableEdit}
              name="distance"
              value={formik.values.distance}
              onChange={e => { formik.setFieldValue('distance', parseInt(e.target.value)); console.log(e.target.value) }}
            />
            {formik.errors.distance && formik.touched.distance ? <span className='text-rose-500'>{formik.errors.distance}</span> : <></>}
          </div>
          <div className='input__wrapper'>
            <label>Explored ?</label>
            <input
              type="checkbox"
              id="is_explored"
              className='input__check'
              disabled={enableEdit}
              {...formik.getFieldProps('is_explored')}
              checked={formik.values.is_explored!}
            />
          </div>
          <div className='input__wrapper'>
            <label>Populated ? :</label>
            <input
              type="checkbox"
              id="is_populated"
              className='input__check'
              disabled={enableEdit}
              {...formik.getFieldProps('is_populated')}
              checked={formik.values.is_populated!}
            />
          </div>
          <div >
            <input className=" button__confirm" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SpaceshipUpdate