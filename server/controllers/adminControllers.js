const Admin = require("../models/admin.js")
const Detection = require('../models/detection.js')
const Notification = require('../models/notification.js')
const bcrypt = require('bcryptjs');
const Notifiers = require('../models/notifier.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
var nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const Nexmo = require('nexmo');


module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body;

        console.log(req.headers)
        // return
        // const Company='ADTSC',UserName='Aamir123',FirstName='Aamir',LastName='Naseer',Address='Alipur Islamabad',Country='Pakistan',Phone='0341561132',City='Islamabad',AboutMe='Student';

        // const admin2 = new Admin({ email, password,Company, UserName, FirstName, LastName, Address, City, Country, Phone, AboutMe })
        // const s = await admin2.save()
        const find = await Admin.findOne({ email: email });
        if (find) {
            const isMatch = await bcrypt.compare(req.body.password, find.password);
            if (isMatch) {
                const token = await find.generateAuthToken();
                // res.cookie("jwtoken", token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true,
                //     secure: true,
                //     sameSite: 'none'
                // });
                return res.status(200).json({ token });
                // res.status(200).json({ result: oldUser, token });

            }
            else {
                return res.status(422).json({ message: "Invalid Credentials" });
            }
        }
        else {
            return res.status(422).json({ message: "Invalid Credentials" });
        }
    },

    changePassword: async (req, res) => {
        const { oldPassword, newPassword, cnfrmNewPassword } = req.body;
        if (newPassword != cnfrmNewPassword) {
            return res.status(422).json({ message: "Password and confirm password does not matches" });
        }
        const admin = await Admin.findOne();
        const isPasswordCorrect = await bcrypt.compare(oldPassword, admin.password);
        if (isPasswordCorrect) {
            password1 = await bcrypt.hash(cnfrmNewPassword, 12);
            Admin.update({ email: admin.email }, { password: password1 }, { new: true }).
                then((results) => {
                    if (results == null) {
                        throw new Error("not Found")
                    }
                    console.log("Password Matches")
                    return res.json({ message: "Password Changed" });
                }).catch((err) => {
                    console.log(err)
                    return res.status(422).json({ message: "Something Went Wrong Try Again" })
                })
        }
        else {
            return res.status(422).json({ message: "Incorrect Current Password" })
        }
    },

    UpdateUser: async (req, res) => {
        const { Company, UserName, email, FirstName, LastName, Address, City, Country, Phone, AboutMe } = req.body;
        // const Company=req.body.Company;
        console.log(UserName)
        console.log('hi')

        const admin = await Admin.findOne();
        if (admin) {
            Admin.updateOne({ Email: admin.email }, {
                Company: Company, UserName: UserName, Email: email, FirstName: FirstName, LastName: LastName, Address: Address,
                Country: Country, City: City, AboutMe: AboutMe, Phone: Phone
            }, { new: true }).
                then((results) => {
                    if (results == null) {
                        throw new Error("not Found")
                    }
                    return res.status(200).json({ message: "User Record Updated Successfully" });
                }).catch((err) => {
                    console.log(err)
                    return res.status(422).json({ message: "User Record Updation Failed" });
                })
        }
    },

    getAdmin: async (req, res) => {
        const admin = await Admin.findOne();
        if (admin)
            return res.status(200).send(admin);
        else
            return res.status(422).json({ message: "User Not Found" });
    },
    Detection_: async (req, res) => {

        const { Anomaly_Name } = req.body;

        var Anomaly_ID = await Detection.count({})
        Anomaly_ID = Anomaly_ID + 1;

        // console.log(Detection.find().count()+1);
        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();

        // prints date in YYYY-MM-DD format

        let Anomaly_Time
        if (hours <= 11)
            Anomaly_Time = hours + ":" + minutes + "AM";
        else
            Anomaly_Time = hours + ":" + minutes + "PM";


        const Anomaly_Date = year + "-" + month + "-" + date;
        const Detect = new Detection({ Anomaly_ID, Anomaly_Name, Anomaly_Date, Anomaly_Time })
        const save = await Detect.save()
        return res.status(201).send(save);

    },
    GetDetection: async (req, res) => {
        let detection = await Detection.find();
        if (detection) {
            return res.status(200).send(detection);
        }
        else {
            res.status(404).send({ message: "Record Not Found" })
        }
    },
    Notification_: async (req, res) => {

        const { Notification_Name } = req.body;
        const Notification_Receiver = 'Admin';
        var Notification_ID = await Notification.count({})
        Notification_ID = Notification_ID + 1;

        // console.log(Detection.find().count()+1);
        let date_time = new Date();

        // get current date
        // adjust 0 before single digit date
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();

        // prints date in YYYY-MM-DD format

        const Notification_Date = year + "-" + month + "-" + date;

        let Notification_Time
        if (hours <= 11)
            Notification_Time = hours + ":" + minutes + "AM";
        else
            Notification_Time = hours + ":" + minutes + "PM";
        const Notify = new Notification({ Notification_ID, Notification_Name, Notification_Receiver, Notification_Date, Notification_Time })
        const save = await Notify.save()
        return res.status(201).send(save);

    },
    GetNotification: async (req, res) => {
        let notification = await Notification.find();
        if (notification.length > 0)
            res.status(200).send(notification)
        else
            res.status().send(404)
    },
    DeleteNotification: async (req, res) => {
        const { d_id } = req.body;
        try {
            const data = await Notification.deleteOne({ _id: d_id });
            if (data) {
                return res.status(200).json({ message: "Record Deleted Successfully" });
            }
            else {
                return res.status(422).json({ error: "Try Again" });
            }
        } catch (err) {
            console.log(err);
        }
    },
    DeleteDetection: async (req, res) => {

        const { d_id } = req.body;
        try {
            const data = await Detection.deleteOne({ _id: d_id });
            if (data) {
                return res.status(200).json({ message: "Record Deleted" });
            }
            else {
                return res.status(422).json({ error: "No Record" });

            }
        } catch (err) {
            console.log(err);
        }
    },
    AddNotifier: async (req, res) => {
        console.log('inside add')
        // FirstName, LastName, Phone, Email, UserName, 
        const { FirstName, LastName, Phone, Email, UserName } = req.body;
        console.log(FirstName, LastName, Phone, Email, UserName)
        const find = await Notifiers.findOne({ Email: Email });
        if (find) {
            return res.status(422).json({ message: 'Notifier already exist' });
        }
        if (!find) {
            const notifier = new Notifiers({ Email, UserName, FirstName, LastName, Phone })
            const save = await notifier.save()
            return res.status(200).json({ message: "Notifier Added Successfully" });
        }
    },
    GetNotifier: async (req, res) => {
        const find = await Notifiers.find();
        if (find) {
            return res.status(200).send(find);
        }
        else {
            return res.status(404).send({ message: "Record Not Found" })
        }
    }
    ,
    DeleteNotifier: async (req, res) => {

        const { d_id } = req.body;
        try {
            const data = await Notifiers.deleteOne({ _id: d_id });
            if (data) {
                return res.status(200).json({ message: "Record Deleted" });
            }
            else {
                return res.status(422).json({ message: "Try Again" });

            }
        } catch (err) {
            console.log(err);
        }
    },
    GetAllRecords: async (req, res) => {
        console.log(req.headers)
        let TotalDetection = await Detection.count({})
        let TotalNotifier = await Notifiers.count({})
        let detection = await Detection.find();

        let date_time = new Date();

        let date = ("0" + date_time.getDate()).slice(-2);

        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        let year = date_time.getFullYear();

        let TotalDetectionLastDay = 0;
        detection.map((response) => {
            let split = response.Anomaly_Date.split('-')
            let splitYear = split[0];
            let splitMonth = split[1];
            let splitDate = split[2];

            if (year == splitYear) {
                if (splitMonth == month) {
                    if (splitDate == date) {
                        TotalDetectionLastDay += 1;
                    }
                    if (date - parseInt(splitDate) == '1') {
                        TotalDetectionLastDay += 1;
                    }
                }
                if (month % 2 != 0) {
                    if (splitMonth == '1' || splitMonth == '3' || splitMonth == ' 5' || splitMonth == '7') {
                        if (splitDate == '31' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                    if (splitMonth == '9' || splitMonth == '11') {
                        if (splitDate == '30' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                }
                else if (month % 2 == 0) {
                    if (splitMonth == '2') {
                        if (splitDate == '29' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                        if (splitDate == '28' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                    if (splitMonth == '4' || splitMonth == '6') {
                        if (splitDate == '30' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                    if (splitMonth == '8' || splitMonth == '10') {
                        if (splitDate == '31' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                }
            }
        })
        res.status(200).json({ TotalDetection, TotalNotifier, TotalDetectionLastDay })
    },
    ResetPassword: (req, res) => {
        const EMAIL = 'aamirsatti507@gmail.com'
        const transporter = nodemailer.createTransport(sendgridTransport({
            auth: {
                api_key: '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'
            }
        }))
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err)
            }
            const token = buffer.toString("hex")
            Admin.findOne({ email: req.body.email })
                .then(admin => {
                    if (!admin) {
                        return res.status(422).json({ error: "Admin dont exists with that email" })
                    }
                    admin.resetToken = token
                    admin.expireToken = Date.now() + 3600000
                    admin.save().then((result) => {
                        transporter.sendMail({
                            to: admin.email,
                            from: "no-replay@insta.com",
                            subject: "password reset",
                            html: `
                        <p>You requested for password reset</p>
                        <h1>Click Here</h1>
                        `
                        })
                        res.json({ message: "check your email" })
                    })

                })
        })
    },
    LiveStream: async (req, res) => {

        // let count = await Detection.count({})
        // let lastRecord=Detection.findOne({$query: {}, $orderby: {$natural : -1}})
        let lastRecord = await Detection.find().sort({ _id: -1 }).limit(1);
        // console.log(Detection.find().count()+1);
        let date_time = new Date();
        let lastDetectedTime = lastRecord[0].Anomaly_Time;
        let split = lastDetectedTime.split(':')
        let splitHour = split[0];
        let splitMinute = split[1].slice(0, -2);
        let presentHours = date_time.getHours();

        // get current minutes
        let presentMinutes = date_time.getMinutes();
        // console.log(presentHours + ' pH')
        // console.log(presentMinutes + 'pM')
        if(presentHours==splitHour &&  presentMinutes==splitMinute)
            return res.status(422).json({message:'record can only be saved after 1 minure'})
        else
        {
        // let splitDate = split[2];

        console.log(splitHour)
        console.log(splitMinute)

        const { link, label } = req.body
        console.log('inside live')

        const latitude = 33.6518
        const longitude = 73.1566
        let Anomaly_Name = label
        let Traceback_Image = link
        var Anomaly_ID = await Detection.count({})
        Anomaly_ID = Anomaly_ID + 1;



        // get current date
        // adjust 0 before single digit date
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();

        // get current hours
        let hours = date_time.getHours();

        // get current minutes
        let minutes = date_time.getMinutes();

        // get current seconds
        let seconds = date_time.getSeconds();

        // prints date in YYYY-MM-DD format

        let Anomaly_Time
        if (hours <= 11)
            Anomaly_Time = hours + ":" + minutes + "AM";
        else
            Anomaly_Time = hours + ":" + minutes + "PM";


        const Anomaly_Date = year + "-" + month + "-" + date;
        const Detect = new Detection({ Anomaly_ID, Anomaly_Name, Anomaly_Date, Anomaly_Time, Traceback_Image })
        const save = await Detect.save()
        // return res.status(201).send(save);
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
            fetch(...args));
        const accountSid = 'AC6ec48faac2997017af74d647c018364d';
        const authToken = '96bf4a0810b50254add7c2fb43b34ca5';
        var twilio = require("twilio");
        var client = new twilio(accountSid, authToken);


        try {
            const apiResponse = await fetch(
                `http://api.positionstack.com/v1/reverse?access_key=a2a6d7cce8110ca44006b2249e5a48bc&query=${latitude},${longitude}`
            )
            var apiResponseJson = await apiResponse.json()
            const Notification_Name = label;
            const Notification_Receiver = 'Admin';
            var Notification_ID = await Notification.count({})
            Notification_ID = Notification_ID + 1;

            const Notification_Date = year + "-" + month + "-" + date;

            let Notification_Time
            if (hours <= 11)
                Notification_Time = hours + ":" + minutes + "AM";
            else
                Notification_Time = hours + ":" + minutes + "PM";
            const Notify = new Notification({ Notification_ID, Notification_Name, Notification_Receiver, Notification_Date, Notification_Time })

            await Notify.save()
            // if(save)
            // console.log('saved')

            if (apiResponseJson) {
                let location = apiResponseJson.data[1].label;
                client.messages
                    .create({
                        body: label + " Detected At " + location,
                        from: +18336934389,
                        to: +923185021068,
                    })
                    .then((message) => {

                        console.log("sent succesfully")
                        res.status(200).send(`The message  sent succesfully!`)

                    }).catch((err) => {

                        console.error("phone : ", err.message);

                        res.status(422).send({ error: err.message });

                    });


            }
            else {
                console.log('something went wrong')
                return res.json({ error: err.message });
            }

        }
        catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
        }
    }

    },
    SearchDetection : async (req, res) => {
        const Anomaly_Name =req.body;
        
    },
    GetUpdateNotifier: async (req, res) => {
        const { e_id } = req.body;
        console.log(e_id)
        try {
            const data = await Notifiers.findOne({ _id: e_id });
            console.log(data)
            if (data) {
                return res.status(200).send(data);
            }
            else {
                return res.status(422).json({ message: "Try Again" });
            }
        } catch (err) {
            console.log(err);
        }
    },
    UpdateNotifier: async(req,res)=>{
        console.log(req.body)
        const { UserName, FirstName, LastName, Phone, Email,editId } = req.body;
        
        
        try {
            const data = await Notifiers.findByIdAndUpdate({ _id: editId },{Email:Email,FirstName:FirstName,LastName:LastName,Phone:Phone,UserName:UserName},{new:true});
            if (data) {
                return res.status(200).json({ message: "Updated Successfullt" });
            }
            else {
                return res.status(422).json({ message: "Something Went wrong.Try Again" });
            }
        } catch (err) {
            console.log(err);
        }

    }
}
// <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>