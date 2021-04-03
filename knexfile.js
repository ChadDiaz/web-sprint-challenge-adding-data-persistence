// do not make changes to this file (except to optionally add seeds)
const sharedConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  typeCast: function (field, next) {
    if (field.type == "TINY" && field.length == 1) {
      return field.string() == "1"; // 1 = true, 0 = false
    }
    return next();
  },
  pool: {
    afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: { filename: "./data/lambda.db3" },
  },
  testing: {
    ...sharedConfig,
    connection: { filename: "./data/test.db3" },
  },
};
