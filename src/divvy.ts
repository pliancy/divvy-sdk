import { Transactions } from './transactions/transactions'
import { CustomFields } from './custom-fields/custom-fields'
import type { DivvyConfig } from './common/common.types'
import { Users } from './users/users'

export class Divvy {
    transactions: Transactions
    customFields: CustomFields
    users: Users

    constructor(config: DivvyConfig) {
        this.transactions = new Transactions(config)
        this.customFields = new CustomFields(config)
        this.users = new Users(config)
    }
}
