const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config');

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO utilisateurs (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        res.status(201).json({ id: result.insertId, name, email, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM utilisateurs WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
