const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../../src/app')

const mail = `john${Date.now()}@gmail.com`
const secretJWT = '123123'
let user;

beforeAll(async () => {
    const data = { name: 'john1', mail: `${Date.now()}@gmail.com`, passwd: '123123' }
    const res = await app.services.user.create(data)
    const paylod = { ...res[0] }
    const token = await jwt.sign(paylod, secretJWT)

    user = { ...paylod, token }
})

describe('TESTE::Módulo Users', () => {
    test("Deve Listar todos os usuários", async () => {

        const { get } = await supertest(app)

        const data = await get('/users')
            .set('Authorization', `Bearer ${user.token}`)

        expect(data.status).toBe(200)

        expect(data.body.length).toBeGreaterThan(0)

    })

    test("Deve Adicionar um usuário", async () => {

        const { post } = supertest(app)

        const userCreate = { name: 'john', mail: `${mail}`, passwd: '123123' }

        const data = await post('/users')
            .send(userCreate)
            .set('Authorization', `Bearer ${user.token}`)

        expect(data.status).toBe(201)
        expect(data.body[0].name).toBe('john')
        expect(data.body[0]).not.toHaveProperty('passwd')

    })

    test("Deve retornar uma senha criptografada", async () => {

        const { post } = supertest(app)

        const result = await post('/users')
            .send({ name: 'Paulo', mail: `${Date.now()}@mail.com`, passwd: '123123' })
            .set('Authorization', `Bearer ${user.token}`)

        expect(result.status).toBe(201)

        const { id } = result.body[0]

        const userDB = await app.services.user.findOne({ id })

        expect(userDB.passwd).not.toBeUndefined()
        expect(userDB.passwd).not.toBe('123123')

    })

    test("Não deve inserir usuário sem nome", async () => {
        const { post } = supertest(app)

        const data = await post('/users')
            .send({ passwd: '123123' })
            .set('Authorization', `Bearer ${user.token}`)

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('Nome é um atributo obrigatório')

    })

    test("Não deve inserir usuário sem email", async () => {

        const { post } = supertest(app)

        const data = await post('/users')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'Cleyton', passwd: 'teste' })

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('Email é um campo obrigatório')

    })

    test("Não deve inserir usuário sem senha", async () => {

        const { post } = supertest(app)

        const data = await post('/users')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'cleyton', mail: 'john@gmail.com' })

        expect(data.status).toBe(400)

        expect(data.body.error).toBe('A senha é uma campo obrigatório')
    })

    test("Não deve inserir usuário com email ja existente senha", async () => {

        const { post } = supertest(app)

        const data = await post('/users')
            .set('Authorization', `Bearer ${user.token}`)
            .send({ name: 'cleyton', mail: `${mail}`, passwd: 'teste' })

        expect(data.status).toBe(400)
        expect(data.body.error).toBe('Esse email já esta cadastrado na aplicação')

    })

    test("Erro na rota...", async () => {

        const { get } = await supertest(app)

        const data = await get('/usersaa')

        expect(data.status).toBe(404)

    })
})