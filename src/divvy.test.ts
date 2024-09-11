import { beforeEach, describe, expect, test } from 'vitest'
import { Divvy } from './divvy'
import { Transactions } from './transactions/transactions'
import { CustomFields } from './custom-fields/custom-fields'

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

    test('should have customFields property of type CustomFields', () => {
        expect(divvy.customFields).toBeInstanceOf(CustomFields)
    })
})
