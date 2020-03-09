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
    let  auth = {
        type: 'OAuth2',
        user: '456chaser@gmail.com',
        clientId: '894199172684-p3gu6himk866afhdaavubqj6p0p5oshu.apps.googleusercontent.com',
        clientSecret: 'vGZZkiAVfB5q1pWlOlbN9oIp',
        refreshToken: '1//04cbctpv-HG-7CgYIARAAGAQSNwF-L9IrSsGd-vsiuVRg94BesnKDuq6NlqoXUXI-h3NmjUgLOcRvv7Krnc68DPEGFzxUBaLiPKI',
        accessToken: 'ya29.Il_BByq1jokZ3UnAvR2WAAeiJiIcl2h0xcCw9f-ut-ebxtgNQcCmP02tDFxWP5onJP3G2UU0a-0_LNH47CYnrcNB59JW7xvuX3DGp0JenznEBHsIaqhfLeS87LCCigwh4g',

        // serviceClient: "112704445004685775689",
        // privateKey : "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDwIg08U9nu25pz\nMxWYGXZfM1dYwYyb4+ktApQI0JkJCp/M8pgbZT5TOa653FN6eUmZK3s46rQh9xFs\neRg2onO1lJoMQVFwT0huUKce//wtuTSVacqi0U3I0VxMHAU4ZgX9cAHTUF/+Bsdz\nTfjqfML+lWyYt6gHiJFbL0b8hoJR8rfkTWnP7pzFAiW+HAn8djEwg/qJvMHy4C0+\n822fEGXOOFqIvMVn3qbzXlF1WKG2KSNO/kvOrYL5O5SIT3PlWlCO0aYaoSoJv1NY\naaGsyvmNnDl7/SiRTMHBuj9iyZRvWj6V+8wYkVW8LOpz1Z4g4sRRV8fU8/o1h0Gj\nP+z4w+LBAgMBAAECggEAAh/ub7dVjcV5PJg7hjqyHSA+t7pysRPacFnfj376WD41\nCW7wv3aj/Pz1gV75lXNKkiilKq/5JPX7hWngyi73XiJAKdXVpP6KZ1w9SJoyuJMK\nWapI/lAl11sdWvowBGYv189aQuCpHPe/9ZvRs5xOkOkbUjD9P42H0aEWDn7DbW60\nbV8ndthHkR0nCmf7jnDcA6CJ2+eAzGzj+EJRm7QYvo+jE3yyiRMMjsct9JLXVy6x\nNkTvZ05HasUoNL3XSdJ2lTFapouSC/RNZ2V0jrVOSUeb/6sxxRweUliUkbw5M/x9\nGRGCgEEwip0x3dS1+7k3yozRkiXwLfwwUB1SMC8PKQKBgQD861566EhXo3yYMvhZ\ndyXT1NYmfvFgN/FpwimFtqOICvsLzUVgQi5rEM5U4/mOR3WuvAXs7vNLW70EJBzm\n5zDMOwi3OBa+rOKSYSdbpu3iLPsT/i3EDJ7XMCnA4o3AIFSH1DybhhEAbrb4rxYO\nNhIAtZAkONW2O3W5Q5IPpyGcjQKBgQDzDtAv1Ts7RsVnObA9mqry7YJOvlV46Eyy\nJBrDlPh3o8+Sv3n97vjO0tvul4QCEWu16FnGaxv6YFmAaBY9zZgzHK57iZzxCymU\nX6/HSner2i9VotRRY+b1jtfe+EzHkjWTgjYyxJurEOKzpYcFOuU+cIfFs6YVQcVX\nmBYLPXgkBQKBgDXCKaDiQo4uN8t5+gO6KZYvBR3FmbSj73JVTNIZEgVWoCnQBdEC\nAC/NsK2mj2LImaD8Yh4MZDY+V5zLuED0HxEp8x5Ok7cPtFD8yYrXnnSWrv9+5Wdo\nb1K58AYJoauWs6DzYbaE9pQq9EVDoeJ/Z7Ay52JrmjFTziAE1sTw91n5AoGAUG1Y\naluOrACxFYU7Ukc5xgTdl5zXv5huuIvF524GAeDMsOx3O5W18wpHCF5OqjiFgb4O\n5t9OdL0pIJpQsca0VEVrXymcKw7chWJcUf/MNauO+jFVPFFofVz1Baz4CxnQbK0r\nrgTs1eBSg8uEMDDa5pxp8PuPO312BZQnxzRh6tkCgYEAmHmS5J2s9bFzT7UyWtoY\nwm/8YA+KW5dTxQV9CMVlW+E5lUYWpYbsqAZbu5zgJYbhfI0nglzBaRdWKQjPvgsC\n90W684jJ68y0m93NiQR53YqwTlTJ8o1UVT+Tvai+VFQ2IZCeQ8z/pXabAw4/9Aq3\n5V3/blqXZznUSAY4IkxelvY=\n-----END PRIVATE KEY-----\n",
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: auth,
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