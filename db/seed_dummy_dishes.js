const { Pool } = require("pg")

let dishNames = ["Arepas", "Barbecue Ribs", "Bruschette with Tomato", "Bunny Chow", "Caesar Salad",
 "California Maki", "Caprese Salad", "Cauliflower Penne", "Cheeseburger", "Chicken Fajitas",
 "Chicken Milanese", "Chicken Parm", "Chicken Wings", "Chilli con Carne", "Ebiten maki",
 "Fettuccine Alfredo", "Fish and Chips", "French Fries", "Sausages", "French Toast", "Hummus",
 "Katsu Curry", "Kebab", "Lasagne", "Linguine with Clams", "Massaman Curry", "Meatballs with Sauce",
 "Mushroom Risotto", "Pappardelle alla Bolognese", "Pasta Carbonara", "Pasta and Beans",
 "Pasta with Tomato and Basil", "Peking Duck", "Philadelphia Maki", "Pho", "Pierogi", "Pizza",
 "Poke", "Pork Belly Buns", "Pork Sausage Roll", "Poutine", "Ricotta Stuffed Ravioli",
 "Risotto with Seafood", "Salmon Nigiri", "Scotch Eggs", "Seafood Paella", "Som Tam", "Souvlaki",
 "Stinky Tofu", "Sushi", "Tacos", "Teriyaki Chicken Donburi", "Tiramisù", "Tuna Sashimi",
 "Vegetable Soup"]

const dataB = new Pool({
    database: "goodfoodhunting",
  })


function seedDummyDishes() {

    // creates an array of dish objects with random names from array
    const dishes = []

    for (let i = 0; i < 20; i++) {

      const name = dishNames[Math.floor(Math.random() * dishNames.length)]

      const imageUrl = `http://via.placeholder.com/640x360`

      const dish = { name, imageUrl }
      dishes.push(dish)
    }
  
   
    // loop that inserts each dish into the database
    for (let i = 0; i < dishes.length; i++) {

      const { name, imageUrl } = dishes[i]

      const sql = 'INSERT INTO dishes (title, image_url) VALUES ($1, $2)'

      dataB.query(sql, [name, imageUrl], (err, result) => {

        if (err) {
          console.error(err);
        } else {
          console.log(`Successfully inserted dish with name: ${name}`);
        }
      })
    }
}

// seedDummyDishes();
  


  



