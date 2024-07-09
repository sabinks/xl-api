import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
    let roles = ['superadmin', 'admin', 'partner', 'member']
    roles.forEach(async (role) => {
        let roleExists = await prisma.role.findFirst({
            where: {
                name: role
            }
        })
        if (!roleExists) {
            await prisma.role.create({
                data: { name: role }
            })
        }
    });
    const hashPassword = await bcrypt.hash('pass1234', 12);
    let role = await prisma.role.findFirst({ where: { name: 'superadmin' } })
    let data = await prisma.user.create({
        data: {
            username: 'superadmin', displayName: 'superadmin', email: 'superadmin@mail.com', password: hashPassword, active: false,
            userRole: {
                create: {
                    roleId: (await role).id
                }
            },
            data: JSON.stringify({})
        }
    })

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })