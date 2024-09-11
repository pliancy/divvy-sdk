import { Transactions } from './transactions/transactions'
import type { DivvyConfig } from './common/common.types'

export class Divvy {
    transactions: Transactions

    constructor(config: DivvyConfig) {
        this.transactions = new Transactions(config)
    }
}
