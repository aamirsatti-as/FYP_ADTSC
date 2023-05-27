const Admin = require("../models/admin.js")
const Detection = require('../models/detection.js')
const Notification = require('../models/notification.js')
const OTP = require('../models/otp.js')
const dotenv = require('dotenv');

dotenv.config();
const nodemailer = require("nodemailer");

const TO_PHONE_NUMBER = process.env.TO_PHONE_NUMBER
const FROM_PHONE_NUMBER = process.env.FROM_PHONE_NUMBER

const bcrypt = require('bcryptjs');
const Notifiers = require('../models/notifier.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const Nexmo = require('nexmo');



module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body;

        // return
        const Company='ADTSC',UserName='Aamir123',FirstName='Aamir',LastName='Naseer',Address='Alipur Islamabad',Country='Pakistan',Phone='0341561132',City='Islamabad',AboutMe='Student';

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
                    return res.json({ message: "Password Changed" });
                }).catch((err) => {
                    return res.status(422).json({ message: "Something Went Wrong Try Again" })
                })
        }
        else {
            return res.status(422).json({ message: "Incorrect Current Password" })
        }
    },

    UpdateUser: async (req, res) => {
        const { Company, UserName, email, FirstName, LastName, Address, City, Country, Phone, AboutMe, Image } = req.body;
        // const Company=req.body.Company;

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
        console.log('inside')
        const admin = await Admin.findOne();
        if (admin)
            return res.status(200).send(admin);
        else
            return res.status(422).json({ message: "User Not Found" });
    },
    Detection_: async (req, res) => {

        const { Anomaly_Name,Traceback_Video,Detection_Video } = req.body;

        var Anomaly_ID = await Detection.count({})
        Anomaly_ID = Anomaly_ID + 1;

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

        let Anomaly_Area = 'Electrical Engineering Department, Islamabad, Pakistan'
        const latitude = 33.6518
        const longitude = 73.1566
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
            fetch(...args));
        try {
            const apiResponse = await fetch(
                `http://api.positionstack.com/v1/reverse?access_key=a2a6d7cce8110ca44006b2249e5a48bc&query=${latitude},${longitude}`
            )
            var apiResponseJson = await apiResponse.json()
            if (apiResponseJson) {
                Anomaly_Area = apiResponseJson.data[1].label;

            }
        }
        catch (error) {
        }

        // var Anomaly_Date = year + "-" + month + "-" + date;

        var Anomaly_Date = new Date()
        const Detect = new Detection({ Anomaly_ID, Anomaly_Name, Anomaly_Area, Anomaly_Date,Traceback_Video,Detection_Video })
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

        // Notification.createIndexes({"Notification_Date":1} , {expireAfterSeconds:60})
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

        // const Notification_Date = year + "-" + month + "-" + date;
        Notification_Date = new Date()
        let Notification_Area = 'Electrical Engineering Department, Islamabad, Pakistan'
        const latitude = 33.6518
        const longitude = 73.1566

        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
            fetch(...args));
        try {
            const apiResponse = await fetch(
                `http://api.positionstack.com/v1/reverse?access_key=a2a6d7cce8110ca44006b2249e5a48bc&query=${latitude},${longitude}`
            )
            var apiResponseJson = await apiResponse.json()
            if (apiResponseJson) {
                Notification_Area = apiResponseJson.data[1].label;

            }
        }
        catch (error) {
        }

        const Notify = new Notification({ Notification_ID, Notification_Name, Notification_Receiver, Notification_Date, Notification_Area })
        const save = await Notify.save()
        return res.status(201).send(save);

    },
    GetNotification: async (req, res) => {
        
        let notification = await Notification.find();
        if (notification)
            res.status(200).json({notification})
        else
            res.json({"msg":"something went wrong"})

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
        const emailFind = await Notifiers.findOne({ Email: Email });
        if (emailFind) {
            return res.json({ message: 'Email already exist' });
        }
        const phoneFind = await Notifiers.findOne({ Phone: Phone })
        if (phoneFind) {
            return res.json({ message: 'Phone Number already exist' });
        }
        if (!phoneFind && !emailFind) {
            const notifier = new Notifiers({ Email, UserName, FirstName, LastName, Phone })
            const save = await notifier.save()
            return res.status(200).json({ message: 'Notifier Added Successfully' });
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
        TotalNotifier -= 1
        let detection = await Detection.find();
        const Last_One_Hour_Detection = await Notification.count({ "Notification_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000)) } })

        let date_time = new Date();

        let date = ("0" + date_time.getDate()).slice(-2);

        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        let year = date_time.getFullYear();

        let TotalDetectionLastDay = 0;
        // detection.map((response) => {
        //     let split = response.Anomaly_Date.split('-')
        //     let splitYear = split[0];
        //     let splitMonth = split[1];
        //     let splitDate = split[2];

        // if (year == splitYear) {
        //     if (splitMonth == month) {
        //         if (splitDate == date) {
        //             TotalDetectionLastDay += 1;
        //         }
        //         if (date - parseInt(splitDate) == '1') {
        //             TotalDetectionLastDay += 1;
        //         }
        //     }
        //     if (month % 2 != 0) {
        //         if (splitMonth == '1' || splitMonth == '3' || splitMonth == ' 5' || splitMonth == '7') {
        //             if (splitDate == '31' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //         }
        //         if (splitMonth == '9' || splitMonth == '11') {
        //             if (splitDate == '30' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //         }
        //     }
        //     else if (month % 2 == 0) {
        //         if (splitMonth == '2') {
        //             if (splitDate == '29' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //             if (splitDate == '28' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //         }
        //         if (splitMonth == '4' || splitMonth == '6') {
        //             if (splitDate == '30' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //         }
        //         if (splitMonth == '8' || splitMonth == '10') {
        //             if (splitDate == '31' && date == '1') {
        //                 TotalDetectionLastDay += 1;
        //             }
        //         }
        //     }
        // }
        // })
        res.status(200).json({ TotalDetection, TotalNotifier, Last_One_Hour_Detection })
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
        // const LastMinute = await Notification.find({ "Notification_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000)) } })
        // const LastMinute = await Detection.count({ "Anomaly_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000)) } })

        // console.log(LastMinute)
        // if (LastMinute != []) {
        //     console.log('a')
        //     return
        const lastobject=await Detection.find().sort({_id:-1}).limit(1);
        console.log(lastobject[0])
        var splice1=lastobject[0].createdAt
        
        console.log(typeof(splice1))
        splice1 = JSON.stringify(splice1);
        splice1=splice1.substring(12,17)
        let date_time = new Date();
        date_time = JSON.stringify(date_time);
        date_time=date_time.substring(12,17)
        let last_record_min=splice1.substring(3,5)
        let present_minute=date_time.substring(3,5)
        if(last_record_min==present_minute){
            return res.send({"msg":"only one record can store in the single minute"})
        }
        console.log(last_record_min)
        console.log(present_minute)
        console.log(date_time)


        console.log(splice1)
        if(lastobject[0].Anomaly_Name==req.body.label && lastobject[0].Traceback_Video==req.body.link && lastobject[0].Detection_Video==req.body.detection)
        return res.send({"msg":"record already stored"})

        // }
        // let lastRecord = await Detection.find().sort({ _id: -1 }).limit(1);
        
        // let lastDetectedTime = lastRecord[0].Anomaly_Date;
        // let split = lastDetectedTime.split(':')
        // let splitHour = split[0];
        // let splitMinute = split[1].slice(0, -2);
        // let presentHours = date_time.getHours();


        // get current minutes
        // let presentMinutes = date_time.getMinutes();
        // console.log(presentHours + ' pH')
        // console.log(presentMinutes + 'pM')
        // if (presentHours == splitHour && presentMinutes == splitMinute)
        //     return res.status(422).json({ message: 'record can only be saved after 1 minure' })
        // else {

        // console.log(splitHour)
        // console.log(splitMinute)

        const { link, label, detection } = req.body
        console.log(link)
        console.log(label)
        console.log(detection)
        if (!link || !label || !detection)
            return
        console.log('inside live')

        const latitude = 33.6518
        const longitude = 73.1566
        let Anomaly_Name = label
        let Traceback_Video = link
        let Detection_Video = detection
        var Anomaly_ID = await Detection.count({})
        Anomaly_ID = Anomaly_ID + 1;
        
        // get current date
        // adjust 0 before single digit date
        // let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        // let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        // let year = date_time.getFullYear();

        // get current hours
        // let hours = date_time.getHours();

        // get current minutes
        // let minutes = date_time.getMinutes();

        // get current seconds
        // let seconds = date_time.getSeconds();

        // prints date in YYYY-MM-DD format

        // let Anomaly_Time
        // if (hours <= 11)
        //     Anomaly_Time = hours + ":" + minutes + "AM";
        // else
        //     Anomaly_Time = hours + ":" + minutes + "PM";


        // const Anomaly_Date = year + "-" + month + "-" + date;
        const Anomaly_Date = new Date()
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
            fetch(...args));

        let Anomaly_Area = 'Electrical Engineering Department, Islamabad, Pakistan'

        try {
            const apiResponse = await fetch(
                `http://api.positionstack.com/v1/reverse?access_key=a2a6d7cce8110ca44006b2249e5a48bc&query=${latitude},${longitude}`
            )
            var apiResponseJson = await apiResponse.json()
            if (apiResponseJson) {
                Anomaly_Area = apiResponseJson.data[1].label;
            }
        }
        catch (error) {
            console.log(error)
        }
        const Detect = new Detection({ Anomaly_ID, Anomaly_Name, Anomaly_Date, Anomaly_Area, Traceback_Video, Detection_Video })
        const save = await Detect.save()
        
        console.log('detect save')
        var twilio = require("twilio");
        const accountSid = process.env.new_ACCOUNT_SID
        const authToken = process.env.new_AUTH_TOKEN
        var client = new twilio(accountSid, authToken);
        try {
            const apiResponse = await fetch(
                `http://api.positionstack.com/v1/reverse?access_key=a2a6d7cce8110ca44006b2249e5a48bc&query=${latitude},${longitude}`
            )
            console.log('detect save2')
            var apiResponseJson = await apiResponse.json()
            const Notification_Name = label;
            const Notification_Receiver = 'Admin';
            var Notification_ID = await Notification.count({})
            Notification_ID = Notification_ID + 1;

            const Notification_Date = new Date();

            let Notification_Area = 'Electrical Engineering Department, Islamabad, Pakistan'
            if (apiResponseJson) {
                Notification_Area = apiResponseJson.data[1].label;
            }
            const Notify = new Notification({ Notification_ID, Notification_Name, Notification_Receiver, Notification_Date, Notification_Area })

            await Notify.save()
            console.log('a')
            if (apiResponseJson) {
                let location = apiResponseJson.data[1].label;
                // body: label + " Detected At " + location,

                client.messages
                    .create({
                        body: label + " Detected At " + location,
                        from: process.env.FROM,
                        to: process.env.TO,
                    })
                    .then((message) => {

                        console.log("sent succesfully")

                        res.status(200).send(message)

                    }).catch((err) => {

                        console.error("phone : ", err.message);

                        res.send({ error: err.message });

                    });


            }
            else {
                console.log('something went wrong')
                return res.json({ error: err.message });
            }

            // try{
            //     const nexmo = new Nexmo({
            //         // apiKey: 'b7956298',
            //         // apiSecret: 'NQJ41okXs2u9Ay5u'
            //         // apiKey:'bddf8f85',
            //         // apiSecret:'qsIwFo8eOHRIeP3K'
            //         apiKey:'b7956298',
            //         apiSecret:'NQJ41okXs2u9Ay5u'
            //       }, { debug: true });
            //     const from = "Vonage APIs"
            //     const to = "+923185021068"
            //     let location='Electrical Engineering Department, Islamabad, Pakistan'
            //     const text =  label + " Detected At " + location;
                
            //     nexmo.message.sendSms(from, to, text, (err, responseData) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             if(responseData.messages[0]['status'] === "0") {
            //                 console.log("Message sent successfully.");
            //             } else {
            //                 console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            //             }
            //         }
            //     })
            // }
            // catch(error){
            //     console.log(error)
            // }

        }
        catch (err) {
            console.log(err)
            res.status(500).send('Something went wrong')
        }

    },
    SearchDetection: async (req, res) => {
        const Anomaly_Name = req.body;
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
    UpdateNotifier: async (req, res) => {
        console.log(req.body)
        const { UserName, FirstName, LastName, Phone, Email, editId } = req.body;


        try {
            const data = await Notifiers.findByIdAndUpdate({ _id: editId }, { Email: Email, FirstName: FirstName, LastName: LastName, Phone: Phone, UserName: UserName }, { new: true });
            if (data) {
                return res.status(200).json({ message: "Updated Successfully" });
            }
            else {
                return res.status(422).json({ message: "Something Went wrong.Try Again" });
            }
        } catch (err) {
            console.log(err);
        }

    },
    AllDetectionChart: async (req, res) => {
        try {
            // let Last_Hour = await Notification.find({ "Notification_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000)) } })
            const Last_One_Hour_Detection = await Detection.count({ "createdAt": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000)) } })
            // const Last_One_Day_Detection=await Detection.count({"Anomaly_Date":{$lt: new Date(),$gte: new Date(new Date().setDate(new Date().getDate()-(24*60 * 60 * 1000)))}})
            // const Last_One_Day_Detection = await Detection.count({ "Anomaly_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000 * 24)) } })
            // const t=await Detection.count({ "Anomaly_Date": { $lt: new Date().getTime(), $gte: 400}})
            // const t=await Detection.find({timestamp:{$gt: new Date(ISODate("2022-12-03T10:34:51.078+00:00")-60*60000)}})
            var lastHour = new Date();
            lastHour.setHours(lastHour.getHours() - 1);
            // Detection.aggregate([

            //     {
            //         $group: {
            //             _id: { $dateToString: { format: "%M", date: "$createdAt" } },
            //             Totaluser: { $sum: 1 }
            //         }
            //     },
            // ],

            //     function (err, result) {
            //         let count = 0
            //         if (err) {
            //             res.send(err);
            //         } else {

            //             console.log(result.map((ar) => {
            //                 count += 1;
            //             }))

            //             res.json(count);
            //         }
            //     }
            // );
            // res.status(200).json(result);

            // console.log(new Date().getTime())
            const Last_One_Day_Detection = await Detection.count({ "timestamps": { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getTime() - (60 * 60 * 1000 * 24))) } })
            const Last_One_Week_Detection = await Detection.count({ "timestamps": { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getTime() - (60 * 60 * 1000 * 24 * 7))) } })
            const Last_One_Month_Detection = await Detection.count({ "timestamps": { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getTime() - (60 * 60 * 1000 * 24 * 30))) } })
            const Last_One_Year_Detection = await Detection.count({ "timestamps": { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getTime() - (60 * 60 * 1000 * 24 * 365))) } })
            const Last_One_Month_Detection1 = await Detection.count({ "timestamps": { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getTime() - (60 * 60 * 1000 * 24 * 30))) } })
            const TotalDetection = await Detection.count({})
            const Pistol = await Detection.count({ Anomaly_Name: 'gun' });//Gun
            const Fire = await Detection.count({ Anomaly_Name: 'fire' });
            const Accident = await Detection.count({ Anomaly_Name: 'car-crash' });//car-crash
            const Knife = await Detection.count({ Anomaly_Name: 'knife' });
            const Smoke = await Detection.count({ Anomaly_Name: 'smoke' });
            const Fight = await Detection.count({ Anomaly_Name: 'fight' });

            return res.status(200).json({ Last_One_Hour_Detection, Last_One_Day_Detection, Last_One_Week_Detection, Last_One_Month_Detection, Last_One_Year_Detection, TotalDetection, Pistol, Fire, Accident, Knife, Fight, Smoke })
            // return res.status(200).json({ Fight })
        }
        catch (error) {
            console.log(error)
            return res.status(404).json({ message: 'Something went wrong' })
        }

    },
    DeleteNotificationAfter24Hour: async (req, res) => {
        try {

            var Last_24Hour_Notification1 = await Notification.count({ "Notification_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000 * 24)) } })
            const Last_24Hour_Notification = await Notification.find({ "Notification_Date": { $lt: new Date(), $gt: new Date(new Date().getTime() - (60 * 60 * 1000 * 24)) } })
            const delAll = await Notification.deleteMany({})
            Last_24Hour_Notification.map(async (row) => {
                const Notify = new Notification({ Notification_ID: row.Notification_ID, Notification_Name: row.Notification_Name, Notification_Receiver: row.Notification_Receiver, Notification_Date: row.Notification_Date, Notification_Area: row.Notification_Area })
                var save = await Notify.save()
            });
            return res.send(200).json({ message: 'Records Updated Successfully' })
        }

        catch (error) {
            console.log(error)
            return res.status(404).json({ message: 'Something went wrong' })
        }
    },
    SearchNotificationLog: async (req, res) => {
        console.log(req.params.id)
        const n = await Notification.find({ _id: req.params.id })
        console.log(n)

        await Notification.find({ _id: req.params.id }).then((notificationFind) => {
            console.log('ad')
            console.log(notificationFind)
            return res.status(200).send(notificationFind)
        }).catch((err) => {
            return res.send(err)
        })

        // console.log(notificationFind)


    },
    SendOTP: async (req, res) => {
        try {
            const email = req.body.email;
            const find = await Admin.findOne({ email: email });
            if (find) {
                console.log('find')
                const otp = Math.floor(1000 + Math.random() * 9999);


                let transporter = nodemailer.createTransport({
                    // host: "smtp.ethereal.email",
                    // port: 587,
                    // secure: false, // true for 465, false for other ports
                    method: 'POST',
                    service: 'gmail',
                    auth: {
                        user: 'aamirsatti507@gmail.com', // generated ethereal user
                        pass: 'epraoexvkqhntdni', // generated ethereal password
                    },
                });
                console.log('line 775')

                var mailOptions = {
                    from: 'aamirsatti507@gmail.com ',
                    to: email,// who recieve email
                    subject: 'Forget Password OTP',
                    html: `<h1>OTP</h1><br></br>Email: ${otp}`
                };
                console.log('line 783')
                transporter.sendMail(mailOptions, function (error, info) {
                    var result = info;
                    if (info) {
                        console.log(info.response)

                    }

                    else {
                        console.log(error)

                        res.send(error)
                    }
                });
                console.log('line 798')
                if (result) {
                    console.log('line 800')

                    const addOTP = new OTP({
                        User_Email: email,
                        OTP: otp
                    })
                    const save = await addOTP.save();

                    return res.status(200).send(addOTP)
                }
            }
            else {

                return res.send({ "msg": "Invalid Email" });
            }

        }
        catch (error) {
            res.send({ "msg": "Something Went Wrong Try Again" })
        }
    },

    VerifyOTP: async (req, res) => {
        try {
            const { email, otp } = req.body;

            console.log(req.body)
            console.log(email)
            console.log(otp)
            const verify = await OTP.findOne({ User_Email: email, OTP: otp });
            console.log('v ', verify)
            if (verify) {
                const save = await OTP.findOneAndRemove({ User_Email: email, OTP: otp });
                console.log(save)
                return res.send({ "msg": "ok" });
            }
            else {
                return res.send({ "msg": "Invalid" });
            }

        }
        catch (error) {
            res.send({ "msg": "Something Went Wrong Try Again" })
        }
    },
    ForgetPassword: async (req, res) => {
        try {
            const { password } = req.body;

            const password1 = await bcrypt.hash(password, 12);
            Admin.update({ password: password1 }, { new: true }).
                then((results) => {
                    if (results == null) {
                        throw new Error("not Found")
                    }
                    console.log("Password Matches")
                    return res.send({ message: "Password Changed" });
                }).catch((err) => {
                    console.log(err)
                    return res.json({ message: "Something Went Wrong Try Again" })
                })
        }

        catch (error) {
            res.send({ "msg": "Something Went Wrong Try Again" })
        }
    }
}
