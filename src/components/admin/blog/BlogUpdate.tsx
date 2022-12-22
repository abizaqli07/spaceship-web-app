import { blog } from '@prisma/client'
import { FormikProps, useFormik } from 'formik'
import { useState } from 'react'
import { trpc } from '../../../utils/trpc'
import { UpdateBlogInterface, updateBlogValidate } from '../../../utils/validateInput'

interface callbackData {
  visible: boolean
  data: {
    success: boolean
    message: string
    error: any
  } | null
}

type Props = {
  data: blog
}

const BlogUpdate = (props: Props) => {
  const [enableEdit, setEnableEdit] = useState<boolean>(true)
  const [callback, setCallback] = useState<callbackData>({ visible: false, data: null })

  const editPlanet = trpc.adminRouter.blog.updateBlog.useMutation({
    onSuccess(data) {
      setCallback({ visible: true, data: data })
    }
  })

  async function onSubmit(values: UpdateBlogInterface) {
    editPlanet.mutate(values)
  }

  const formik: FormikProps<UpdateBlogInterface> = useFormik<UpdateBlogInterface>({
    initialValues: {
      id: props.data.id_blog,
      title: props.data.title,
      description: props.data.description,
      link: props.data.link,
      image: props.data.image,
    },
    validate: updateBlogValidate,
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
            <label>Title :</label>
            <input
              id='name'
              placeholder='Input Name'
              type="text"
              className='input__field'
              required
              disabled={enableEdit}
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
              disabled={enableEdit}
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
              disabled={enableEdit}
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
              disabled={enableEdit}
              {...formik.getFieldProps('description')}
            ></textarea>
            {formik.errors.description && formik.touched.description ? <span className='text-rose-500'>{formik.errors.description}</span> : <></>}
          </div>
          <div >
            <input className=" button__confirm" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogUpdate