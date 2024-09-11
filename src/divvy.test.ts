import { beforeEach, describe, expect, test } from 'vitest'
import { Divvy } from './divvy'
import { Transactions } from './transactions/transactions'

describe('Divvy', () => {
    let divvy: Divvy

    beforeEach(() => {
        divvy = new Divvy({
            apiToken: 'test-token',
            env: 'staging',
            apiVersion: 'v3',
        })
    })

    test('should have transactions property of type Transactions', () => {
        expect(divvy.transactions).toBeInstanceOf(Transactions)
    })
})
