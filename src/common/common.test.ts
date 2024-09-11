import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { DivvyBase } from './common'

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            put: vi.fn(),
            create: vi.fn().mockReturnThis(),
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

class TestDivvyBase extends DivvyBase {
    public async testPaginate<T>(endpoint: string, params: any) {
        return this.paginate<T>(endpoint, params)
    }
}

describe('DivvyBase Class', () => {
    let divvyBase: TestDivvyBase

    beforeEach(() => {
        vi.clearAllMocks()
        divvyBase = new TestDivvyBase({ apiToken: 'test-token', env: 'staging', apiVersion: 'v3' })
    })

    describe('paginate method', () => {
        it('should handle single page response', async () => {
            const mockData = [{ id: '1' }, { id: '2' }]
            const mockResponse = {
                data: { results: mockData },
            }

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse)

            const result = await divvyBase.testPaginate<any>('/test-endpoint', {})

            expect(result).toEqual(mockData)
            expect(axios.get).toHaveBeenCalledTimes(1)
        })

        it('should handle multiple pages', async () => {
            const mockData1 = [{ id: '1' }]
            const mockData2 = [{ id: '2' }]
            const mockResponse1 = {
                data: { results: mockData1, nextPage: 'page2' },
            }
            const mockResponse2 = {
                data: { results: mockData2 },
            }

            vi.spyOn(axios, 'get')
                .mockResolvedValueOnce(mockResponse1)
                .mockResolvedValueOnce(mockResponse2)

            const result = await divvyBase.testPaginate<any>('/test-endpoint', {})

            expect(result).toEqual([...mockData1, ...mockData2])
            expect(axios.get).toHaveBeenCalledTimes(2)
        })

        it('should handle API errors', async () => {
            const errorMessage = 'API Error'
            vi.spyOn(axios, 'get').mockRejectedValue(new Error(errorMessage))
            await expect(divvyBase.testPaginate<any>('/test-endpoint', {})).rejects.toThrow(
                errorMessage,
            )
        })
    })
})
