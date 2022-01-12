/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'example@gmail.com',
        pass: 'password'
    }
});


exports.helloFirestore = functions.firestore.document('tasks/{taskId}').onCreate((snap, context) => {
    const newValue = snap.data();
    console.log(newValue.task);
    const mailOptions = {
        from: `GDG MENA - Firebase <noreply@gdgMuscat.om>`,
        to: 'example@gmail.com',
        subject: 'ToDo App - New task added',
        // html: html,
        text: "Hi, New task added to your account. Task name: "+newValue.task
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
        if(erro){
            //return res.send(erro.toString());
            console.log(JSON.stringify(erro));
        } else {
            console.log(JSON.stringify(info));
        }
    });


});
