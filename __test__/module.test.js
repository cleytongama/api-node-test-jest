describe('Trabalho com as assertivas do jest', () => {
    test.skip('Verficano assertivas', () => {
        let number = null
        expect(number).toBeNull()
        number = 11
        expect(number).toBe(11)
        expect(number).not.toBeNull()
        expect(number).toBeGreaterThan(1)
        expect(number).toBeLessThan(12)
    })
    
    test.skip(' Trabalhando com objetos', () => {
        let objeto = {name:'Cleyton', email: 'cleytongama@gmail.com'}
        expect(objeto).toHaveProperty('email')
    })
})