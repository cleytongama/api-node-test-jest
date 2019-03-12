const supertest = require('supertest')
const app = require('../../src/app')
const jwt = require('jsonwebtoken')
const END_POINT = '/accounts'

let user;
const secretJWT = '123123'

beforeAll(async () => {
    const data = { name: 'john1', mail: `${Date.now()}@gmail.com`, passwd: '123123' }
    const res = await app.services.user.create(data)
    const payload = { ...res[0] }

    const token = await jwt.sign(payload, secretJWT)

    user = { ...payload, token }
})

// Cada suit de test deve ser independent...
describe("Módulo :: Accounts", () => {
    test("Deve inserir uma conta com sucesso", async () => {
        const { post } = supertest(app)

        const account = await post(END_POINT)
            .send({ name: 'Acc #1', user_id: user.id })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${user.token}`)

        expect(account.status).toBe(201)
        expect(account.body[0].name).toBe('Acc #1')
    })


    test("Não deve inserir um usuário sem nome", async () => {
        const { post } = supertest(app)
        const account = await post(END_POINT)
            .send({ user_id: user.id })
            .set('Authorization', `Bearer ${user.token}`)

        expect(account.status).toBe(400)
        expect(account.body.error).toBe('Nome é um atributo obrigatório')

    })

    test.skip("Não deve inserir uma conta de nome duplicado, para o mesmo usuário", () => {

    })

    test("Deve Listar todas as contas", async () => {
        const account = await app.db("accounts").insert({
            name: "Acc #2",
            user_id: user.id
        }, '*')

        const { get } = supertest(app)

        const accounts = await get(END_POINT)
            .set('Authorization', `Bearer ${user.token}`)

        expect(accounts.status).toBe(200)
        expect(accounts.body.length).toBeGreaterThan(0)
    })

    test.skip("Deve listar apenas as contas do usuário", () => { })
    test.skip("Não deve retornar a conta de outro usuário", () => { })
    test.skip("Não deve alterar a conta de outro usuário", () => { })
    test.skip("Não deve remover a conta de outro usuário", () => { })

    test("Deve retornar um conta por ID", async () => {

        const account = await app.db('accounts').insert({
            name: "Acc 11",
            user_id: user.id
        }, ['id'])

        const { get } = supertest(app)
        const result = await get(`${END_POINT}/${account[0].id}`)
            .set('Authorization', `Bearer ${user.token}`)

        expect(result.status).toBe(200)
        expect(result.body.name).toBe("Acc 11")
        expect(result.body.user_id).toBe(user.id)

    })

    test("Devo alterar uma conta", async () => {
        const account = await app.db('accounts').insert({
            name: "Acc 11 update",
            user_id: user.id
        }, ['id'])

        const { put } = supertest(app)

        const result = await put(`${END_POINT}/${account[0].id}`)
            .send({ name: 'Acc 11 updated!!!' })
            .set('Authorization', `Bearer ${user.token}`)

        expect(result.status).toBe(200)
        expect(result.body[0].name).toBe('Acc 11 updated!!!')
    })

    test("Deve remover uma conta", async () => {
        const account = await app.db('accounts').insert({
            name: "Acc 11 update",
            user_id: user.id
        }, ['id'])

        const result = await supertest(app)
            .delete(`${END_POINT}/${account[0].id}`)
            .set('Authorization', `Bearer ${user.token}`)

        expect(result.status).toBe(204)

    })

})