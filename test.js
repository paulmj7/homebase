const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("./homebase.db")

db.serialize(function() {
  db.all("SELECT * FROM workers")
})

db.close()
