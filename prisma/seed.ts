import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs';
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: "user1@user.com" },
    update: {},
    create: {
      email: "user1@user.com",
      password: await hash("user12345", 12),
      username: "User1",
      passenger: {
        create: {
          fullname: "User User 1",
          datebirth: "2006-03-29T00:00:00.000Z",
          gender: "MALE",
          no_tlp: "082145673387"
        }
      }
    }
  });

  const pilot1 = await prisma.user.upsert({
    where: { email: "pilot1@pilot.com" },
    update: {},
    create: {
      email: "pilot1@pilot.com",
      password: await hash("pilot12345", 12),
      username: "Pilot1",
      role: "PILOT",
      pilots: {
        create: {
          name: "Pilot pilot 1",
          datebirth: "2001-03-29T00:00:00.000Z",
          gender: "MALE",
          no_tlp: "095321786547",
          is_verified: false,

        }
      }
    }
  })

  const admin1 = await prisma.user.upsert({
    where: { email: "admin1@admin.com" },
    update: {},
    create: {
      email: "admin1@admin.com",
      password: await hash("admin12345", 12),
      username: "Admin1",
      role: "ADMIN",
    }
  })

  const spaceship = await prisma.spaceship.createMany({
    data: [
      {
        name: "Interstellar",
        description: "Spaceship from Space - X",
        model: "X"
      },
      {
        name: "Apollo Star",
        description: "Spaceship to explore sun",
        model: "Y"
      },
      {
        name: "Helios",
        description: "Spaceship to explore star",
        model: "M"
      },
    ]
    
  })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  // where: {
  //   date : moment.utc(dateString).toISOString()
  // }