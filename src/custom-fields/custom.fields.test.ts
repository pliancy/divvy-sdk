import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CustomFields } from './custom-fields'
import type { CreateCustomField, CustomField, UpdateCustomField } from './custom-fields.types'
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

describe('CustomFields Class', () => {
    let customFields: CustomFields

    beforeEach(() => {
        customFields = new CustomFields({
            apiToken: 'test-token',
            env: 'staging',
            apiVersion: 'v3',
        })
    })

    describe('list', () => {
        it('should call paginate method with correct parameters', async () => {
            const mockCustomFields: CustomField[] = [
                {
                    id: '1',
                    name: 'Project',
                    description: 'Project associated with the transaction',
                    type: 'CUSTOM_SELECTOR',
                    multiSelect: false,
                    allowCustomValues: false,
                    minimumAmountForRequirement: 0,
                    required: true,
                    global: true,
                },
                {
                    id: '2',
                    name: 'Notes',
                    description: 'Additional notes for the transaction',
                    type: 'NOTE',
                    multiSelect: false,
                    allowCustomValues: true,
                    minimumAmountForRequirement: 0,
                    required: false,
                    global: true,
                },
            ]

            // Mock the paginate method
            vi.spyOn(customFields as any, 'paginate').mockResolvedValue(mockCustomFields)

            const params = { max: 50, filters: { name: { sw: 'test' } } }
            const result = await customFields.list(params)

            expect(result).toEqual(mockCustomFields)
            expect((customFields as any).paginate).toHaveBeenCalledWith('/spend/custom-fields', {
                ...params,
                filters: 'name:sw:"test"',
            })
        })

        it('should handle errors from paginate method', async () => {
            const errorMessage = 'Pagination Error'

            // Mock the paginate method to throw an error
            vi.spyOn(customFields as any, 'paginate').mockRejectedValue(new Error(errorMessage))

            await expect(customFields.list({ max: 50 })).rejects.toThrow(errorMessage)
        })
    })

    describe('create', () => {
        it('should create a new custom field successfully', async () => {
            const mockCreatedCustomField: CustomField = {
                id: '3',
                name: 'New Field',
                description: 'A new custom field',
                type: 'CUSTOM_SELECTOR',
                multiSelect: true,
                allowCustomValues: false,
                minimumAmountForRequirement: 100,
                required: false,
                global: true,
            }

            vi.spyOn(axios, 'post').mockResolvedValue({ data: mockCreatedCustomField })

            const createParams: CreateCustomField = {
                name: 'New Field',
                description: 'A new custom field',
                multiSelect: true,
                allowCustomValues: false,
                minimumAmountForRequirement: 100,
                required: false,
                global: true,
                values: ['Value 1', 'Value 2'],
            }

            const result = await customFields.create(createParams)

            expect(result).toEqual(mockCreatedCustomField)
            expect(axios.post).toHaveBeenCalledWith('/spend/custom-fields', createParams)
        })

        it('should handle errors when creating a custom field', async () => {
            const errorMessage = 'Creation Error'
            vi.spyOn(axios, 'post').mockRejectedValue(new Error(errorMessage))

            const createParams: CreateCustomField = {
                name: 'Error Field',
                allowCustomValues: false,
            }

            await expect(customFields.create(createParams)).rejects.toThrow(errorMessage)
        })
    })

    describe('update method', () => {
        it('should update a custom field successfully', async () => {
            const mockUpdatedCustomField: CustomField = {
                id: '1',
                name: 'Updated Field',
                description: 'An updated custom field',
                type: 'CUSTOM_SELECTOR',
                multiSelect: true,
                allowCustomValues: true,
                minimumAmountForRequirement: 200,
                required: true,
                global: false,
            }

            vi.spyOn(axios, 'patch').mockResolvedValue({ data: mockUpdatedCustomField })

            const updateParams: UpdateCustomField = {
                name: 'Updated Field',
                description: 'An updated custom field',
                allowCustomValues: true,
                minimumAmountForRequirement: 200,
                isRequired: true,
                isGlobal: false,
            }

            const result = await customFields.update('1', updateParams)

            expect(result).toEqual(mockUpdatedCustomField)
            expect(axios.patch).toHaveBeenCalledWith('/spend/custom-fields/1', updateParams)
        })

        it('should handle errors when updating a custom field', async () => {
            const errorMessage = 'Update Error'
            vi.spyOn(axios, 'patch').mockRejectedValue(new Error(errorMessage))

            const updateParams: UpdateCustomField = {
                name: 'Error Field',
            }

            await expect(customFields.update('1', updateParams)).rejects.toThrow(errorMessage)
        })
    })

    describe('createValues method', () => {
        it('should create new custom field values successfully', async () => {
            vi.spyOn(axios, 'post').mockResolvedValue({ data: {} })

            const newValues = ['Value 1', 'Value 2', 'Value 3']

            await customFields.createValues('1', newValues)

            expect(axios.post).toHaveBeenCalledWith('/spend/custom-fields/1/values', {
                values: newValues,
            })
        })

        it('should handle errors when creating custom field values', async () => {
            const errorMessage = 'Create Values Error'
            vi.spyOn(axios, 'post').mockRejectedValue(new Error(errorMessage))

            const newValues = ['Value 1', 'Value 2']

            await expect(customFields.createValues('1', newValues)).rejects.toThrow(errorMessage)
        })
    })
})
