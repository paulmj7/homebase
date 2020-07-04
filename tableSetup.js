const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("./homebase.db")

db.serialize(function() {
  db.run("DROP TABLE [IF EXISTS] users")
  db.run("DROP TABLE [IF EXISTS] workers")
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, f_name TEXT NOT NULL, l_name TEXT NOT NULL, email_address TEXT NOT NULL, password TEXT NOT NULL, secret_key TEXT NOT NULL)")
  db.run("CREATE TABLE workers (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT NOT NULL, pin TEXT NOT NULL, name TEXT NOT NULL, permission TEXT NOT NULL, user TEXT NOT NULL)")
})

db.close()
