const keystone = require('keystone');
const nodemailer = require("nodemailer");

exports = module.exports = class SendEmail {
    async sendEmailToUser(email, type, reportName, ...values){
        console.log('inside sendMail');
        if(email==null||type==null||reportName==null){
            console.log('email is ', email, 'type is ',type, ' report name is ', reportName);
            return;
        }
        /*
            TYPES
            1 = Deadline for renewal
            2 = Expiry date
            3 = Follow up letter
            4 = RE:Follow up letter
         */

        // values is an array and contains all the values for a particular email

        // console.log(process.env);
        let text = '';
        let html = '';

        switch(type){
            case 1:
                text = `Greetings!

                    Just checking up on the latest status of the following document/s:
                        ${reportName}
                    With the expiration date nearing, today is the supposed deadline for its/their renewal, and I was wondering if the application/s for such is/are currently being processed? Hopefully all has been well but if you hit any roadblocks or require any assistance in processing, please leave me a message or call me about your concern so that I, or the team, will be able to assist you.
                    
                    Thank you and kind regards,
                    Anne.
                    
                    (This is an auto-generated message.)`;


                html = `Greetings!

                    Just checking up on the latest status of the following document/s:
                    <ul>
                        <li>
                            ${reportName}
                        </li>
                    </ul>
                     With the expiration date nearing, today is the supposed deadline for its/their renewal, and I was wondering if the application/s for such is/are currently being processed? Hopefully all has been well but if you hit any roadblocks or require any assistance in processing, please leave me a message or call me about your concern so that I, or the team, will be able to assist you.
                    <br/><br/>
                    Thank you and kind regards,<br/>
                    Anne.
                    <br/><br/>
                    (This is an auto-generated message.)`;
                break;

            case 2:
                text = `Greetings!
                    Just checking up on the latest status of the following document/s:
                        ${reportName}
                    With today being the expiration date, I was wondering if this had/these have been processed? 
                    Hopefully it has/they have been settled before today so you won’t have to handle further headaches. If not, however, may I know what the roadblock/s is/are? If you require any assistance in resolving the issue/s, please leave me a message or call me about your concern so that I, or the team, will be able to assist you.
                    
                    Thank you and kind regards,
                    Anne.
                    (This is an auto-generated message.)`;


                html = `Greetings!
                    Just checking up on the latest status of the following document/s:
                    <ul>
                        <li>    
                            ${reportName}
                        </li>
                    </ul>
                    With today being the expiration date, I was wondering if this had/these have been processed? 
                    <br/>
                    Hopefully it has/they have been settled before today so you won’t have to handle further headaches. If not, however, may I know what the roadblock/s is/are? If you require any assistance in resolving the issue/s, please leave me a message or call me about your concern so that I, or the team, will be able to assist you.
                    <br/><br/>
                    Thank you and kind regards,<br/>
                    Anne.
                    <br/><br/>
                    (This is an auto-generated message.)`;
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }

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
            to: email, // list of receivers
            subject: 'Reports update for the month', // Subject line
            text: text, //plain text body
            html: html, //html body
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
    }

};