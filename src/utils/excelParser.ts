import * as XLSX from 'xlsx';

export interface ParsedStudent {
  name: string;
  class: string;
  father_mobile: string;
  mother_mobile: string;
  student_mobile: string;
  username: string;
  password: string;
}

function generateUsername(name: string, classNum: string, existingUsernames: Set<string>): string {
  const firstName = name.trim().toLowerCase().split(/\s+/)[0];
  const baseUsername = `${firstName}${classNum}`;

  let username = baseUsername;
  let counter = 1;

  while (existingUsernames.has(username)) {
    username = `${baseUsername}_${counter}`;
    counter++;
  }

  existingUsernames.add(username);
  return username;
}

function generatePassword(studentMobile: string): string {
  const last4 = studentMobile.replace(/\D/g, '').slice(-4) || '0000';
  return `AA@${last4}`;
}

export function parseExcelFile(file: File): Promise<{ students: ParsedStudent[]; errors: string[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

        if (jsonData.length < 2) {
          resolve({ students: [], errors: ['File must have a header row and at least one data row'] });
          return;
        }

        const students: ParsedStudent[] = [];
        const errors: string[] = [];
        const existingUsernames = new Set<string>();

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];

          if (!row || row.length === 0 || !row[0]) continue;

          const name = String(row[0] || '').trim();
          const classNum = String(row[1] || '').trim();
          const fatherMobile = String(row[2] || '').trim();
          const motherMobile = String(row[3] || '').trim();
          const studentMobile = String(row[4] || '').trim();

          if (!name) {
            errors.push(`Row ${i + 1}: Missing student name`);
            continue;
          }

          if (!classNum) {
            errors.push(`Row ${i + 1}: Missing class for ${name}`);
            continue;
          }

          if (!studentMobile) {
            errors.push(`Row ${i + 1}: Missing student mobile for ${name}`);
            continue;
          }

          const username = generateUsername(name, classNum, existingUsernames);
          const password = generatePassword(studentMobile);

          students.push({
            name,
            class: classNum,
            father_mobile: fatherMobile,
            mother_mobile: motherMobile,
            student_mobile: studentMobile,
            username,
            password,
          });
        }

        resolve({ students, errors });
      } catch (error) {
        reject(new Error('Failed to parse Excel file: ' + (error as Error).message));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
}

export function exportCredentialsToExcel(data: Array<{
  name: string;
  role: string;
  username: string;
  password: string;
  class?: string;
  contact?: string;
}>): void {
  const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
    'Name': item.name,
    'Role': item.role,
    'Username': item.username,
    'Password': item.password,
    'Class': item.class || '',
    'Contact': item.contact || '',
  })));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Credentials');

  const date = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `LMS_Credentials_${date}.xlsx`);
}
