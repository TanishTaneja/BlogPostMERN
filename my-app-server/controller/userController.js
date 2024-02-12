const { UserDb } = require("../model/blogpost")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendVerificationMail = require("../utils/sendVerificationmail")

const createToken = (user) => {
    let payload = {
        user: {
            id: user._id,
            isAdmin: user.isAdmin
        }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
        if (err) throw err;
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    });
}

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await UserDb.findOne({ email });
        if (user)
            return res
                .status(400)
                .json({ msg: "User already exists", errorCode: "email" });

        user = await UserDb.findOne({ username });
        if (user)
            return res
                .status(400)
                .json({ msg: "Username already exists", errorCode: "username" });

        //password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new UserDb({
            username,
            email,
            password: hashedPassword,
            isAdmin: false,
            verificationCode: crypto.randomBytes(20).toString('hex')
        });

        await user.save();
        sendVerificationMail(user);

        let payload = {
            user: {
                id: user._id,
                isAdmin: user.isAdmin
            }
        }
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDb.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    console.log(password, user)
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
    let payload = {
        user: {
            id: user._id,
            isAdmin: user.isAdmin
        }
    }
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
        if (err) throw err;
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    });
}


exports.verifyUser = async (req, res) => {
    try {
        const { verificationCode } = req.body.verificationCode;
        if (!verificationCode) return res.status(400).json({ msg: "No verification code provided" });

        const user = await UserDb.findOne({ verificationCode });
        if (!user) return res.status(400).json({ msg: "Invalid verification code" });

        user.verificationCode = null;
        user.isVerified = true;
        await user.save();

        const token = createToken(user);

        res.status(200).json({
            _id: user._id,
            name: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
            isVerified: user.isVerified
        });

        res.json({ msg: "User verified" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }

}

