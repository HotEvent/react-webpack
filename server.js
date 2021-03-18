const express = require("express");
const { postgraphile } = require("postgraphile");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const app = express();
const postgraphileOptions = {
  // subscriptions: true,
  watchPg: true,
  // dynamicJson: true,
  // setofFunctionsContainNulls: false,
  // ignoreRBAC: false,
  // ignoreIndexes: false,
  // showErrorStack: "json",
  // extendedErrors: ["hint", "detail", "errcode"],
  appendPlugins: [ConnectionFilterPlugin],
  // exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  enableCors: true,
  // allowExplain(req) {
  //   // TODO: customise condition!
  //   return true;
  // },
  // enableQueryBatching: true,
  // legacyRelations: "omit",
  // pgSettings(req) {
  //   /* TODO */
  // },
  graphileBuildOptions: {
    connectionFilterAllowNullInput: true, // default: false
    connectionFilterAllowEmptyObjectInput: true, // default: false
  },
};
app.use(
  postgraphile(
    process.env.DATABASE_URL || "postgres://postgres:123456@localhost:5432/postgres",
    "api",
    postgraphileOptions
  )
);
// app.use(cors());

app.listen(process.env.PORT || 5000);