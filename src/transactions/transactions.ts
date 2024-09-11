import { DivvyBase } from '../common/common'
import type { ListTransactionsParams, Transaction } from './transactions.types.js'

export class Transactions extends DivvyBase {
    /**
     * List All Transactions (This method automatically paginates through the results)
     * @param params
     * @returns
     */
    async list(params: ListTransactionsParams): Promise<Transaction[]> {
        const apiParams: ListTransactionsParams & { filters: string } = { ...params, filters: '' }
        if (params?.filters) {
            apiParams.filters = this.stringifyFilters(params.filters)
        }
        return this.paginate<Transaction>('/spend/transactions', apiParams)
    }

    /**
     *  Get a transaction by id
     * @param transactionId
     * @returns
     */
    async get(transactionId: string): Promise<Transaction> {
        const { data } = await this.client.get<Transaction>(`/spend/transactions/${transactionId}`)
        return data
    }
}
