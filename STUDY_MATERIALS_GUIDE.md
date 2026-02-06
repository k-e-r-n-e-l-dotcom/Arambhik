# Study Materials Management System

## Overview

The study materials are now stored in a **Supabase database** instead of hardcoded files. This allows you to:
- Update content without redeploying the application
- Add, edit, or delete study materials through an admin interface
- Scale to any number of classes, subjects, and chapters

## Database Structure

### Tables

1. **classes** - Stores class information (Class 6, Class 7, etc.)
2. **subjects** - Stores subjects for each class (Science, Mathematics, etc.)
3. **chapters** - Stores individual chapters with notes and NCERT links

## How to Use

### For Administrators

#### Accessing the Admin Panel

1. Login as an admin user (credentials: admin@test.com / admin123)
2. Go to **Admin Dashboard** → Click "Manage Study Materials"
3. Or navigate directly to `/admin/study-materials`

#### Managing Content

**Viewing Content:**
- Select a **Class** from the left panel
- Select a **Subject** from the middle panel
- View all **Chapters** in the right panel

**Adding a New Chapter:**
1. Select the class and subject where you want to add the chapter
2. Click the **+ button** in the Chapters section
3. Fill in:
   - Chapter Title
   - NCERT Link (URL to the textbook)
   - Study Notes (comprehensive notes for students)
4. Click **Add Chapter**

**Editing a Chapter:**
1. Click the **Edit icon** (pencil) next to any chapter
2. Update the title, NCERT link, or notes
3. Click **Update Chapter**

**Deleting a Chapter:**
1. Click the **Delete icon** (trash) next to any chapter
2. Confirm the deletion

#### Migrating Data from Code

If you have updated the `studentData.ts` file and want to transfer that data to the database:
1. Go to `/admin/study-materials`
2. Click the **"Migrate Data from Code"** button
3. Wait for the migration to complete
4. The data will be added to the database

### For Students

#### Viewing Study Materials

1. Login as a student (credentials: student@test.com / student123)
2. Go to **Student Dashboard** (automatic redirect after login)
3. Select your **Class** (6, 7, 8, 9, or 10)
4. Browse subjects and chapters

#### Expanding Content

- Click the **down arrow** (▼) on any chapter to expand and view study notes
- Click the **up arrow** (▲) to collapse the notes
- Use **"Expand All"** button to open all chapters at once
- Use **"Collapse All"** button to close all chapters

#### Accessing NCERT Textbooks

- Each chapter has an **"Open NCERT Textbook"** button
- Click it to open the official NCERT textbook in a new tab

## Benefits of Database Storage

### Easy Updates
- No need to redeploy the app when content changes
- Updates are immediately visible to all users

### Scalability
- Add unlimited classes, subjects, and chapters
- No performance issues with large amounts of content

### Flexibility
- Easily reorganize content by changing display order
- Add new fields without code changes

### Full Content Visibility
- Notes are no longer hidden in modals
- Expandable/collapsible design for better reading experience
- Students can see all content without clicking through popups

## Future Enhancements

You can easily extend this system by:
1. Adding more subjects to existing classes
2. Adding new classes (Class 11, 12, etc.)
3. Adding multimedia content (images, videos, PDFs)
4. Adding progress tracking for students
5. Adding quizzes and assessments
6. Adding search functionality

## Technical Details

### Database Access
- All content is publicly readable (no login required to view)
- Only authenticated admin users can modify content
- Row Level Security (RLS) policies protect the data

### API Endpoints
The app uses Supabase JavaScript client to:
- Fetch classes, subjects, and chapters
- Insert, update, and delete content
- Real-time updates when content changes

### File Locations
- Database schema: Migration file created automatically
- Admin interface: `/src/pages/admin/StudyMaterials.tsx`
- Student dashboard: `/src/pages/student/Dashboard.tsx`
- Supabase client: `/src/lib/supabase.ts`
- Migration script: `/src/scripts/migrateData.ts`
