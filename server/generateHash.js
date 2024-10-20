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
//   '$2b$10$nsNAODq.vv5u7aMDzgabP.ufMh2rMJkHgNysA6t7S4AQocoJkvGzq', 
//   'admin'
// );
//  UPDATE "users" 
//  SET "password" = '$2b$10$nsNAODq.vv5u7aMDzgabP.ufMh2rMJkHgNysA6t7S4AQocoJkvGzq' 
//  WHERE "username" = 'adminUser';

