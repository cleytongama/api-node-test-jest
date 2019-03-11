const supertest = require('supertest')

const app = require('./../../src/app')

describe("Módule :: Auth", () => {
    test("Deve receber token ao logar", async () => {

        const { post } = supertest(app)

        const mail = `${Date.now()}gmail.com`

        const user = await post('/users')
            .send({ name: 'Cleyton', mail, passwd: '123123' })

        const login = await post('/auth/signin')
            .send({ mail: mail, passwd: '123123' })

        expect(login.status).toBe(200)
        expect(login.body).toHaveProperty('token')

    })

    test("Não deve autenticar usuário com email inválido", async () => {

        const { post } = supertest(app)

        const mail = `${Date.now()}gmail.com`

        await post('/users')
            .send({ name: 'Cleyton', mail, passwd: '123123' })

        const login = await post('/auth/signin')
            .send({ mail: mail + 'senha', passwd: '123123' })

        expect(login.status).toBe(400)
        expect(login.body.error).toBe('Email incorreto, por favor tentar novamente')
    })

    test("Deve inserir um senha válida", async () => {

        const { post } = supertest(app)

        const mail = `${Date.now()}gmail.com`

        await post('/users')
            .send({ name: 'Cleyton', mail, passwd: '123123' })

        const login = await post('/auth/signin')
            .send({ mail: mail, passwd: 'senhaerrada' })

        expect(login.status).toBe(400)
        expect(login.body.error).toBe('Senha incorreta, por favor tentar novamente')
    })

    test("Não deve acessar rota protegida sem token", async () => {
        const { get } = supertest(app)

        const users = await get('/users')

        expect(users.status).toBe(401)
    })

})