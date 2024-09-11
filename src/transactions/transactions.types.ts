import type { TransactionFilters } from './transaction-filters.types'

export interface ListTransactionsParams {
    max?: number
    sort?: string
    filters?: TransactionFilters
    showCustomFieldIds?: string[]
}

export type ReceiptStatus =
    | 'VALIDATED'
    | 'NOT_VALIDATED'
    | 'ATTACHED'
    | 'MISSING'
    | 'NOT_REQUIRED'
    | 'NOT_ATTACHED'

export type TransactionType = 'CLEAR' | 'DECLINE' | 'AUTHORIZATION' | 'OTHER'

export interface Transaction {
    id: string
    childTransactionIds: string[]
    isLocked: boolean
    isReconciled: boolean
    transactionType: TransactionType
    parentTransactionId: string
    userId: string
    rawMerchantName: string
    merchantName: string
    budgetId: string
    originalAuthTransactionId: string
    isCredit: boolean
    currencyData: {
        receiptRequired: boolean
        reviewRequired: boolean
    }
    occurredTime: Date
    updatedTime: Date
    authorizedTime: Date
    complete: boolean
    pointsAwarded: number
    customFields: Array<{
        id: string
        name: string
        note: string
        isRequired: boolean
        selectedValues: Array<{
            id: string
            value: string
        }>
    }>
    network: 'VISA' | 'MASTERCARD'
    isParent: boolean
    reviews: Array<{
        id: string
        isApproved: boolean
        note: string
        createdTime: Date
        deletedTime: Date
        reviewerId: string
    }>
    amount: number
    transactedAmount: number
    fees: number
    receiptStatus: ReceiptStatus
    matchedClearTransactionId: string
    accountingIntegrationTransactions: Array<{
        id: string
        billable: boolean
        integrationTxId: string
        syncStatus: string
        syncMessage: string
        integrationType: string
        integrationId: string
        transactionRecordId: string
        syncRequestId: string
    }>
    reviewers: Array<{
        approverType:
            | 'ADMIN'
            | 'MANAGER'
            | 'NEXT_MANAGER'
            | 'BUDGET_OWNER'
            | 'BOOKKEEPER'
            | 'SPECIFIC_PERSON'
        reviewedTime: Date
        reviewerId: number
        status: 'WAITING' | 'APPROVED' | 'DENIED'
        userId: string
    }>
    cardId: string
    receiptSyncStatus: 'NOT_SYNCED' | 'SYNCED' | 'SYNC_ERROR' | 'NO_ATTACHMENTS'
    merchantCategoryCode: string
    declineReason?: string
}
