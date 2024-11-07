import { DivvyBase } from '../common/common'
import type { CreateUserParams as CreateUser, ListUsersParams, User } from './users.types'

export class Users extends DivvyBase {
    /**
     * List All Users (This method automatically paginates through the results)
     * @param params
     * @returns
     */
    async list(params?: ListUsersParams): Promise<User[]> {
        const apiParams: ListUsersParams & { filters: string } = { ...params, filters: '' }
        if (params?.filters) {
            apiParams.filters = this.stringifyFilters(params.filters)
        }
        return this.paginate<User>('/spend/users', apiParams)
    }

    /**
     * Create a new user
     * @param data
     * @returns
     */
    async create(data: CreateUser): Promise<User> {
        const { data: res } = await this.client.post<User>('/spend/users', data)
        return res
    }

    /**
     * Get current user details
     * @returns
     */
    async getCurrent(): Promise<User> {
        const { data } = await this.client.get<User>('/spend/users/current')
        return data
    }

    /**
     * Get user details by ID
     * @param userId
     * @returns
     */
    async get(userId: string): Promise<User> {
        const { data } = await this.client.get<User>(`/spend/users/${userId}`)
        return data
    }

    /**
     * Delete a user
     * @param userId
     */
    async delete(userId: string): Promise<void> {
        await this.client.delete(`/spend/users/${userId}`)
    }
}
