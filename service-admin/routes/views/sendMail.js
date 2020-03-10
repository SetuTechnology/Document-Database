const nodemailer = require("nodemailer");

module.exports = async (req, res) => {

    let ans = await main().catch(console.error);
    console.log('ans',ans);
    return await res.json({send:ans});
};

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount',testAccount);
   console.log(process.env);

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            // user: 'process.env.GOOGLE_USER',
            // pass: 'process.env.GOOGLE_PASS',
            user: 'rishabhkk55@gmail.com',
            pass: 'ujjwalrk',
        }
    });

    // send mail with defined transport object
    let info = {
        from: '456chaser@gmail.com', // sender address
        to: "rastogiujj12@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: '<h1>hello</h1><p>some test here</p><hr><p>some text here as well</p>'

        // html body
    };

    transporter.sendMail(info, (err, res) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            console.log(JSON.stringify(res));
            return true;
        }
    });

    // console.log("Message sent: %s", info.messageId);
    // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //
    // // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}