const express = require("express")

const router = express.Router()
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")

const db = require("./../db")

router.get("/", (req, res) => {
  console.log(req.user)
  const sql = "SELECT * FROM dishes;"

  db.query(sql, (err, dbRes) => {
    const dishes = dbRes.rows
    res.render("home", {
      dishes: dishes,
      email: req.session.email,
    })
  })
})
//       |
router.get("/dishes/new", (req, res) => {
  res.render("new_dish")
})
//       |
//       V
router.get("/dishes/:id", ensureLoggedIn, (req, res) => {
  const sql = `select * from dishes where id = $1;`
  console.log(sql)

  db.query(sql, [req.params.id], (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dish = dbRes.rows[0]
      res.render("dishdetails", { dish })
    }
  })
})
//       |
//       V
//       |
//       |
//       V
// post redirect get
// https://en.wikipedia.org/wiki/Post/Redirect/Get
// routes are http method + path
router.post("/dishes", (req, res) => {
  if (!req.session.userId) {
    res.redirect("/login")
    return
  }

  // prepare the SQL we're sending to the database
  const sql = 
  `INSERT INTO dishes (title, image_url,
    user_id) 
  VALUES ($1, $2, $3);`

  db.query(sql, [req.body.title, req.body.image_url, res.locals.currentUser.id], (err, dbRes) => {
    res.redirect("/")
  })
})
//       |
//       |
//       V
router.get("/dishes/:dish_id/edit", (req, res) => {
  // fetch the record for this dish
  // so I can use it in the form in the template

  const sql = `SELECT * FROM dishes WHERE id = ${req.params.dish_id};`

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err)
    } else {
      const dish = dbRes.rows[0]
      res.render("edit_dish", { dish: dish })
    }
  })
})
//       |
//       |
//       V
router.put("/dishes/:dish_id", (req, res) => {
  const sql = `UPDATE dishes SET title = '${req.body.title}', image_url = '${req.body.image_url}' WHERE id = ${req.params.dish_id};`

  db.query(sql, (err, dbRes) => {
    res.redirect(`/dishes/${req.params.dish_id}`)
  })
})
//       |
//       |
//       V
router.delete("/dishes/:dish_id", (req, res) => {
  const sql = `DELETE FROM dishes WHERE id = ${req.params.dish_id};`

  db.query(sql, (err, dbRes) => {
    res.redirect("/")
  })
})

module.exports = router