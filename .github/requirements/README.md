## **Car Registration**

### Functional Requirements

- Must be possible to register a ne car.

### Business Logic

- Must **not** be possible to register a car with a license plate already registered.

- The car must be registered with disponibility by default.

- The user responsible by registering a car must be an administrator.

<hr>

## **Car Listing**

### Functional Requirements

- Must be possible to list all available cars.

- Must be possible to list all available cars by category name.

- Must be possible to list all available cars by brand name.

- Must be possible to list all available cars by car name.

### Business Logic

- The user does not need to be logged in.

<hr>

## **Specification Registration**

### Functional Requirements

- Must be possible to register a specification for a car.

### Business Logic

- Must **not** be possible to register a specification for a non-registered car.

- Must **not** be possible to register a specification that already exists on the same car.

- The user responsible by registering a specification must be an administrator.

<hr>

## **Car Image Registration**

### Functional Requirements

- Must be possible to register a image for a car.

- Must be possible to list all the cars.

### Non-Functional Requirements

- Use multer to upload the files.

### Business Logic

- The user must be able to register more than one image for the same car.

- The user responsible by registering a image must be an administrator.

<hr>

## **Car Rental**

### Functional Requirements

- Must be possible to register a rental.

### Business Logic

- The rental must have a minimal duration of 24 hours.

- Must **not** be possible to register a rental if the user already has an active rental.

- Must **not** be possible to register a rental if the car is already rented.

- User must be logged in.

- When rented, the car status must be changed to unavailable.

<hr>

## **Car Return**

### Functional Requirements

- Must be possible to return a car.

### Business Logic

- If the car is returned in less than 24 hours, must be charged the complete daily rate.

- After returned, the car must be available for other rental.

- After returned, the user must be available for other rental.

- When returned, the total value must be calculated.

- If the end date is above the expected date, must be charged a fine value proportional to the end date.

- If has penalty, the fine value must be added to the total value.

- User must be logged in.

<hr>

## **Rentals listing for the user**

### Functional Requirements

- Must be possible to list all user's rentals.

### Business Logic

- The user must be logged in.

<hr>

## **Password Recovering**

### Functional Requirements

- The user must be able to recover the password with the email.

- The user must receive an email with the steps to recover the password.

- The user must be able to insert a new password.

### Business Logic

- The user needs to inform a new password

- The link to recover the password must expire in 3 hours.
