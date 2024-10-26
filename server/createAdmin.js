
const sequelize = require('./models'); 
const { User } = require('./models'); 
const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    const existingAdmin = await User.findOne({ where: { email: 'adminUser@gmail.com' } });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin', 10); // Replace with a strong password

    const adminUser = await User.create({
      email: 'adminUser@gmail.com', 
      username: 'adminUser',
      password: hashedPassword,
      role: 'admin', 
     
    });

    console.log('Admin user created successfully:', adminUser.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
