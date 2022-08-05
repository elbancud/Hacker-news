<div align="center" display="flex">

<img src="https://phasrmedia.com/wp-content/uploads/2021/01/Funniest-Michael-Scott-Quotes-1-1.png" width="300" height="150"/>
</div>

## Hacker-news-ts

This will be a clone for hacker news via the tutorial of GraphQL TS &amp; Apollo

### Installation

> Typescript: Version under development ^@4.3.5
> Ts-Node: Version under development @^1.1.8

```bash
$ npm init -y
$ npm install --save-dev typescript@latest ts-node@latest
$ touch tsconfig.json
$ npm install apollo-server@latest graphql@latest nexus@latest
```

> @^3.1.1 | @^15.5.1 | 1.1.0

### Href

https://www.howtographql.com/typescript-apollo/1-getting-started/
https://www.howtographql.com/typescript-apollo/2-a-simple-query/

### Technologies

- [Apollo Server](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server) - A GraphQL server
- [Nexus](https://github.com/graphql-nexus/nexus) - For creating typesafe GraphQL Schema
-

### Runs

```bash
$ npx ts-node --transpile-only src/schema /This will generate a schema and typegen
```

### Configs

@package.json

```
'dev': 'ts-node --transpile-only --no-notify --exit-child src/index.ts'
'generate': 'ts-node --transpile-only src/schema.ts'
```

### Terminologies used

- process.cwd() - current working directory
-
