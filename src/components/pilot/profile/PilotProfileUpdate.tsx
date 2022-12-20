import { User, pilots } from '@prisma/client'
import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'
import { trpc } from '../../../utils/trpc'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

interface UpdateUserProfile {
  id_user: string;
  name: string;
  datebirth: string;
  gender: any;
  no_tlp: string;
}

type Props = {
  data: (User & {
    pilots: pilots | null;
  }) | null
}

const PilotProfileUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editPlanet = trpc.pilotRouter.profile.updatePilotProfile.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: UpdateUserProfile) {
    editPlanet.mutate(values)
  }

  const formik: FormikProps<UpdateUserProfile> = useFormik({
    initialValues: {
      id_user: props.data?.id!,
      name: props.data?.pilots?.name!,
      datebirth: props.data?.pilots?.datebirth!,
      gender: props.data?.pilots?.gender!,
      no_tlp: props.data?.pilots?.no_tlp!
    },
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
          <div className='base__button bg-lime-500 hover:bg-lime-700' onClick={() => {
            setEnableEdit(false);
          }}>Update</div>
        </div>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className='input__wrapper'>
              <label>Fullname :</label>
              <input
                id='fullname'
                placeholder='Input Name'
                type="text"
                className='input__field'
                disabled={enableEdit}
                {...formik.getFieldProps('name')}
              />
            </div>
            <div className='input__wrapper'>
              <label>No Telephone :</label>
              <input
                id='no_tlp'
                placeholder='Input Image'
                type="text"
                className='input__field'
                disabled={enableEdit}
                {...formik.getFieldProps('no_tlp')}
              />
            </div>
            <div className='input__wrapper bg-gray-700 p-3 rounded-xl'>
              <label> Datebirth :</label>
              {props.data?.pilots && (
                <div>Date : {props.data?.pilots.datebirth.split("T")[0]}</div>
              )}
              {!enableEdit && (
                <input className='input__field' type="datetime-local" id="time_land" {...formik.getFieldProps('datebirth')} />
              )}
            </div>
            <div className='input__wrapper'>
              <label>Gender :</label>
              <select id="gender" {...formik.getFieldProps('gender')} className="input__field" disabled={enableEdit}>
                <option className='input__field' value="MALE" > Male </option>
                <option className='input__field' value="FEMALE" > Female </option>
              </select>
            </div>

            {!enableEdit && (
              <div>
                <input className=" base__button bg-lime-500 hover:bg-lime-700" type="submit" value="Submit" />
              </div>
            )}
          </form>
      </div>
    </div>
  )
}

export default PilotProfileUpdate