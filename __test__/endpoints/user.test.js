const supertest = require('supertest')

const app = require('./../../src/app')

describe('TESTE::Módulo Users', () => {
    test.skip("Deve Listar todos os usuários", async () => {

        const { get } = await supertest(app)

        const data = await get('/users')

        expect(data.status).toBe(200)

        expect(data.body.length).toBeGreaterThan(0)        
    })

    test.only("Deve Adicionar um usuário", async () => {

        const { post } = await supertest(app)

        const bodyMail = Math.random(10).toFixed(3)

        const user = { name: 'john', mail: `john${bodyMail}@gmail.com`, passwd: '123123'}

        const data = await post('/users')
            .send(user)
            .set('Accept', 'application/json')

        expect(data.status).toBe(201)

    })
    test.skip("Erro na rota...", async () => {

        const { get } = await supertest(app)

        const data = await get('/usersaa')
            
        expect(data.status).toBe(404)

    })
})