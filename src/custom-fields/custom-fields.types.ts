export interface CustomField {
    id: string
    name: string
    description: string
    type: 'CUSTOM_SELECTOR' | 'NOTE'
    multiSelect: boolean
    allowCustomValues: boolean
    minimumAmountForRequirement: number
    required: boolean
    global: boolean
}

/**
 * Interface for CustomField filters
 */
export interface CustomFieldFilters {
    /**
     * Filter by custom field name
     * @property {string} eq - Exact match for the custom field name
     * @property {string} sw - Starts with the specified string
     */
    name?: {
        eq?: string
        sw?: string
    }

    /**
     * Filter by retired status
     * @property {boolean} eq - Exact match for retired status
     */
    retired?: {
        eq: boolean
    }
}

export interface ListCustomFieldsParams {
    sort?: string
    max?: number
    filters?: CustomFieldFilters
}

export interface CreateCustomField {
    name: string
    description?: string
    multiSelect?: boolean
    allowCustomValues: boolean
    minimumAmountForRequirement?: number
    required?: boolean
    global?: boolean
    values?: string[]
    selectedBudgetIds?: string[]
    requiredBudgetIds?: string[]
}

export interface UpdateCustomField {
    name?: string
    description?: string
    allowCustomValues?: boolean
    minimumAmountForRequirement?: number
    isRequired?: boolean
    isGlobal?: boolean
}

export interface ListCustomFieldValuesParams {
    filters?: {
        name?: {
            eq?: string
            sw?: string
        }
    }
    max?: number
}

export interface CustomFieldValue {
    id: string
    value: string
    deleted: boolean
}
