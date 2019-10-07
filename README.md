# HR-Payroll-System

This system allows HR to calculate employee salary based on input employee details: first name, last name, annual salary and super rate. It also allows HR to save the payslip at the backend for audit purposes after the payment has been made.
The frontend is done using React and the backend is done using Node.

**Assumptions**
1. Only basic validations have been added at this point like required fields, input range from 1-30, and no special characters allowed.
2. It is assumed that the database will be archived yearly, so new entries will be there for each year. This is essential to avoid repetetion of payslips in the audit folder.
3. The payslips are stored in the backend in client/audit/Mansi Vyas_October formats.

**How to run the system**
There are two parts to the system: Client and Server.
1. Click on "Clone Repository" or "Download zip".
2. Unzip the contents and use command cd hr_payroll_system
3. First we will install the dependencies for the client, so go to your terminal and cd client
4. Once you are in client directory, use command npm install
5. After all dependencies have been installed, use command npm start.
6. This will open a new terminal. But wait...
7. Now open a new git bash or node terminal (whichever you are using)
8. Go to the project folder with zip, but stay outside client.
9. Now we will install server dependencies with npm install.
10. After that run npm start.
11. The window must dispay "Listening on port 5000" message.
12. Now go to your browser, navigate to localhost:3000 and play around.

**TEST RUN**

1) For "Employee":
Firstname: Mansi
Lastname: Vyas
Annual Salary: 60050
Super Rate: 9
![1](https://user-images.githubusercontent.com/40931707/66322058-46338780-e96d-11e9-840d-41b265b2cfa6.JPG)


2) Click "Generate Payslip" button and the payslip will be generated in below format:
Payslip
Mansi Vyas
Pay Date	Tue Oct 08 2019
Pay Period October
Pay Frequency	Monthly
Annual Income	$ 60,050.00
Gross Income	$ 5,004.00
Income Tax	$ 922.00
Net Income	$ 4,082.00
Super	$ 450.00
Pay	$ 3,632.00
![2](https://user-images.githubusercontent.com/40931707/66322173-6c592780-e96d-11e9-9708-8c98be6567fd.JPG)


3) Click on "Pay" button and alert message will pop up which tells you that salary has been credited successfully.
![3](https://user-images.githubusercontent.com/40931707/66322276-927ec780-e96d-11e9-8632-413cbfd005a8.JPG)


4) The payslip can be found in the client/audit/ folder under name - Mansi Vyas_October name.
![4](https://user-images.githubusercontent.com/40931707/66322486-ed182380-e96d-11e9-876c-c4990fbcdc2e.JPG)


_Note here that if again payment is made to employee Mansi Vyas for October pay period, the system will not allow it and alert will pop up telling that payment has already been made to Mansi Vyas for October_
![5](https://user-images.githubusercontent.com/40931707/66322581-1933a480-e96e-11e9-8b07-c3fbd29ac143.JPG)

