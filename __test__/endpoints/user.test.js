const supertest = require('supertest')

const app = require('./../../src/app')

describe('TESTE::Módulo Users', () => {
    test.skip("Deve Listar todos os usuários", async () => {

        const { get } = await supertest(app)

        const data = await get('/users')

        expect(data.status).toBe(200)

        expect(data.body.length).toBeGreaterThan(0)
    })

    test.skip("Deve Adicionar um usuário", async () => {

        const { post } = await supertest(app)

        const bodyMail = Math.random(10).toFixed(3)

        const user = { name: 'john', mail: `john${bodyMail}@gmail.com`, passwd: '123123' }

        return;

        const data = await post('/users')
            .send(user)
            .set('Accept', 'application/json')

        expect(data.status).toBe(201)

    })

    test("Não deve inserir usuário sem nome", async () => {
        const { post } = supertest(app)

        const data = await post('/users').send({ passwd: '123123' })

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('Nome é um atributo obrigatório')

    })

    test("Não deve inserir usuário sem email", async () => {

        const { post } = supertest(app)

        const data = await post('/users').send({ name: 'Cleyton', passwd: 'teste' })

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('Email é um campo obrigatório')

    })

    test("Não deve inserir usuário sem senha", async () => {

        const { post } = supertest(app)

        const data = await post('/users').send({ name: 'cleyton', mail: 'cleytongama@gmail.com' })


        expect(data.status).toBe(400)
        expect(data.body.error).toBe('A senha é uma campo obrigatório')
    })

    test.skip("Erro na rota...", async () => {

        const { get } = await supertest(app)

        const data = await get('/usersaa')

        expect(data.status).toBe(404)

    })
})