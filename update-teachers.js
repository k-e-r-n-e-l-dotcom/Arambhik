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
const supabaseServiceKey = envVars.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const teachers = [
  { username: 'aayushi.teacher', email: 'sajwanaayushi32@gmail.com' },
  { username: 'utkarsh.teacher', email: 'utkarshkathait188@gmail.com' },
];

async function updateTeacherEmails() {
  console.log('Updating teacher email addresses...\n');

  for (const teacher of teachers) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          email: teacher.email,
          updated_at: new Date().toISOString()
        })
        .eq('username', teacher.username)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to update ${teacher.username}: ${error.message}`);
      } else {
        console.log(`✅ Updated ${teacher.username} to ${teacher.email}`);
      }
    } catch (err) {
      console.error(`❌ Error updating ${teacher.username}:`, err.message);
    }
  }

  console.log('\n✨ Teacher email update complete!');
}

updateTeacherEmails().catch(console.error);
