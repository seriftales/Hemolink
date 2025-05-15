// login.js
const {connectDB} = require('../config/db.js');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("login user")
  console.log("email", email)
  try {
    const query = 'SELECT * FROM users WHERE email = $1'; 
    const data = await connectDB()
    const result = await data.query(query, [email]);
    console.log('Result:', result.rows[0]);

    if (!result.rows) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }



    if (result.rows[0].password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log("login user")

    const user = result.rows[0];

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }

    const token = jwt.sign({ id: user.id }, `cokgizli`, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email } });

  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { loginUser };
