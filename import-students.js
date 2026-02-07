import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFile = readFileSync(join(__dirname, '.env'), 'utf-8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseAnonKey = envVars.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function generateUsername(name, classNum, existingUsernames) {
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

function generatePassword(studentMobile) {
  const last4 = studentMobile.replace(/\D/g, '').slice(-4) || '0000';
  return `AA@${last4}`;
}

async function parseAndImportStudents(excelFilePath) {
  console.log('Reading Excel file...');

  const workbook = XLSX.readFile(excelFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  if (jsonData.length < 2) {
    console.error('File must have a header row and at least one data row');
    return;
  }

  console.log(`Found ${jsonData.length - 1} students in Excel file\n`);

  const existingUsernames = new Set();
  const studentsToCreate = [];

  for (let i = 1; i < jsonData.length; i++) {
    const row = jsonData[i];

    if (!row || row.length === 0 || !row[0]) continue;

    const name = String(row[0] || '').trim();
    const classNum = String(row[1] || '').trim();
    const fatherMobile = String(row[2] || '').trim();
    const motherMobile = String(row[3] || '').trim();
    const studentMobile = String(row[4] || '').trim();

    if (!name || !classNum || !studentMobile) {
      console.log(`⚠️  Skipping row ${i + 1}: Missing required data`);
      continue;
    }

    const username = generateUsername(name, classNum, existingUsernames);
    const password = generatePassword(studentMobile);

    studentsToCreate.push({
      name,
      class: classNum,
      father_mobile: fatherMobile,
      mother_mobile: motherMobile,
      student_mobile: studentMobile,
      username,
      password,
    });
  }

  console.log(`Prepared ${studentsToCreate.length} students for import\n`);
  console.log('Sample credentials:');
  studentsToCreate.slice(0, 3).forEach(s => {
    console.log(`  ${s.name} → ${s.username} / ${s.password}`);
  });
  console.log('');

  console.log('NOTE: This script requires admin authentication through the edge function.');
  console.log('Please use the admin interface to upload the Excel file directly.\n');

  console.log('Alternatively, provide your admin credentials to continue (username/password):');
}

const excelPath = process.argv[2] || './students_utkarsh.xlsx';
parseAndImportStudents(excelPath).catch(console.error);
