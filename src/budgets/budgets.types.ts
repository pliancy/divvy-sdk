export interface Budget {
    /** BILL-generated ID of the budget (deprecated) */
    id: string
    /** BILL-generated UUID of the budget */
    uuid: string
    name: string
    description?: string
    retired: boolean
    /** True if this budget is a budget group (parent of other budgets) */
    budgetGroup: boolean
    /** BILL-generated UUID of the parent budget */
    parentBudgetUuid?: string
    /** BILL-generated ID of the parent budget (deprecated) */
    parentBudgetId?: string
}

/**
 * Interface for Budget filters
 */
export interface BudgetFilters {
    /**
     * Filter by budget name
     * @property {string} eq - Exact match for the budget name
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

    /**
     * Filter by parent budget ID
     * @property {string} eq - Exact match for parent budget ID
     */
    parentBudgetId?: {
        eq: string
    }

    /**
     * Filter by budget group status
     * @property {boolean} eq - Exact match for budget group status
     */
    isBudgetGroup?: {
        eq: boolean
    }

    /**
     * Filter by budget IDs
     * @property {string} eq - Exact match for budget ID
     * @property {string[]} in - Match any of the provided budget IDs
     */
    budgetIds?: {
        eq?: string
        in?: string[]
    }
}

export interface ListBudgetsParams {
    sort?: string
    max?: number
    filters?: BudgetFilters
}
