import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Transactions } from './transactions'
import type { Transaction } from './transactions.types'

describe('Transactions Class', () => {
    let transactions: Transactions

    beforeEach(() => {
        transactions = new Transactions({
            apiToken: 'test-token',
            env: 'staging',
            apiVersion: 'v3',
        })
    })

    describe('list method', () => {
        it('should call paginate method with correct parameters', async () => {
            const mockTransactions: Transaction[] = [
                { id: '1', amount: 100, merchantName: 'Test Merchant' } as Transaction,
                { id: '2', amount: 200, merchantName: 'Another Merchant' } as Transaction,
            ]

            // Mock the paginate method
            vi.spyOn(transactions as any, 'paginate').mockResolvedValue(mockTransactions)

            const params = { max: 50, filters: { cardId: 'card123' } }
            const result = await transactions.list(params)

            expect(result).toEqual(mockTransactions)
            expect((transactions as any).paginate).toHaveBeenCalledWith(
                '/spend/transactions',
                params,
            )
        })

        it('should handle errors from paginate method', async () => {
            const errorMessage = 'Pagination Error'

            // Mock the paginate method to throw an error
            vi.spyOn(transactions as any, 'paginate').mockRejectedValue(new Error(errorMessage))
            await expect(transactions.list({ max: 50 })).rejects.toThrow(errorMessage)
        })
    })
})
