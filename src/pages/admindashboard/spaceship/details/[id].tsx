import { GetServerSidePropsContext } from 'next/types';
import { UpdateSpaceshipInterface } from '../../../../utils/validateInput';

import React, { useState } from 'react'
import { FormikProps, useFormik } from 'formik'
import { useRouter } from 'next/router';

import { getServerAuthSession } from '../../../../server/common/get-server-auth-session';
import { trpc } from '../../../../utils/trpc';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { updateSpaceshipValidate } from '../../../../utils/validateInput';
import SpaceshipUpdate from '../../../../components/admin/spaceship/SpaceshipUpdate';

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

const SpaceshipDetails = (props: Props) => {
  const router = useRouter()
  let { id } = router.query

  const detail = trpc.adminRouter.spaceship.getDetailSpaceship.useQuery({ id: id as string })

  if (detail.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (detail.isError) {
    return (
      <AdminLayout>
        <div className=' p-4 bg-primaryDark flex flex-col gap-4'>
          <div>{detail.error.data?.code}</div>
          <div>{detail.error.message}</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <SpaceshipUpdate data={detail?.data?.spaceship!}/>
    </AdminLayout>
  )
}

export default SpaceshipDetails