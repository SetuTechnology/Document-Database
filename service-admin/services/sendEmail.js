const keystone = require('keystone');
const nodemailer = require("nodemailer");

exports = module.exports = class SendEmail {
    async sendEmailToUser(data, type){
        console.log('inside sendMail');
        if(data.ProcessorEmailAddress==null||type==null||data.Document==null||type<0||type>4){
            console.log('email is ', data.ProcessorEmailAddress, 'type is ',type, ' report name is ', data.Document);
            return false;
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
            case '1':
                text =`Hello ${data.Processor} !

                    Could you please inform me of the current status and timeline of these documents?
                       ${data.Document}
                    With the date of expiry nearing, now would be the ideal time to process the application/s for such. If ever you require any assistance, please do not hesitate to call or message me so that I, or the team, would be able to assist you.
                                        
                    Thank you and best regards!
                    
                    (This is an auto-generated message.)`;


                html = `Hello ${data.Processor} !<br>

                Could you please inform me of the current status and timeline of these documents?<br>
                    <li><ul>${data.Document}</ul></li>
                With the date of expiry nearing, now would be the ideal time to process the application/s for such. If ever you require any assistance, please do not hesitate to call or message me so that I, or the team, would be able to assist you.
                <br><br>
                Thank you and best regards!
                 <br><br>
                (This is an auto-generated message.)`;
                break;

            case '2':
                text = `Hello, ${data.Processor} !
                        Could you please inform me of the current status and timeline of these documents?
                            ${data.Document}
                        Given that today is the expiration date of such document/s, I was wondering if this has/these
                        have already been processed? If not, may I know what the issue is? If ever you require any assistance, please do not hesitate to call or message me so that I, or the team, would be able to assist you.
                       
                        Thank you and best regards!
                        (This is an auto-generated message.)`;


                html = `Hello, ${data.Processor} !<br>
                        Could you please inform me of the current status and timeline of these documents?<br>
                            <li><ul>${data.Document}</ul></li>
                        Given that today is the expiration date of such document/s, I was wondering if this has/these have already been processed? If not, may I know what the issue is? If ever you require any assistance, please do not hesitate to call or message me so that I, or the team, would be able to assist you.
                        <br><br>
                        Thank you and best regards!
                        <br><br>
                        (This is an auto-generated message.)`;
                break;
            case '3':
                text = `${new Date().toJSON().slice(0,10)}
                
                        ${data.Agency}
                        ${data.Address}
                        To whom it may concern:
                        
                        This letter is just to remind you about our application for ${data.Document}. The deadline is almost upon us and we are concerned of the possible delay. We are enclosing a duplicate application
                        and/or renewal form in case the original form and documents have been misplaced. Please have these reviewed, and if you need any further information or verification regarding this matter, you
                        may contact me through ${data.ProcessorContactNo} or ${data.ProcessorEmailAddress} – preferably the former – at your earliest convenience. Thank you for your cooperation.
                        
                        Regards,
        
                        _______________
                        ${data.Processor}`;

                html = `${new Date().toJSON().slice(0,10)}
                        <br><br>
                        ${data.Agency}<br>
                        ${data.Address}<br>
                        To whom it may concern:
                        <br/>
                        This letter is just to remind you about our application for ${data.Document}. The deadline is almost upon us and we are concerned of the possible delay. We are enclosing a duplicate application
                        and/or renewal form in case the original form and documents have been misplaced. Please have these reviewed, and if you need any further information or verification regarding this matter, you
                        may contact me through ${data.ProcessorContactNo} or ${data.ProcessorEmailAddress} – preferably the former – at your earliest convenience. Thank you for your cooperation.
                        <br><br>
                        Regards,
                        <br/><br/>
                        _______________<br>
                        ${data.Processor}`;
                break;
            case '4':
                text = `${new Date().toJSON().slice(0,10)}
                
                        ${data.Agency}
                        ${data.Address}
                        To whom it may concern:
                        
                        We are sending this short note to remind you of our application for ${data.Document}. Enclosed is a
                        copy of our first letter to you, dated and delivered on ${data.RenewalDate}. We would like to hear from
                        you in three (3) to five (5) business days. Thank you for your prompt attention to this matter.
                        Regards,
                        
                        _______________
                        ${data.Processor}`;

                html = `${new Date().toJSON().slice(0,10)}
                        <br><br>
                        ${data.Agency}<br>
                        ${data.Address}<br>
                        To whom it may concern:<br>
                        <br>
                        We are sending this short note to remind you of our application for ${data.Document}. Enclosed is a copy of our first letter to you, dated and delivered on ${data.RenewalDate}. We would like to hear from you in three (3) to five (5) business days. Thank you for your prompt attention to this matter.
                        <br>
                        Regards,
                        <br><br>
                        _______________<br>
                        ${data.Processor}`;
                break;
            default:
                text = ``;
                html = ``;
                break;
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                // user: 'process.env.GOOGLE_USER',
                // pass: 'process.env.GOOGLE_PASS',
                user: 'some@gmail.com',
                pass: 'somePass',
            }
        });

        // send mail with defined transport object
        let info = {
            from: 'somePass@gmail.com', // sender address
            to: data.ProcessorEmailAddress, // list of receivers
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
