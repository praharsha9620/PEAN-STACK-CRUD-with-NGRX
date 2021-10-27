# Knex router

Small and to the point: use this Express router if you want a light way to have your database exposed as a JSON Restful API

For example:

- ```GET https://my.site/knex/users``` could return ```[{id: 1, name: 'John'}, {id: 2, name: 'Sue'}]```
- ```GET https://my.site/knex/users/2``` would return ```{id: 2, name: 'Sue'}```
- ```DELETE https://my.site/knex/users/1``` would remove John (user with ID 1) from your database.

## Install

npm i --save knex-router

## Setting it up

Asumming the usual express and Knex settings, you would have to do something like this:

```javascript
  // import the module
  const knexRouter = require("./knexRouter");
  // import and set knex up
  const knex = require("knex")(...settings...);
  // use knex-router as a middleware, providing the knex instance
  app.use("/knex", knexRouter({ knex: knex }));
```

## Routes available

This router provides the four basic DML operations (CRUD, or create, read, update and delete) through the HTTP verbs GET, POST, PUT and DELETE.

### Fetch all records from a table

Invoking

```GET https://my.site/knex/users``` 

will perform

```sql
SELECT * FROM users
```

and return the result as a JSON array.

### Fetch one record by its primary key

Invoking

```GET https://my.site/knex/users/33``` 

will perform

```sql
SELECT * FROM users WHERE id = 33
```

and return the result as a JSON object.

### Creating a new record

Invoking

```POST https://my.site/knex/users``` 

will perform

```sql
INSERT INTO users (col1, col2) VALUES (1, 2)
```

using as values the ones provided in the HTTP POST request body.

### Updating an existing record

Invoking

```PUT https://my.site/knex/users/47``` 

will perform

```sql
UPDATE users SET col1 = 'ab', col2 = 'cd' WHERE id = 47
```

using as values the ones provided in the HTTP request body.

### Erasing a record by its ID

Invoking

```DELETE http://my.site/knex/users/83```

will perform

```sql
DELETE FROM users WHERE id = 83
```

and return the result Knex gives as JSON.

**IMPORTANT**: All this routes assume that the route name is the same as the table name, and that the primary key column is named ```id``` (if this isn't the case it can be customized, see next section)

### Error handling

By default all requests handle the errors with ```console.error``` and sending a response status HTTP 500, and the error object as JSON.

### Special cases

If your primary key is not called **id** -as the module uses by default- you can specify its name, on each call, with the URL query param **idColumn**.
For example, if you call

```GET https://mysite.com/knex/users/3?idColumn=user_id```

it would yield the following SQL query:

```sql
SELECT * FROM users where user_id = 3
```

## Security

If you want to secure this router's routes, you can add any security middleware.

```javascript
  app.use("/knex", authMiddleware, knexRouter({ knex: app.knex }));
```

## More customized routes

Build your own, this is supposed to be small and simple!

## Cache

All routes have implemented a cache preventing mechanism. No cache here!

## Coming soon

- CI/CD validations and badges
- Unit tests
- LIMIT & OFFSET
- Basic WHERE filtering
- Ordering
- Logging (now is logging to console...)

## Author

@luispablo
