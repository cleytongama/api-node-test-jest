const supertest = require('supertest')

const app = require('./../src/app')

describe('TESTE::Módulo Users', () => {
    test("Deve Listar Usuários", async () => {

        const { get } = await supertest(app)

        const data = await get('/users')

        expect(data.status).toBe(200)
        expect(data.body).toHaveLength(1)
        expect(data.body[0]).toHaveProperty('name', 'cleyton')
        
    })

    test("Deve Adicionar um usuário", async () => {

        const { post } = await supertest(app)

        const user = { name: 'john' }

        const data = await post('/users')
            .send(user)
            .set('Accept', 'application/json')

        expect(data.status).toBe(200)

    })
})