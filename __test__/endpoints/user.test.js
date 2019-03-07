const supertest = require('supertest')

const app = require('./../../src/app')

const bodyMail = Date.now()

const mail = `john${bodyMail}@gmail.com`

describe('TESTE::Módulo Users', () => {
    test("Deve Listar todos os usuários", async () => {

        const { get } = await supertest(app)

        const data = await get('/users')

        expect(data.status).toBe(200)

        expect(data.body.length).toBeGreaterThan(0)

    })

    test("Deve Adicionar um usuário", async () => {

        const { post } =  supertest(app)

        const user = { name: 'john', mail: `${mail}`, passwd: '123123' }

        console.log(user)

        const data = await post('/users')
            .send(user)

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

        const data = await post('/users').send({ name: 'cleyton', mail: 'john@gmail.com' })

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('A senha é uma campo obrigatório')
    })

    test("Não deve inserir usuário com email ja existente senha", async () => {

        const { post } = supertest(app)

        const data = await post('/users').send({ name: 'cleyton', mail: `${mail}`, passwd: 'teste' })

        expect(data.status).toBe(400)
        expect(data.body.error).toBe('Esse email já esta cadastrado na aplicação')
        
    })

    test("Erro na rota...", async () => {

        const { get } = await supertest(app)

        const data = await get('/usersaa')

        expect(data.status).toBe(404)

    })
})