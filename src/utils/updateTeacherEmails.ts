import { supabase } from '../lib/supabase';

export async function updateTeacherEmails() {
  const teachers = [
    { username: 'aayushi.teacher', email: 'sajwanaayushi32@gmail.com' },
    { username: 'utkarsh.teacher', email: 'utkarshkathait188@gmail.com' },
  ];

  const results = [];

  for (const teacher of teachers) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ email: teacher.email, updated_at: new Date().toISOString() })
      .eq('username', teacher.username)
      .select()
      .single();

    if (error) {
      results.push({ username: teacher.username, success: false, error: error.message });
    } else {
      results.push({ username: teacher.username, success: true, data });
    }
  }

  return results;
}
