# Divvy SDK

This SDK provides a way to interact with the Divvy API

## Installation

You can install the sdk using npm:

```bash
npm install @pliancy/divvy-sdk
```

Or using yarn:

```bash
yarn add @pliancy/divvy-sdk
```

Or using pnpm:

```bash
pnpm install @pliancy/divvy-sdk
```

## Configuration

To use the SDK, you'll need to initialize it with your API token:

```typescript
import { Divvy } from ' @pliancy/divvy-sdk'

const divvy = new Divvy({
    apiToken: 'your-api-token-here',
    env: 'staging', // or 'production'
    apiVersion: 'v3',
})
```

## Usage

### Transactions

#### List Transactions

You can list transactions with optional filters:

```typescript
const transactions = await divvy.transactions.list({
    max: 50,
    filters: {
        cardId: { in: ['card1', 'card2'] },
        amount: { gte: 100, lte: 500 },
        receiptStatus: { eq: 'VALIDATED' },
        occurredTime: { gte: '2023-01-01T00:00:00Z' },
    },
})
```

#### Get a Single Transaction

To retrieve a single transaction by its ID:

```typescript
const transaction = await divvy.transactions.get('transaction-id-here')
```

### Custom Fields

#### List Custom Fields

You can list custom fields with optional filters:

```typescript
const customFields = await divvy.customFields.list({
    max: 50,
    filters: {
        name: { sw: 'Proj' },
        retired: { eq: false },
    },
})
```

#### Get a Single Custom Field

To retrieve a single custom field by its ID:

```typescript
const customField = await divvy.customFields.get('custom-field-id-here')
```

#### Create a Custom Field

To create a new custom field:

```typescript
const newCustomField = await divvy.customFields.create({
    name: 'Project Code',
    description: 'Project code for this transaction',
    multiSelect: false,
    allowCustomValues: true,
    minimumAmountForRequirement: 0,
    required: true,
    global: false,
    values: ['PROJ001', 'PROJ002', 'PROJ003'],
})
```

#### Update a Custom Field

To update an existing custom field:

```typescript
const updatedCustomField = await divvy.customFields.update('custom-field-id', {
    name: 'Updated Project Code',
    description: 'Updated description',
    isRequired: false,
})
```

#### List Custom Field Values

To list values for a specific custom field:

```typescript
const customFieldValues = await divvy.customFields.listValues('custom-field-id', {
    max: 50,
    filters: {
        // Add any filters if needed
    },
})
```

#### Get a Single Custom Field Value

To retrieve a single custom field value:

```typescript
const customFieldValue = await divvy.customFields.getValue(
    'custom-field-id',
    'custom-field-value-id',
)
```

#### Add Values to a Custom Field

To add new values to an existing custom field:

```typescript
await divvy.customFields.createValues('custom-field-id', ['PROJ004', 'PROJ005'])
```

#### Delete Values from a Custom Field

To delete values from a custom field:

```typescript
await divvy.customFields.deleteValues('custom-field-id', ['value-id-1', 'value-id-2'])
```

## Pagination

All list methods in the SDK handle pagination automatically. You can specify the `max` parameter to control the number of results per page, and the SDK will fetch all pages and return the combined results.

## TypeScript Support

This SDK is written in TypeScript and provides type definitions from the divvy api docs

## Contributing

If you'd like to contribute to the development of this SDK, please make a PR

## License

This SDK is released under the [MIT License](LICENSE).
