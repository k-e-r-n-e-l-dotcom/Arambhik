# LMS Credentials Guide

## Default Admin Account
- **Username:** admin
- **Password:** admin123
- **Email:** admin@institute.local

## Teacher Accounts

### 1. Aayushi Sajwan
- **Full Name:** Aayushi Sajwan
- **Role:** Subject Matter Expert (Science)
- **Username:** aayushi.teacher
- **Password:** Teach@123
- **Email:** sajwanaayushi32@gmail.com
- **Phone:** 9456302847

### 2. Utkarsh Singh
- **Full Name:** Utkarsh Singh
- **Role:** Master Teacher
- **Username:** utkarsh.teacher
- **Password:** Teach@123
- **Email:** utkarshkathait188@gmail.com
- **Phone:** 9557883621

### 3. Deepika Kathait
- **Full Name:** Deepika Kathait
- **Role:** Master Teacher
- **Username:** deepika.teacher
- **Password:** Teach@123
- **Phone:** 7042822410

## Student Accounts

Students will be created from the Excel file upload.

### Username Format
- **Pattern:** firstname + class number
- **Example:** For "Aditya Kumar" in Class 6 → username: `aditya6`
- **Duplicates:** If duplicate names exist, append number: `aditya6_1`

### Password Format
- **Pattern:** AA@ + last 4 digits of student mobile
- **Example:** If student mobile is 9876545744 → password: `AA@5744`

Students can change their passwords after first login.

## How to Upload Students

1. Login as admin
2. Navigate to Students page
3. Click "Excel Upload" button
4. Select your Excel file (must have columns: Student Name, Class, Father Mobile, Mother Mobile, Student Mobile)
5. Preview the data
6. Click "Upload All"

## How to Export Credentials

1. Login as admin
2. Navigate to Students page
3. Click "Export Credentials" button
4. An Excel file will download with all user credentials

## Admin Capabilities

- Add/edit/delete users
- Reset passwords
- Upload new Excel sheets
- Export credential sheets anytime
- Manage study materials
- View all classes and students

## Teacher Capabilities

- View assigned classes
- Upload study materials
- View student lists
- Cannot access admin controls

## Notes

- All teacher emails have been configured for email communication
- Students must use their username (not email) to login
- Format: username@institute.local for internal authentication
