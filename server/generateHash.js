const bcrypt = require('bcrypt');

async function generateHash(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(`Hashed Password: ${hashedPassword}`);
}

generateHash('admin');  


// INSERT INTO "users" (username, email, password, role)
// VALUES (
//   'adminUser', 
//   'admin@example.com', 
//   '$2b$10$NLraawwrgBS.nvoE63fNBuhv.t9c9QK5JFQ.A9Q8kRZ5rXXteXKhi', 
//   'admin'
// );
// UPDATE "users" 
// SET "password" = '$2b$10$NLraawwrgBS.nvoE63fNBuhv.t9c9QK5JFQ.A9Q8kRZ5rXXteXKhi' //admin
// WHERE "username" = 'adminUser';
