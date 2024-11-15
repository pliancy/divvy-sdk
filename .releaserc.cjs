const dateArgs = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

const message = `Release: <%= nextRelease.version %> - <%= new Date().toLocaleDateString('en-US', ${dateArgs}) %> [skip ci]`

module.exports = {
    branches: [
        'main',
        {
            name: 'beta',
            prerelease: true,
        },
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/git', { message }],
        '@semantic-release/github',
        ['@semantic-release/npm'],
    ],
}
