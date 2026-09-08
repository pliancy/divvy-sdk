import { DivvyBase } from '../common/common'
import type { Budget, ListBudgetsParams } from './budgets.types'

export class Budgets extends DivvyBase {
    /**
     * List All Budgets (This method automatically paginates through the results)
     * @param params
     * @returns
     */
    async list(params?: ListBudgetsParams): Promise<Budget[]> {
        const apiParams: ListBudgetsParams & { filters: string } = { ...params, filters: '' }
        if (params?.filters) {
            apiParams.filters = this.stringifyFilters(params.filters)
        }
        return this.paginate<Budget>('/spend/budgets', apiParams)
    }

    /**
     * Get a budget by id
     * @param budgetId
     * @returns
     */
    async get(budgetId: string): Promise<Budget> {
        const { data } = await this.client.get<Budget>(`/spend/budgets/${budgetId}`)
        return data
    }
}
