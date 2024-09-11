import type { ReceiptStatus, TransactionType } from './transactions.types'

export interface TransactionFilters {
    /**
     * Filter by card ID
     * @property {string} eq - Exact match for card ID
     * @property {string[]} in - Match any of the provided card IDs
     */
    cardId?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by merchant name
     * @property {string} eq - Exact match for merchant name
     */
    merchantName?: {
        eq: string
    }

    /**
     * Filter by user ID
     * @property {string} eq - Exact match for user ID
     * @property {string[]} in - Match any of the provided user IDs
     */
    userId?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by budget ID
     * @property {string} eq - Exact match for budget ID
     * @property {string[]} in - Match any of the provided budget IDs
     */
    budgetId?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by transaction fees
     * @property {number} lte - Less than or equal to the specified amount
     * @property {number} gte - Greater than or equal to the specified amount
     */
    fees?: {
        lte?: number
        gte?: number
    }

    /**
     * Filter by transaction IDs
     * @property {string} eq - Exact match for transaction ID
     * @property {string[]} in - Match any of the provided transaction IDs
     */
    transactionIds?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by custom field IDs
     * @property {string} eq - Exact match for custom field ID
     * @property {string[]} in - Match any of the provided custom field IDs
     * @note This filter shows only the transactions with the specified custom fields.
     * It does not change which custom fields are shown for each transaction.
     */
    customFieldIds?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by custom field value IDs
     * @property {string} eq - Exact match for custom field value ID
     * @property {string[]} in - Match any of the provided custom field value IDs
     */
    customFieldValueIds?: {
        eq?: string
        in?: string[]
    }

    /**
     * Filter by receipt status
     * @property {ReceiptStatus} eq - Exact match for receipt status
     * @property {ReceiptStatus} ne - Not equal to the specified receipt status
     * @property {ReceiptStatus[]} in - Match any of the provided receipt statuses
     * @property {ReceiptStatus[]} nin - Do not match any of the provided receipt statuses
     */
    receiptStatus?: {
        eq?: ReceiptStatus
        ne?: ReceiptStatus
        in?: ReceiptStatus[]
        nin?: ReceiptStatus[]
    }

    /**
     * Filter by transaction type
     * @property {TransactionType} eq - Exact match for transaction type
     * @property {TransactionType} ne - Not equal to the specified transaction type
     * @property {TransactionType[]} in - Match any of the provided transaction types
     * @property {TransactionType[]} nin - Do not match any of the provided transaction types
     */
    type?: {
        eq?: TransactionType
        ne?: TransactionType
        in?: TransactionType[]
        nin?: TransactionType[]
    }

    /**
     * Filter by transaction occurrence time
     * @property {string} lte - Less than or equal to the specified DateTime (ISO 8601 format)
     * @property {string} gte - Greater than or equal to the specified DateTime (ISO 8601 format)
     */
    occurredTime?: {
        lte?: string
        gte?: string
    }

    /**
     * Filter by locked status
     * @property {boolean} eq - Exact match for locked status
     */
    isLocked?: {
        eq: boolean
    }

    /**
     * Filter by completion status
     * @property {boolean} eq - Exact match for completion status
     */
    complete?: {
        eq: boolean
    }

    /**
     * Filter by transaction amount
     * @property {number} lte - Less than or equal to the specified amount
     * @property {number} gte - Greater than or equal to the specified amount
     */
    amount?: {
        lte?: number
        gte?: number
    }

    /**
     * Filter by review status
     * @property {boolean} eq - Exact match for review status
     */
    isReviewed?: {
        eq: boolean
    }
}
