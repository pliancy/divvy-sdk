export type UserRole = 'ADMIN' | 'APPROVER' | 'AUDITOR' | 'BOOKKEEPER' | 'MEMBER' | 'NO_ACCESS'

export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    receiptEmail: string
    retired: boolean
    useCompanyMailingAddress: boolean
    smsOptIn: boolean
    hasDateOfBirth: boolean
    role: UserRole
    createdTime: string
}

export interface ListUsersParams {
    max?: number
    nextPage?: string
    prevPage?: string
    filters?: {
        retired?: {
            eq: boolean
        }
    }
}

export interface CreateUserParams {
    firstName: string
    lastName: string
    email: string
    role: 'ADMIN' | 'AUDITOR' | 'BOOKKEEPER' | 'MEMBER'
    dateOfBirth?: string // Format: 'yyyy-MM-dd'
}
