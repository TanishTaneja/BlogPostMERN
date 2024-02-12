const createMailTransporter = require('./createMailTransporter');

function sendVerificationMail(user) {
    const transporter = createMailTransporter();
    console.log("verification token " + user.verificationToken)
    const mailOptions = {
        from: 'thetanutaneja@gmail.com',
        to: user.email,
        subject: 'Verify your email',
        html: `<h1>Hello ${user.username}</h1>
        <h2>Please verify your email by clicking on the link below</h2>
        <a href="http://localhost:3000/user/verify/${user.verificationToken}">Verify</a>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    });
}
module.exports = sendVerificationMail;