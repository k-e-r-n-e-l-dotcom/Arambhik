export interface ParsedStudent {
  name: string;
  class: string;
  father_mobile: string;
  mother_mobile: string;
  student_mobile: string;
  email: string;
  username: string;
  password: string;
}

const EXPECTED_HEADERS = [
  'student name',
  'class',
  'father mobile number',
  'mother mobile number',
  'student mobile number',
  'email id',
  'username',
  'password',
];

function normalizeCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  return fields;
}

export function parseCSV(content: string): { students: ParsedStudent[]; errors: string[] } {
  const lines = content
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (lines.length < 2) {
    return { students: [], errors: ['File must have a header row and at least one data row'] };
  }

  const headerFields = normalizeCsvLine(lines[0]).map(h => h.toLowerCase().trim());
  const missingHeaders = EXPECTED_HEADERS.filter(
    expected => !headerFields.some(h => h.includes(expected.split(' ')[0]))
  );

  if (missingHeaders.length > 3) {
    return {
      students: [],
      errors: [`CSV format does not match. Expected columns: ${EXPECTED_HEADERS.join(', ')}`],
    };
  }

  const students: ParsedStudent[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const fields = normalizeCsvLine(lines[i]);
    if (fields.length < 3) continue;

    const name = fields[0] || '';
    const cls = fields[1] || '';
    const username = fields[6] || fields[0]?.toLowerCase().replace(/\s+/g, '.') || '';
    const password = fields[7] || 'Student@123';

    if (!name) {
      errors.push(`Row ${i + 1}: Missing student name`);
      continue;
    }

    students.push({
      name,
      class: cls,
      father_mobile: fields[2] || '',
      mother_mobile: fields[3] || '',
      student_mobile: fields[4] || '',
      email: fields[5] || '',
      username,
      password,
    });
  }

  return { students, errors };
}
