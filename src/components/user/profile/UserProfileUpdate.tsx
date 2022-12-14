import { User, passenger } from '@prisma/client'
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
  fullname: string;
  datebirth: string;
  gender: any;
  no_tlp: string;
}

type Props = {
  data: (User & {
    passenger: passenger | null;
  }) | null,
  pass: boolean
}

const UserProfileUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [havePass, setHavePass] = useState<boolean>(props.pass)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editPlanet = trpc.userRouter.profile.upsertUserProfile.useMutation({
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
      fullname: props.data?.passenger ? props.data.passenger.fullname : "",
      datebirth: props.data?.passenger ? props.data.passenger.datebirth.toString() : "",
      gender: props.data?.passenger ? props.data.passenger.gender : "",
      no_tlp: props.data?.passenger ? props.data?.passenger.no_tlp : ""
    },
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
          <div className='button__confirm' onClick={() => {
            setEnableEdit(!enableEdit);
            setHavePass(true)
          }}>{props.data?.passenger ? "Update" : "Create"}</div>
        </div>
        {havePass && (
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className='input__wrapper'>
              <label>Fullname :</label>
              <input
                id='fullname'
                placeholder='Input Name'
                type="text"
                className='input__field'
                disabled={enableEdit}
                {...formik.getFieldProps('fullname')}
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
            <div className='input__container'>
              <label> Datebirth :</label>
              {props.data?.passenger && (
                <div>Date : {props.data.passenger.datebirth.split("T")[0]}</div>
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
                <input className=" button__confirm" type="submit" value="Submit" />
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default UserProfileUpdate