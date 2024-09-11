import { DivvyBase } from '../common/common'
import type {
    CreateCustomField,
    CustomField,
    CustomFieldValue,
    ListCustomFieldsParams,
    ListCustomFieldValuesParams,
    UpdateCustomField,
} from './custom-fields.types'

export class CustomFields extends DivvyBase {
    /**
     * List All Custom Fields (This method automatically paginates through the results)
     * @param params
     * @returns
     */
    async list(params?: ListCustomFieldsParams): Promise<CustomField[]> {
        const apiParams: ListCustomFieldsParams & { filters: string } = { ...params, filters: '' }
        if (params?.filters) {
            apiParams.filters = this.stringifyFilters(params.filters)
        }
        return this.paginate<CustomField>('/spend/custom-fields', apiParams)
    }

    /**
     * Get a custom field by id
     * @param customFieldId
     * @returns
     */
    async get(customFieldId: string): Promise<CustomField> {
        const { data } = await this.client.get<CustomField>(`/spend/custom-fields/${customFieldId}`)
        return data
    }

    /**
     *  Create a custom field
     * @param data
     * @returns
     */
    async create(data: CreateCustomField): Promise<CustomField> {
        const { data: res } = await this.client.post<CustomField>('/spend/custom-fields', data)
        return res
    }

    /**
     * Update a custom field
     * @param customFieldId
     * @param data
     * @returns
     */
    async update(customFieldId: string, data: UpdateCustomField): Promise<CustomField> {
        const { data: res } = await this.client.patch<CustomField>(
            `/spend/custom-fields/${customFieldId}`,
            data,
        )
        return res
    }

    /**
     *  List values for a custom field  (This method automatically paginates through the results)
     * @param customFieldId
     * @param params
     * @returns
     */
    async listValues(
        customFieldId: string,
        params: ListCustomFieldValuesParams,
    ): Promise<CustomFieldValue[]> {
        const apiParams: ListCustomFieldValuesParams & { filters: string } = {
            ...params,
            filters: '',
        }
        if (params?.filters) {
            apiParams.filters = this.stringifyFilters(params.filters)
        }
        return this.paginate<CustomFieldValue>(
            `/spend/custom-fields/${customFieldId}/values`,
            apiParams,
        )
    }

    /**
     *  Get a value for a custom field
     * @param customFieldId
     * @param customFieldValueId
     * @returns
     */
    async getValue(customFieldId: string, customFieldValueId: string): Promise<CustomFieldValue> {
        const { data } = await this.client.get<CustomFieldValue>(
            `/spend/custom-fields/${customFieldId}/values/${customFieldValueId}`,
        )
        return data
    }

    /**
     * Create values for a custom field
     * @param customFieldId
     * @param values
     */
    async createValues(customFieldId: string, values: string[]): Promise<void> {
        await this.client.post(`/spend/custom-fields/${customFieldId}/values`, { values })
    }

    /**
     *  Delete values from a custom field
     * @param customFieldId
     * @param customFieldValueIds -   Array of custom field value ids to delete
     */
    async deleteValues(customFieldId: string, customFieldValueIds: string[]): Promise<void> {
        await this.client.delete(`/spend/custom-fields/${customFieldId}/values`, {
            data: { values: customFieldValueIds },
        })
    }
}
