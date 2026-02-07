# Student Import Guide

## How to Import Students from Excel

### Step 1: Login as Admin
1. Open your LMS application
2. Login with admin credentials:
   - **Username:** admin
   - **Password:** admin123

### Step 2: Navigate to Students Page
1. Click on "Students" in the admin sidebar
2. You'll see the current list of students

### Step 3: Upload Excel File
1. Click the "Excel Upload" button in the top right
2. Click "Choose File" and select your `students_utkarsh.xlsx` file
3. The system will:
   - Parse the Excel file
   - Generate usernames (firstname + class number)
   - Generate passwords (AA@ + last 4 digits of student mobile)
   - Show you a preview of all students with their credentials

### Step 4: Review and Import
1. Review the preview table showing:
   - Student Name
   - Class
   - Generated Username
   - Generated Password
2. Check for any errors displayed in red
3. Click "Upload All" to import all students

### Step 5: Export Credentials
1. After import, click "Export Credentials" button
2. An Excel file will download with all usernames and passwords
3. Share this file with students/parents

## Excel File Format

Your Excel file should have these columns (in order):

1. **Student Name** - Full name of the student
2. **Class** - Class number (e.g., 6, 7, 8, 9, 10)
3. **Father Mobile** - Father's mobile number
4. **Mother Mobile** - Mother's mobile number
5. **Student Mobile** - Student's mobile number (required for password generation)

### Example Row:
```
Aditya Kumar | 6 | 9876543201 | 9876543202 | 9876545744
```

This will generate:
- **Username:** aditya6
- **Password:** AA@5744 (AA@ + last 4 digits of 9876545744)

## Username Generation Rules

- Takes first name from full name
- Converts to lowercase
- Appends class number
- Example: "Aditya Kumar" in Class 6 → "aditya6"
- If duplicate exists, appends _1, _2, etc.

## Password Generation Rules

- Format: AA@ + last 4 digits of student mobile
- Example: Mobile 9876545744 → Password AA@5744
- If no mobile provided, uses AA@0000 (requires manual reset)

## Troubleshooting

### "Username already exists" Error
- System prevents duplicate usernames
- Manually modify the username in the form or delete the existing student first

### Missing Mobile Number
- Student mobile is required for password generation
- If missing, you'll need to add the student manually with a custom password

### File Upload Fails
- Ensure file is .xlsx or .xls format
- Check that file has headers in row 1
- Verify all required columns are present

## After Import

1. **Download Credentials:** Use "Export Credentials" to get an Excel file with all login details
2. **Share with Students:** Distribute credentials securely
3. **First Login:** Students should login at the LMS portal with:
   - Username: (their generated username)
   - Password: (their generated password)
4. **Change Password:** Students can change their password after first login

## Current Teacher Accounts

Teacher accounts are already set up:

1. **Aayushi Sajwan** - aayushi.teacher / Teach@123 - sajwanaayushi32@gmail.com
2. **Utkarsh Singh** - utkarsh.teacher / Teach@123 - utkarshkathait188@gmail.com
3. **Deepika Kathait** - deepika.teacher / Teach@123

## Support

If you encounter any issues:
1. Check the Excel file format matches the requirements
2. Verify all required fields are filled
3. Use the manual "Add Student" button for individual additions
4. Contact system administrator for database issues
