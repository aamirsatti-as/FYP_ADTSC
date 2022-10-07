const Admin = require("../models/admin.js")
const Detection = require('../models/detection.js')
const Notification = require('../models/notification.js')
const bcrypt = require('bcryptjs');
const Notifiers = require('../models/notifier.js')
const jwt = require('jsonwebtoken')
module.exports = {

    login: async (req, res) => {
        console.log('inside')
        const { email, password } = req.body;
        // const Company='ADTSC',UserName='Aamir123',FirstName='Aamir',LastName='Naseer',Address='Alipur Islamabad',Country='Pakistan',Phone='0341561132',City='Islamabad',AboutMe='Student';

        // const admin2 = new Admin({ email, password,Company, UserName, FirstName, LastName, Address, City, Country, Phone, AboutMe })
        // console.log('hi')
        // const s = await admin2.save()
        const find = await Admin.findOne({ email: email });
        console.log('hi')
        if (find) {
            const isMatch = await bcrypt.compare(req.body.password, find.password);
            if (isMatch) {
                const token = await find.generateAuthToken();
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                });
                return res.status(200).json({ result: find, token });
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

        const Anomaly_Date = year + "-" + month + "-" + date;
        const Anomaly_Time = hours + ":" + minutes;


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
        const { FirstName, LastName, Phone, Email, UserName } = req.body;
        const find = await Notifiers.findOne({ Email: Email });
        if (find) {
            return res.status(400).json({ message: 'Notifier already exist' });
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
            res.status(404).send({ message: "Record Not Found" })
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
                    if (splitMonth == '9' || splitMonth == '11' ) {
                        if (splitDate == '30' && date == '1') {
                                TotalDetectionLastDay += 1;
                        }
                    }
                }
                else if(month%2==0){
                    if(splitMonth=='2'){
                        if (splitDate == '29' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                        if (splitDate == '28' && date == '1') {
                            TotalDetectionLastDay += 1;
                        }
                    }
                    if (splitMonth == '4' || splitMonth == '6' ) {
                        if (splitDate == '30' && date == '1') {
                                TotalDetectionLastDay += 1;
                        }
                    }
                    if (splitMonth == '8' || splitMonth == '10' ) {
                        if (splitDate == '31' && date == '1') {
                                TotalDetectionLastDay += 1;
                        }
                    }      
                }
            }
            })
        res.status(200).json({ TotalDetection, TotalNotifier, TotalDetectionLastDay })
    }
}