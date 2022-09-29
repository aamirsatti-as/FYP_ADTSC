const Admin = require("../models/admin.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
module.exports = {

    login: async (req, res) => {

        console.log("inside login")
        const { email, password } = req.body;
        // const admin2 = new Admin({ email, password })
        // const s = await admin2.save()
        const find = await Admin.findOne({ email: email });
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
        console.log(oldPassword + " " + newPassword + " " + cnfrmNewPassword)
        if (newPassword != cnfrmNewPassword) {
            return res.status(422).json({ message: "Password and confirm password does not matches" });
        }
        const admin = await Admin.findOne();
        const isPasswordCorrect = await bcrypt.compare(oldPassword, admin.password);
        if (admin) {
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
                    // return res.json( {message:"Current Password is Not Correct"})
                })
        }
        else {
            console.log("Incorrext")
        }
    },

    UpdateUser: async (req, res) => {

        const { Company, Username, Email, Firstname, Lastname, Address, City, Country, Phone, Aboutme } = req.body;
        const admin = await Admin.findOne();
        if (admin) {
            Admin.updateOne({ Email: admin.email }, {
                Company: Company, UserName: Username, FirstName: Firstname, LastName: Lastname, Address: Address,
                Country: Country, City: City, AboutMe: Aboutme,Phone:Phone
            }, { new: true }).
                then((results) => {
                    if (results == null) {
                        throw new Error("not Found")
                    }
                    console.log('Updated successfully')
                    return res.status(200).json({ message: "User Record Updated Successfully" });
                }).catch((err) => {
                    console.log(err)
                    return res.status(422).json({ message: "User Record Updation Failed" });
                })
        }
    },

    getAdmin: async (req, res) => {
        const admin = await Admin.findOne();
        console.log('sdf')
        if (admin)
            return res.send(admin);
        else
            return res.status(422).json({ message: "User Not Found" });
    }

}