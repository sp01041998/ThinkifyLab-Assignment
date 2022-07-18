


let usersInfo = []  // will store users Info
let driverInfo = [] // will store driver Info



function add_user(...user_details) {

    let user = {}
    user.name = user_details[0]

    // validte Wheather gender value is correct or not
    if (["M", "F", "Other"].indexOf(user_details[1]) === -1) {
        return "Please Provide correct Gender detail"
    }
    user.sex = user_details[1]

    // validte age

    if (Number(user_details[2]) <= 13) {
        return "You are under Age to use Our Service"
    }
    user.age = user_details[2]

    user.current_location = [0, 0]   // by default saving current location of a user as (0,0)
    user.lastTravelHistory = {}   /// this will store (source,  destination, DriverNme and Fair of last travel of user)

    usersInfo.push(user) /// saving user info in  array

    return {Message : "Your registration is done" , details : usersInfo[usersInfo.length-1]}

   
}

function updateUser(userName, updated_details) {

    const {name, age, sex} = updated_details // destructuring updated detials

    for(let i = 0; i<usersInfo.length; i++){
        if(usersInfo[i].name === userName){
            if(name){
                usersInfo[i].name=name
            }
            if(age){
                usersInfo[i].age=age
            }
            if(sex){
                usersInfo[i].sex=sex
            }

            return {message : "Profile Updated" , details : usersInfo[i]}
        }
        
        

        if(i === usersInfo.length-1){
            return "Plesae give valid userName in order to updated your profile"
        }
    }
    


}


function update_userLocation(userName, Location) {
    // first check whether user exist in our system or not

    for (let i = 0; i < usersInfo.length; i++) {
        if (usersInfo[i].name === userName) {

            // check Whether Past Location and Current Location are Same or Different
            let pastLocation = usersInfo[i].current_location
            if (pastLocation[0] === Location[0] && pastLocation[1] === Location[1]) {
                return "Your Current loaction Details is same as the Past Location"
            }

            // if Different then Update
            usersInfo[i].current_location = Location

            return {Message : "Location Updated", currentLocation : Location}
        }

    }

    return "Please provide valid userName to Update your Location"
}




// driver functions

function onBoardDriver(driver_details, vehicle_details, current_location) {
    driver_details = driver_details.split(" ")

    let driver = {}   /// temporary Object to store Driver details

    driver.name = driver_details[0]


    // validate Driver's Gender
    if (["M", "F", "Other"].indexOf(driver_details[1]) === -1) {
        return "Please Provide correct Gender detail"
    }
    driver.sex = driver_details[1]

    // Validate Drivers Age
    if (Number(driver_details[2]) <= 17) {
        return "You are under Age to Drive a Vehicle"
    }
    driver.age = Number(driver_details[2])

    driver.vehicle_details = vehicle_details

    driver.current_location = current_location

    driver.isAvailable = true

    driver.earningSoFar=0

    driverInfo.push(driver)

    return { Message: "Your registration is Done", Deatils: driverInfo[driverInfo.length - 1] }
}


function update_driverLocation(driver_name, current_location) {
    for (let i = 0; i < driverInfo.length; i++) {
        if (driverInfo[i].name === driver_name) {


            // check Whether Past Location and Current Location are Same or Different
            let pastLocation = driverInfo[i].current_location

            if (pastLocation[0] === current_location[0] && pastLocation[1] === current_location[1]) {
                return "Your Current loaction Details is same as the Past Location"
            }

            // if Locations are Different
            driverInfo[i].current_location = current_location
            let result = {}
            result.status = true
            result.message = "Location Updated"
            result.currentLoction = current_location

            return result
        }

    }

    // if no driver record is found with the given User Name
    return "Please provide valid userName to update your current location"
}



function change_driver_status(driver_name, status) {
    for (let i = 0; i < driverInfo.length; i++) {
        if (driverInfo[i].name === driver_name) {
            driverInfo[i].isAvailable = status

            return "Status Updated"
        }
    }

    // if no driver record is found with the given User Name
    return "Please provide valid userName to update your status"
}


function find_ride(Username, Source, destination) {


    const findDistance = (userCurrentLocation, driverCurrentLocation) => {
        let x = userCurrentLocation[0] - driverCurrentLocation[0]
        let y = userCurrentLocation[1] - driverCurrentLocation[1]

        return Math.sqrt(x * x + y * y).toFixed(2)
    }

    // find list of drivers who are available within 5 unit distance

    let listofAvailableDriver = []


    for (let i = 0; i < driverInfo.length; i++) {
        if (driverInfo[i].isAvailable === true) {
            let distance = findDistance(Source, driverInfo[i].current_location)

            if (distance <= 5) {
                listofAvailableDriver.push(driverInfo[i])
            }
        }
    }

    // store source and destination of user for further use

    for (let i = 0; i < usersInfo.length; i++) {
        if (usersInfo[i].name === Username) {
            usersInfo[i].lastTravelHistory.Source = Source
            usersInfo[i].lastTravelHistory.destination = destination
            usersInfo[i].lastTravelHistory.distance=findDistance(Source, destination)
        }
    }


    // listofAvailableDriver.sort((a,b) => {
    //     return b.distance - a.distance
    // })
    if(listofAvailableDriver.length === 0){
        return "No Ride Found"

    }
    return listofAvailableDriver
}

function choose_ride(Username, driver_name) {

    // so user selected the ride(save driver info in user profile)
    for(let i =0 ; i<usersInfo.length; i++){
        if(usersInfo[i].name == Username){
            usersInfo[i].lastTravelHistory.driver_name=driver_name
            break
        }
    }

    // since ride is started for this Driver(make this driver as unavailable so that other user's cann't select them for ride)

    for(let i = 0 ; i<driverInfo.length; i++){

        if(driverInfo[i].driver_name === driver_name){
            driverInfo[i].isAvailable= false
        }

    }
    
   
    return "Ride Started"
}


function calculateBill(Username){

    // calculate the bill for user and also upadte user current location 

    let fair = 0
    let driverName
    let current_location 

    for(let i = 0; i<usersInfo.length; i++){
        if(usersInfo[i].name === Username){
            fair = 3 * usersInfo[i].lastTravelHistory.distance
            current_location = usersInfo[i].lastTravelHistory.destination
            driverName = usersInfo[i].lastTravelHistory.driver_name
        }
    }

    // In backend Upate driver and user Current location
    update_userLocation(Username, current_location)
    update_driverLocation(driverName, current_location)

    // mark driver availability as true and calculate driver earning
    
    for(let i=0; i<driverInfo.length; i++){
        if(driverInfo[i].name == driverName){
            driverInfo[i].isAvailable=true
            driverInfo[i].earningSoFar= driverInfo[i].earningSoFar + Math.floor(fair)
            break
        }
    }

   

    return `ride Ended bill amount $${Math.floor(fair)}`
}


/*********************************************************************************************** */

function find_total_earning(){

    for(let i = 0 ; i<driverInfo.length; i++){
        console.log(`${driverInfo[i].name} earn $${driverInfo[i].earningSoFar}`)
    }
}






console.log(add_user("Abhishek", "M", 23))
console.log(add_user("Rahul", "M", 29))
console.log(add_user("Nandini", "F", 22))

// console.log(usersInfo)


console.log("------------------------------------------------------------------------")

updateUser("Rahul", {age:32})
console.log(usersInfo)

console.log("------------------------------------------------------------------------")

console.log(update_userLocation("Abhishek", [0, 0]))
console.log(update_userLocation("Rahul", [10, 0]))
console.log(update_userLocation("Nandini", [15, 6]))

console.log("------------------------------------------------------------------------")


console.log(onBoardDriver("Driver1 M 22", "Swift, KA-01-12345", [10, 1]))
console.log(onBoardDriver("Driver2 M 22", "Swift, KA-01-12345", [11, 10]))
console.log(onBoardDriver("Driver3 M 22", "Swift, KA-01-12345", [5,3]))


console.log("------------------------------------------------------------------------")

console.log(find_ride("Abhishek", [0, 0], [20,1]))
console.log(find_ride("Rahul", [10, 0], [15,3]))

console.log("------------------------------------------------------------------------")

console.log(choose_ride("Rahul", "Driver1"))

console.log("------------------------------------------------------------------------")

console.log(calculateBill("Rahul"))

console.log("------------------------------------------------------------------------")

change_driver_status("Driver1", false)

console.log(find_ride("Nandini", [15,6], [20,4]))


console.log("------------------------------------------------------------------------")


find_total_earning()
