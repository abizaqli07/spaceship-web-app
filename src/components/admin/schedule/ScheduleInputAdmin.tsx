import { pilots, planet, spaceship } from '@prisma/client'

import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'

import { trpc } from '../../../utils/trpc'
import { InputScheduleInterface, inputScheduleValidate } from '../../../utils/validateInput'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {
  spaceship: spaceship[];
  pilots: pilots[];
  planet: planet[];
}

const ScheduleInputAdmin = (props: Props) => {
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const insertData = trpc.adminRouter.schedule.inputSchedule.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: InputScheduleInterface) {
    insertData.mutate(values)
  }

  const formik: FormikProps<InputScheduleInterface> = useFormik<InputScheduleInterface>({
    initialValues: {
      price: 0,
      capacity: 0,
      planetId: "",
      pilotsId: "",
      spaceshipId: "",
      time_depart: "",
      time_land: "",
    },
    validate: inputScheduleValidate,
    onSubmit,
  })

  return (
    <div>
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
            {formik.errors.planetId && formik.touched.planetId ? <span className='text-rose-500'>{formik.errors.planetId}</span> : <></>}
            <label>Destination :</label>
            <select id="planetId" {...formik.getFieldProps('planetId')} className="input__field">
              <option value="" selected disabled>Select Destination</option>
              {props.planet.map((planet) => {
                return (
                  <option
                    key={planet.id_planet}
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
            <select id="spaceshipId" {...formik.getFieldProps('spaceshipId')} className="input__field">
            <option value="" selected disabled>Select Spaceship</option>
              {props.spaceship.map((spaceship) => {
                return (
                  <option
                    key={spaceship.id_spaceship}
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
            <select id="pilotsId" {...formik.getFieldProps('pilotsId')} className="input__field">
            <option value="" selected disabled>Select Pilots</option>
              {props.pilots.map((pilots) => {
                return (
                  <option
                    key={pilots.id_pilot}
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
              name="capacity"
              value={formik.values.capacity}
              onChange={e => { formik.setFieldValue('capacity', parseInt(e.target.value)); }}
            />
            {formik.errors.capacity && formik.touched.capacity ? <span className='text-rose-500'>{formik.errors.capacity}</span> : <></>}
          </div>

          <div className='input__wrapper'>
            <label> Time Departure :</label>
            <input className='input__date' type="datetime-local" id="time_depart" {...formik.getFieldProps('time_depart')}/>
          </div>

          <div className='input__wrapper'>
            <label> Time Landing :</label>
            <input className='input__date' min={formik.values.time_depart} type="datetime-local" id="time_land" {...formik.getFieldProps('time_land')}/>
          </div>

          <div >
            <input className=" button__confirm" type="submit" value="Input" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleInputAdmin