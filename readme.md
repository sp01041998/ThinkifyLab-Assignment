## ThinkifyLab Assignment


## FEATURE - User
### UserInfo Array

```yaml
{ 
  name,
  age,
  gender,
  currentLocation : {default : [0,0]}
  lastTravelHistory : {default : null}
}
```


## 1st Function
### add_user(user_detail)

--take user details as a input and save them in userInfo Array(locally on the system).


```

### update_user(username, updated_details)

- A user can update his profile by providing the details he want to update in an object
```yaml
```

## update_userLocation(username,Location)
- a user can update his location by providing current coardinate as a input.
-If last coardinate and current cooardinate is same then throw an error message.
```


```

## FEATTURE II - Product
### Models
- Product Model
```yaml
{ 
  title: {string, mandatory, unique},
  price: {number, mandatory, valid number},
  code : {number, mandatory, unique},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}
```

## FEATURE - User
### DriverInfo Array


```yaml
{ 
  name,
  age,
  gender,
  currentLocation : {default : [0,0]},
  isAvailable : {default : true},
  earningSofar : {default:0}
}
```

## Drivers Functions

### add_driver(driver_details,vehicle_details,current_location)

- OnBoard driver same as the user.
-if drivers age is below 18 then throws an error




### update_driverLocation(driver_name)

- update driver location using driverName
- if current and last loction is same then throw an error

### change_driver_status(driver_name,status)
- A driver can change is Availabilty(true or false)






## Ride feature


### find_ride (Username,Source , destination)

- a user can find list of vehicles available for ride
- vehicles must be within distance of 5 units
- drivers availability needs to be true
- save user source and destination in lastTravelhistory of userInfo


### choose_ride(Username,drive_name)
- a user can choose a driver from the above available list
- make driver availabilti to false
- save drivername in user lastTravelhistory of userInfo
- ride started

### calculateBill(Username)
- find distance betwwen user source and destination(already saved in find_ride())
- display bill amount to user
- make backend function call to update user nd driver location as equal to destination
- update drivers availabilty to true
- save bill amount in earningsoFar of DriverInfo


###  find_total_earning()
- return total earning of each and every driver so far

