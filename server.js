const express = require("express");
const cors = require("cors");
const app = express();
const PORT =  8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//After moving production wheather that code is moving to production or not?
app.get("/", (req, res) => {
  return res.send("Server is working Fine");
});


const db = require("./models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
//to create server from which port are u running?
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
