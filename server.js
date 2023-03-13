const express = require("express")
const app = express()
const port = process.env.PORT || 4477
const session = require('express-session')

const setCurrentUser = require("./middlewares/set_current_user")
const logger = require("./middlewares/logger")
const methodOverride = require("./middlewares/method_override")
const dishController = require("./controllers/dish_controller")
const sessionController = require("./controllers/session_controller")
const viewHelpers = require("./middlewares/view_helpers")


app.set("view engine", "ejs")
// order is very important 

app.use(logger)
app.use(express.static("public")) 
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride) // super important to come after the body
app.use(
  session({
  secret: process.env.SESSION_SECRET || "mistyrose",
  resave: false,
  saveUninitialized: true,
}))

// i want currentUser to be available in all my views 
app.use(setCurrentUser)

app.use(viewHelpers)

app.use(sessionController)
app.use(dishController)


app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

/**
 *
 *
 * CRUD     database  http
 * create   insert    post
 * read     select    get
 * update   update    put/patch
 * destroy  delete    delete
 *
 *
 * HTTP is stateless
 *
 * MVC - model view controllers - separation of concerns
 * resources you're working with - dishes, users, comments, venues
 */