const db = require("./../db") 
// requiring a folder without a file, by default will 
// look for a file named index.js


function setCurrentUser(req, res, next) {

    // req.session.userId // i should have something in there if i'm logggd in
  
    const { userId } = req.session
    res.locals.currentUser = {}
  
    if (userId) {
      // user is logged in - setup currentUser object
  
      const sql = `SELECT id, email FROM users WHERE id = ${userId}`
  
      db.query(sql, (err, dbRes) => {
        if (err) {
          console.log(err);
        } else {
          res.locals.currentUser - dbRes.rows[0]
          next()
        }
      })
  
    } else {
      next()
    }
  }

module.exports = setCurrentUser