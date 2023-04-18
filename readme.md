
# Node Apollo Graphql

This project is created with express.js, prisma, mysql and apollo graphql

## requirements
- Node v15.0.0 or greater
- mysql v8.36.0

## project setup
- environment variables are present in .env.example file create a .env file and copy the .env.example variables in it.
- Create a Database in mysql and add its credential to DATABASE_URL environment vairable
- run the db generate ```npm run generate``` and migrate ```npm run migrate``` 

## installation
```npm install```

## Run app
```npm run dev``` or ```npm start```

## References
- Node.js: https://nodejs.org/en/docs
- PrismaORM: https://www.prisma.io/docs/concepts/database-connectors/mysql
- Express.js: https://expressjs.com/en/5x/api.html
- Apollo server: https://www.apollographql.com/docs/apollo-server/
- graphql: https://graphql.org/learn/
- Mysql: https://dev.mysql.com/doc/refman/8.0/en/