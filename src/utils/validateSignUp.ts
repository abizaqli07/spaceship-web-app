import { GENDER } from '@prisma/client'

export interface FormLoginInterface {
  email: string | null;
  password: string | null;
}

export interface FormRegisterInterface {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

export interface FormRegisterPilotInterface {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  name: string
  datebirth: string
  gender: GENDER
  no_tlp: string
}

export default function loginValidate(values: FormLoginInterface) {
  const errors: any = {}

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 8 || values.password.length > 25) {
    errors.password = "Password must greater than 8 and less than 25 characters"
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password"
  }

  return errors
}

export function registerValidate(values: FormRegisterInterface) {
  const errors: any = {}

  if (!values.username) {
    errors.username = "Required"
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username, dont include space!"
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 8 || values.password.length > 25) {
    errors.password = "Password must greater than 8 and less than 25 characters"
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password"
  }

  if (!values.cpassword) {
    errors.cpassword = "Required"
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password doesnt match"
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid confirm password"
  }

  return errors
}

export function registerPilotValidate(values: FormRegisterInterface) {
  const errors: any = {}

  if (!values.username) {
    errors.username = "Required"
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username, dont include space!"
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 8 || values.password.length > 25) {
    errors.password = "Password must greater than 8 and less than 25 characters"
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password"
  }

  if (!values.cpassword) {
    errors.cpassword = "Required"
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password doesnt match"
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid confirm password"
  }

  return errors
}