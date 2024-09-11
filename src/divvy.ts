import { Transactions } from './transactions/transactions'
import { CustomFields } from './custom-fields/custom-fields'
import type { DivvyConfig } from './common/common.types'

export class Divvy {
    transactions: Transactions
    customFields: CustomFields

    constructor(config: DivvyConfig) {
        this.transactions = new Transactions(config)
        this.customFields = new CustomFields(config)
    }
}
