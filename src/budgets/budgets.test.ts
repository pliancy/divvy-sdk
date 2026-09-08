import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Budgets } from './budgets'
import type { Budget } from './budgets.types'
import axios from 'axios'

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            put: vi.fn(),
            create: vi.fn().mockReturnThis(),
            patch: vi.fn(),
            interceptors: {
                request: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
            },
        },
    }
})

describe('Budgets Class', () => {
    let budgets: Budgets

    beforeEach(() => {
        budgets = new Budgets({
            apiToken: 'test-token',
            env: 'staging',
            apiVersion: 'v3',
        })
    })

    describe('list', () => {
        it('should call paginate method with correct parameters', async () => {
            const mockBudgets: Budget[] = [
                {
                    id: '1',
                    uuid: 'uuid-1',
                    name: 'Infrastructure Budget',
                    description: 'Infra team spend',
                    retired: false,
                    budgetGroup: false,
                },
                {
                    id: '2',
                    uuid: 'uuid-2',
                    name: 'Ops Budget',
                    retired: false,
                    budgetGroup: true,
                },
            ]

            vi.spyOn(budgets as any, 'paginate').mockResolvedValue(mockBudgets)

            const params = {
                max: 50,
                filters: { name: { eq: 'Infrastructure Budget' }, retired: { eq: false } },
            }
            const result = await budgets.list(params)

            expect(result).toEqual(mockBudgets)
            expect((budgets as any).paginate).toHaveBeenCalledWith('/spend/budgets', {
                ...params,
                filters: 'name:eq:"Infrastructure Budget",retired:eq:false',
            })
        })

        it('should stringify parentBudgetId filter', async () => {
            vi.spyOn(budgets as any, 'paginate').mockResolvedValue([])

            await budgets.list({ filters: { parentBudgetId: { eq: 'parent-1' } } })

            expect((budgets as any).paginate).toHaveBeenCalledWith('/spend/budgets', {
                filters: 'parentBudgetId:eq:"parent-1"',
            })
        })

        it('should handle errors from paginate method', async () => {
            const errorMessage = 'Pagination Error'
            vi.spyOn(budgets as any, 'paginate').mockRejectedValue(new Error(errorMessage))

            await expect(budgets.list({ max: 50 })).rejects.toThrow(errorMessage)
        })
    })

    describe('get', () => {
        it('should get a budget by id', async () => {
            const mockBudget: Budget = {
                id: '1',
                uuid: 'uuid-1',
                name: 'Infrastructure Budget',
                retired: false,
                budgetGroup: false,
            }

            vi.spyOn(axios, 'get').mockResolvedValue({ data: mockBudget })

            const result = await budgets.get('1')

            expect(result).toEqual(mockBudget)
            expect(axios.get).toHaveBeenCalledWith('/spend/budgets/1')
        })
    })
})
