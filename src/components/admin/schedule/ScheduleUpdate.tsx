import { planet, schedule, spaceship, pilots } from '@prisma/client'
import { FormikProps, useFormik } from 'formik'
import React, { SetStateAction, use, useState } from 'react'
import { TypeOf } from 'zod'
import { trpc } from '../../../utils/trpc'
import { UpdateScheduleInterface, updateScheduleValidate } from '../../../utils/validateInput'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {
  data: schedule & {
    spaceship: spaceship;
    destination: planet;
    pilot: pilots;
  }
  spaceship: spaceship[];
  pilots: pilots[];
  planet: planet[];
}

const SscheduleUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editSchedule = trpc.adminRouter.schedule.updateSchedule.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: UpdateScheduleInterface) {
    editSchedule.mutate(values)
  }

  const formik: FormikProps<UpdateScheduleInterface> = useFormik<UpdateScheduleInterface>({
    initialValues: {
      id: props.data.id_schedule,
      price: parseFloat(`${props.data.price}`),
      capacity: props.data.capacity,
      planetId: props.data.planetId,
      pilotsId: props.data.pilotsId,
      spaceshipId: props.data.spaceshipId,
      time_depart: props.data.time_depart.toString(),
      time_land: props.data.time_land.toString(),
    },
    validate: updateScheduleValidate,
    onSubmit
  })

  return (
    <div>
      {callback.visible && (
        <div className=' p-4 bg-gray-600 flex flex-col gap-4'>
          <div>{callback.data?.message}</div>
          <div>{callback.data?.error ? "error occured" : ""}</div>
          <div className=' flex gap-3'>
            <div className='base__button bg-gray-500 hover:bg-gray-700 w-fit' onClick={() => setCallback({ visible: false, data: null })}>Close</div>
          </div>
        </div>
      )}

      <div>
        <div className='w-full rounded-xl bg-gray-600 p-3'>
          <div className='base__button bg-lime-500 hover:bg-lime-700' onClick={() => setEnableEdit((prev) => { return !prev })}>Update</div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='input__wrapper'>
            {formik.errors.planetId && formik.touched.planetId ? <span className='text-rose-500'>{formik.errors.planetId}</span> : <></>}
            <label>Destination :</label>
            <select id="planetId" {...formik.getFieldProps('planetId')} className="input__field" disabled={enableEdit}>
              {props.planet.map((planet) => {
                return (
                  <option
                    className='input__field'
                    value={planet.id_planet}
                  > {planet.name} </option>
                )
              })}
            </select>
          </div>

          <div className='input__wrapper'>
            {formik.errors.spaceshipId && formik.touched.spaceshipId ? <span className='text-rose-500'>{formik.errors.spaceshipId}</span> : <></>}
            <label>Spaceship :</label>
            <select id="spaceshipId" {...formik.getFieldProps('spaceshipId')} className="input__field" disabled={enableEdit}>
              {props.spaceship.map((spaceship) => {
                return (
                  <option
                    className='input__field'
                    value={spaceship.id_spaceship}
                  > {spaceship.name} </option>
                )
              })}
            </select>
          </div>

          <div className='input__wrapper'>
            {formik.errors.pilotsId && formik.touched.pilotsId ? <span className='text-rose-500'>{formik.errors.pilotsId}</span> : <></>}
            <label>Name :</label>
            <select id="pilotsId" {...formik.getFieldProps('pilotsId')} className="input__field" disabled={enableEdit}>
              {props.pilots.map((pilots) => {
                return (
                  <option
                    className='input__field'
                    value={pilots.id_pilot}
                  > {pilots.name} </option>
                )
              })}
            </select>
          </div>

          <div className='input__wrapper'>
            <label>Price :</label>
            <input
              id='price'
              placeholder='Input Image'
              type="number"
              className='input__field'
              required
              disabled={enableEdit}
              name="price"
              value={formik.values.price}
              onChange={e => { formik.setFieldValue('price', parseInt(e.target.value)); }}
            />
            {formik.errors.price && formik.touched.price ? <span className='text-rose-500'>{formik.errors.price}</span> : <></>}
          </div>

          <div className='input__wrapper'>
            <label>Capacity :</label>
            <input
              id='capacity'
              placeholder='Input Image'
              type="number"
              className='input__field'
              required
              disabled={enableEdit}
              name="capacity"
              value={formik.values.capacity}
              onChange={e => { formik.setFieldValue('capacity', parseInt(e.target.value)); }}
            />
            {formik.errors.capacity && formik.touched.capacity ? <span className='text-rose-500'>{formik.errors.capacity}</span> : <></>}
          </div>


          <div className='input__wrapper bg-gray-700 p-3 rounded-xl'>
            <label> Time Departure :</label>
            <div>Date : {props.data.time_depart.toJSON().split("T")[0]}</div>
            <div>Time : {props.data.time_depart.toJSON().split("T")[1]}</div>
            {!enableEdit && (
              <input className='input__field' type="datetime-local" id="time_depart" {...formik.getFieldProps('time_depart')} disabled={enableEdit} />
            )
            }
          </div>

          <div className='input__wrapper bg-gray-700 p-3 rounded-xl'>
            <label> Time Landing :</label>
            <div>Date : {props.data.time_land.toJSON().split("T")[0]}</div>
            <div>Time : {props.data.time_land.toJSON().split("T")[1]}</div>
            {!enableEdit && (
              <input className='input__field' type="datetime-local" id="time_land" {...formik.getFieldProps('time_land')} disabled={enableEdit} />
            )}
          </div>

          {!enableEdit && (
            <div>
              <input className=" base__button bg-lime-500 hover:bg-lime-700" type="submit" value="Input" />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SscheduleUpdate