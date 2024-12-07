const UserController = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const UserController = require('../models/userModel');

// Import any required modules or dependencies here

// Define your controller functions
const registerUser = (req, res) => {
    const { name, email, password, role, phone } = req.body;

    // Encrypt the password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to register user', error: "bycrypt" });
        }

        UserController.findOne({ email })
            .then((user) => {
                if (user) {
                    return res.status(409).json({ message: 'User already exists' });
                }

                const newUser = new UserController({ name, email, password: hashedPassword, role, phone });

                newUser.save()
                    .then(() => {
                        const userData = {
                            name: newUser.name,
                            email: newUser.email,
                            role: newUser.role,
                            phone: newUser.phone
                        };
                        // Generate JWT token
                        const token = jwt.sign({ email: req.body.email, role: req.body.role }, 'your_secret_key_here', { expiresIn: '1h' });
                        res.status(201).json({ message: 'User registered successfully', userData, token });
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({ message: 'Failed to register user', error: err })
                    });
            })
            .catch((error) => res.status(500).json({ message: 'Failed to register user', error: "second catch" }));
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // console.log('Received email:', email); // Debugging
    // console.log('Request body:', req.body); // Debugging

    try {
        // Find user by email
        const user = await UserController.findOne({ email });
        // console.log('Found user:', user); // Debugging

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            'your_secret_key_here',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const updatePassword = (req, res) => {
    const { email, password, newPassword } = req.body;

    UserController.findOne({ email })
        .then((user) => {
            if (user) {
                // Compare the provided password with the stored hashed password
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({ message: 'Failed to update password', error: err });
                    }

                    if (result) {
                        // Encrypt the new password
                        bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
                            if (err) {
                                return res.status(500).json({ message: 'Failed to update password', error: err });
                            }

                            UserController.findOneAndUpdate({ email }, { password: hashedPassword })
                                .then(() => res.status(200).json({ message: 'Password updated successfully' }))
                                .catch((error) => res.status(500).json({ message: 'Failed to update password', error }));
                        });
                    } else {
                        res.status(401).json({ message: 'Invalid password' });
                    }
                });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => res.status(500).json({ message: 'Failed to update password', error }));
};

const viewDetails = (req, res) => {
    const { email } = req.body;

    UserController.findOne({ email })
        .then((user) => {
            if (user) {
                res.status(200).json({ message: 'User details retrieved successfully', user });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => res.status(500).json({ message: 'Failed to retrieve user details', error }));
};


const viewAllDetails = (req, res) => {

    UserController.find()
        .then((users) => {
            if (users.length > 0) {
                res.status(200).json({ message: 'User details retrieved successfully', users });
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        })
        .catch((error) => res.status(500).json({ message: 'Failed to retrieve user details', error }));
};

module.exports = {
    registerUser,
    loginUser,
    updatePassword,
    viewDetails,
    viewAllDetails
};