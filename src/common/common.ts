import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { DivvyConfig } from './common.types'

export class DivvyBase {
    protected client: AxiosInstance

    constructor(config: DivvyConfig) {
        const baseURL =
            config.env === 'prod'
                ? `https://gateway.prod.bill.com/connect/${config.apiVersion}`
                : `https://gateway.stage.bill.com/connect/${config.apiVersion}`
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                apiToken: config.apiToken,
            },
        })
    }

    protected async paginate<T>(endpoint: string, params: any): Promise<T[]> {
        let allResults: T[] = []
        let currentParams = { ...params }

        while (true) {
            const response: AxiosResponse<{ results: T[]; nextPage?: string }> =
                await this.client.get(endpoint, { params: currentParams })
            const { results, nextPage } = response.data

            allResults = allResults.concat(results)

            if (nextPage) {
                currentParams = { ...currentParams, nextPage }
            } else {
                break
            }
        }

        return allResults
    }

    /**
     * Generic function to stringify filter objects
     * @param filters - The filter object to stringify
     * @returns A string representation of the filters
     */
    protected stringifyFilters<T extends Record<string, any>>(filters: T): string {
        const parts: string[] = []

        for (const [key, value] of Object.entries(filters)) {
            if (typeof value === 'object' && value !== null) {
                for (const [op, opValue] of Object.entries(value)) {
                    if (opValue !== undefined) {
                        parts.push(`${key}:${op}:${this.stringifyValue(opValue)}`)
                    }
                }
            }
        }

        return parts.join(',')
    }

    /**
     * Converts a value to a string, handling arrays and other types
     * @param value - The value to stringify
     * @returns The stringified value
     */
    private stringifyValue(value: any): string {
        if (Array.isArray(value)) {
            return `"${value.join(',')}"`
        }
        if (typeof value === 'boolean') {
            return value.toString()
        }
        if (typeof value === 'number') {
            return value.toString()
        }
        return `"${value}"`
    }
}
