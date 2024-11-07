import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { Users } from './users'
import type { CreateUserParams, User } from './users.types'

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            create: vi.fn().mockReturnThis(),
            interceptors: {
                request: { use: vi.fn(), eject: vi.fn() },
                response: { use: vi.fn(), eject: vi.fn() },
            },
        },
    }
})

describe('Users Class', () => {
    let users: Users

    beforeEach(() => {
        vi.clearAllMocks()
        users = new Users({
            apiToken: 'test-token',
            env: 'staging',
            apiVersion: 'v3',
        })
    })

    describe('list', () => {
        it('should list users with filters', async () => {
            const mockUsers: User[] = [
                {
                    id: '1',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com',
                    receiptEmail: 'john@example.com',
                    retired: false,
                    useCompanyMailingAddress: true,
                    smsOptIn: true,
                    hasDateOfBirth: true,
                    role: 'MEMBER',
                    createdTime: '2023-01-01T00:00:00Z',
                },
            ]

            const mockResponse = {
                data: { results: mockUsers },
            }

            vi.spyOn(axios, 'get').mockResolvedValue(mockResponse)

            const result = await users.list({ filters: { retired: { eq: false } } })

            expect(result).toEqual(mockUsers)
            expect(axios.get).toHaveBeenCalledWith('/spend/users', {
                params: { filters: 'retired:eq:false' },
            })
        })
    })

    describe('create', () => {
        it('should create a new user', async () => {
            const mockUser: User = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                receiptEmail: 'john@example.com',
                retired: false,
                useCompanyMailingAddress: true,
                smsOptIn: true,
                hasDateOfBirth: true,
                role: 'MEMBER',
                createdTime: '2023-01-01T00:00:00Z',
            }

            vi.spyOn(axios, 'post').mockResolvedValue({ data: mockUser })

            const createParams: CreateUserParams = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                role: 'MEMBER',
            }

            const result = await users.create(createParams)

            expect(result).toEqual(mockUser)
            expect(axios.post).toHaveBeenCalledWith('/spend/users', createParams)
        })
    })

    describe('getCurrent', () => {
        it('should get current user details', async () => {
            const mockUser: User = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                receiptEmail: 'john@example.com',
                retired: false,
                useCompanyMailingAddress: true,
                smsOptIn: true,
                hasDateOfBirth: true,
                role: 'MEMBER',
                createdTime: '2023-01-01T00:00:00Z',
            }

            vi.spyOn(axios, 'get').mockResolvedValue({ data: mockUser })

            const result = await users.getCurrent()

            expect(result).toEqual(mockUser)
            expect(axios.get).toHaveBeenCalledWith('/spend/users/current')
        })
    })

    describe('get', () => {
        it('should get user details by ID', async () => {
            const mockUser: User = {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                receiptEmail: 'john@example.com',
                retired: false,
                useCompanyMailingAddress: true,
                smsOptIn: true,
                hasDateOfBirth: true,
                role: 'MEMBER',
                createdTime: '2023-01-01T00:00:00Z',
            }

            vi.spyOn(axios, 'get').mockResolvedValue({ data: mockUser })

            const result = await users.get('1')

            expect(result).toEqual(mockUser)
            expect(axios.get).toHaveBeenCalledWith('/spend/users/1')
        })
    })

    describe('delete', () => {
        it('should delete a user', async () => {
            vi.spyOn(axios, 'delete').mockResolvedValue({})

            await users.delete('1')

            expect(axios.delete).toHaveBeenCalledWith('/spend/users/1')
        })
    })
})
