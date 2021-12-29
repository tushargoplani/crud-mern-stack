import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateStudent(props) {

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [age, setage] = useState("");
    const [marks, setmarks] = useState("");
    const [city, setcity] = useState("");
    var stId = props.match.params.id;
    useEffect(() => {
        if (stId) {
            axios.get('http://localhost:3000/student-by-id?id=' + stId).then(
                (res) => {
                    console.log(res.data.data);
                    setname(res.data.data[0].name);
                    setemail(res.data.data[0].email);
                    setage(res.data.data[0].age);
                    setmarks(res.data.data[0].marks);
                    setcity(res.data.data[0].city);
                }
            )
        }
    }, []);



    function setValue(e) {
        e.target.name == "Name" && setname(e.target.value);
        e.target.name == "Email" && setemail(e.target.value);
        e.target.name == "Age" && setage(e.target.value);
        e.target.name == "Marks" && setmarks(e.target.value);
        e.target.name == "City" && setcity(e.target.value);
    }



    function sendData() {

        var isvalid = true;

        // validate for Name 
        if (name == "" || name == null) {
            isvalid = false;
            alert("please enter name");
        }

        //validate for email
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailregex.test(email)) {
            alert("Email is not valid");
            isvalid = false;
        }

        //validate for marks   
        if (marks == "" || marks == null) {
            isvalid = false;
            alert("please enter marks");
        }
        // for age 
        if (age == "" || age == null) {
            isvalid = false;
            alert("please enter age");
        }

        //for city
        if (city == "" || city == null) {
            isvalid = false;
            alert("please select city");
        }




        if (isvalid == true) {
            var s = {stId,name,email,age,marks,city};
            if (stId) {
                s._id = stId;
                axios.post('http://localhost:3000/update-student', s).then((res) => {
                    alert(res.data.data);
                })
            }
            else {
                console.log(s);
                axios.post('http://localhost:3000/create-student', s).then((res) => {
                    alert(res.data.data);
                })
            }
        }

    }


    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                        <div class="card-header"><h3 class="text-center font-weight-light my-4">{stId ? "Edit Student Details" : "Add Student"}</h3></div>
                        <div class="card-body">
                            <form>
                                <div class="form-floating mb-3">
                                    <input name="Name" value={name} onChange={(e) => { setValue(e); }} class="form-control" id="inputName" type="text" placeholder="Enter name" />
                                    <label for="inputName">Name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input name="Email" value={email} onChange={(e) => { setValue(e); }} class="form-control" id="inputEmail" type="email" placeholder="Enter Email" />
                                    <label for="inputEmail">Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input name="Age" value={age} onChange={(e) => { setValue(e); }} class="form-control" id="inputAge" type="number" placeholder="Enter Age" />
                                    <label for="inputAge">Age</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input name="Marks" value={marks} onChange={(e) => { setValue(e); }} class="form-control" id="inputMarks" type="number" placeholder="Enter Marks" />
                                    <label for="inputMarks">Marks</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <select name="City" value={city} onChange={(e) => { setValue(e); }} class="form-control" id="inputCity" >
                                        <option value="">Select City</option>
                                        <option value="Bharatpur">Bharatpur</option>
                                        <option value="Jaipur">Jaipur</option>
                                        <option value="Pune">Pune</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Noida">Noida</option>
                                        <option value="Banglore">Banglore</option>
                                    </select>
                                    <label for="inputCity">City</label>
                                </div>
                                <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                                    <a class="btn btn-primary" onClick={sendData}>{stId ? "Update Student" : "Create Student"}</a>
                                </div>
                            </form>
                        </div>
                        {/* <div class="card-footer text-center py-3">
                                        <div class="small"><a href="register.html">Need an account? Sign up!</a></div>
                                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
