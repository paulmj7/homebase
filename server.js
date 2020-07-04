const express = require("express")
const path = require("path")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")
const app = express()
const port = 3000
const db = new sqlite3.Database("./homebase.db")
const saltRounds = 10

app.use(express.static(path.join(__dirname, "build")))
app.use(express.json())

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.post("/register", function(req, res) {
  const body = req.body

  bcrypt.hash(body.password, saltRounds, function(err, hash) {
    const sql = "INSERT INTO users (f_name, l_name, email_address, password, secret_key) VALUES (?,?,?,?,?)"
    const key = makeId(20)
    const params = [body.f_name, body.l_name, body.email_address, hash, key]
    db.run(sql, params, function(err) {
      if (err) {
        console.log(err)
        res.json({ "message": "failure" })
      } else {
        res.json({ "message": "success" })
      }
    })
  })
})

app.post("/login", function(req, res) {
  const body = req.body

  const sql = "SELECT * FROM users WHERE email_address=?"
  const params = [body.email_address]
  db.get(sql, params, (err, row) => {
    if (err) {
      console.log(err)
      res.json({ "message": "failure" })
    } else {
      bcrypt.compare(body.password, row.password, (err, result) => {
        if (err) {
          console.log(err)
          res.json({ "message": "failure" })
        } else {
          console.log(row.secret_key)
          res.json({ "message": "success", "f_name": row.f_name, "l_name": row.l_name, "secret_key": row.secret_key })
        }
      })
    }
  })
})

app.post("/workers", function(req, res) {
  const body = req.body

  let sql = "SELECT * FROM users WHERE email_address=? AND secret_key=?"
  let params = [body.email_address, body.secret_key]
  db.get(sql, params, (err, row) => {
    if (err) {
      console.log(err)
      res.json({ "message": "failure" })
    } else {
      if (!row) {
        console.log(row)
        res.json({ "message": "nil" })
      } else {
        sql = "SELECT * FROM workers WHERE user=?"
        params = [body.email_address]
        db.all(sql, params, (err, rows) => {
          if (err) {
            console.log(err)
            res.json({ "message": "failure" })
          } else {
            if (!rows) {
              console.log("inner")
              res.json({ "message": "nil" })
            } else {
              res.json({ "message": "success", "worker": rows })
            }
          }
        })
      }
    }
  })
})

app.post("/workers/add", function(req, res) {
  const body = req.body

  const sql = "INSERT INTO workers (name, url, permission, pin, user) VALUES (?, ?, ?, ?, ?)"
  const params = [body.name, body.url, body.permission, body.pin, body.user]
  db.run(sql, params, function(err) {
    if (err) {
      console.log(err)
      res.json({ "message": "failure" })
    } else {
      res.json({ "message": "success" })
    }
  })
})


function makeId(length) {
  let result = []
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join("");
}
app.listen(port, () => console.log(`Listening on port ${port}`))
