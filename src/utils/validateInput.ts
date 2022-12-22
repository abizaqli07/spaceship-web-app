import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export interface InputSpaceshipInterface {
  name: string;
  image: string;
  description: string;
  model: string;
}

export interface UpdateSpaceshipInterface {
  id: string;
  name: string;
  image: string;
  description: string;
  model: string;
}

export interface InputPlanetInterface {
  name: string;
  image: string;
  description: string;
  distance: number;
  is_explored: boolean;
  is_populated: boolean;
}

export interface UpdatePlanetInterface {
  id: string;
  name: string;
  image: string;
  description: string;
  distance: number;
  is_explored: boolean;
  is_populated: boolean;
}

export interface InputScheduleInterface {
  price: number;
  capacity: number;
  planetId: string;
  pilotsId: string;
  spaceshipId: string;
  time_depart: string;
  time_land: string
}

export interface UpdateScheduleInterface {
  id: string;
  price: number;
  capacity: number;
  planetId: string;
  pilotsId: string;
  spaceshipId: string;
  time_depart: string;
  time_land: string;
}

export interface InputBlogInterface {
  title: string;
  description: string;
  link: string;
  image: string
}

export interface UpdateBlogInterface {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string
}

export function inputSpaceshipValidate(values: InputSpaceshipInterface) {
  const error: any = {}

  if (!values.name) {
    error.name = "Required"
  }

  if (!values.description) {
    error.description = "Required"
  }

  if (!values.model) {
    error.model = "Required"
  }

  return error
}

export function updateSpaceshipValidate(values: InputSpaceshipInterface) {
  const error: any = {}

  if (!values.name) {
    error.name = "Required"
  }

  if (!values.description) {
    error.description = "Required"
  }

  if (!values.model) {
    error.model = "Required"
  }

  return error
}

export function inputPlanetValidate(values: InputPlanetInterface) {
  const error: any = {}

  if (!values.name) {
    error.name = "Required"
  }

  if (!values.description) {
    error.description = "Required"
  }

  if (!values.distance) {
    error.model = "Required"
  }

  return error
}

export function updatePlanetValidate(values: UpdatePlanetInterface) {
  const error: any = {}

  if (!values.name) {
    error.name = "Required"
  }

  if (!values.description) {
    error.description = "Required"
  }

  if (!values.distance) {
    error.model = "Required"
  }

  return error
}

export function inputScheduleValidate(values: InputScheduleInterface) {
  const error: any = {}

  if (!values.capacity) {
    error.capacity = "Required"
  }

  if (!values.pilotsId) {
    error.pilotId = "Required"
  }

  if (!values.planetId) {
    error.planetId = "Required"
  }

  if (!values.price) {
    error.price = "Required"
  }
  
  if (!values.time_depart) {
    error.time_depart = "Required"
  }

  if (!values.time_land) {
    error.time_land = "Required"
  } else if( values.time_land < values.time_depart ) {
    error.time_land = "Invalid input"
  }



  return error
}

export function updateScheduleValidate(values: UpdateScheduleInterface) {
  const error: any = {}

  if (!values.capacity) {
    error.capacity = "Required"
  }

  if (!values.pilotsId) {
    error.pilotId = "Required"
  }

  if (!values.planetId) {
    error.planetId = "Required"
  }

  if (!values.price) {
    error.price = "Required"
  }
  
  if (!values.time_depart) {
    error.time_depart = "Required"
  }

  if (!values.time_land) {
    error.time_land = "Required"
  }
  return error
}

export function inputBlogValidate(values: InputBlogInterface) {
  const error: any = {}

  if (!values.title) {
    error.capacity = "Required"
  }

  if (!values.description) {
    error.pilotId = "Required"
  }

  if (!values.link) {
    error.planetId = "Required"
  }

  if (!values.image) {
    error.price = "Required"
  }

  return error
}

export function updateBlogValidate(values: UpdateBlogInterface) {
  const error: any = {}

  if (!values.title) {
    error.capacity = "Required"
  }

  if (!values.description) {
    error.pilotId = "Required"
  }

  if (!values.link) {
    error.planetId = "Required"
  }

  if (!values.image) {
    error.price = "Required"
  }
  
  return error
}