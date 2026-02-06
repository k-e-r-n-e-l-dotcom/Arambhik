import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

function respond(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function verifyAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) return false;
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return profile?.role === "admin";
}

const SAMPLE_STUDENTS = [
  { username: "AA001", name: "Aarav Sharma", class: "Class 6", father_mobile: "9876543201", mother_mobile: "9876543202", student_mobile: "9876543203" },
  { username: "AA002", name: "Ananya Verma", class: "Class 6", father_mobile: "9876543204", mother_mobile: "9876543205", student_mobile: "9876543206" },
  { username: "AA003", name: "Vihaan Gupta", class: "Class 6", father_mobile: "9876543207", mother_mobile: "9876543208", student_mobile: "9876543209" },
  { username: "AA004", name: "Diya Patel", class: "Class 7", father_mobile: "9876543210", mother_mobile: "9876543211", student_mobile: "9876543212" },
  { username: "AA005", name: "Arjun Singh", class: "Class 7", father_mobile: "9876543213", mother_mobile: "9876543214", student_mobile: "9876543215" },
  { username: "AA006", name: "Ishita Reddy", class: "Class 7", father_mobile: "9876543216", mother_mobile: "9876543217", student_mobile: "9876543218" },
  { username: "AA007", name: "Reyansh Kumar", class: "Class 8", father_mobile: "9876543219", mother_mobile: "9876543220", student_mobile: "9876543221" },
  { username: "AA008", name: "Kavya Iyer", class: "Class 8", father_mobile: "9876543222", mother_mobile: "9876543223", student_mobile: "9876543224" },
  { username: "AA009", name: "Aditya Joshi", class: "Class 8", father_mobile: "9876543225", mother_mobile: "9876543226", student_mobile: "9876543227" },
  { username: "AA010", name: "Myra Kapoor", class: "Class 9", father_mobile: "9876543228", mother_mobile: "9876543229", student_mobile: "9876543230" },
  { username: "AA011", name: "Sai Naik", class: "Class 9", father_mobile: "9876543231", mother_mobile: "9876543232", student_mobile: "9876543233" },
  { username: "AA012", name: "Zara Khan", class: "Class 9", father_mobile: "9876543234", mother_mobile: "9876543235", student_mobile: "9876543236" },
  { username: "AA013", name: "Vivaan Mehta", class: "Class 10", father_mobile: "9876543237", mother_mobile: "9876543238", student_mobile: "9876543239" },
  { username: "AA014", name: "Nisha Agarwal", class: "Class 10", father_mobile: "9876543240", mother_mobile: "9876543241", student_mobile: "9876543242" },
  { username: "AA015", name: "Rohan Desai", class: "Class 10", father_mobile: "9876543243", mother_mobile: "9876543244", student_mobile: "9876543245" },
];

async function bootstrap() {
  const results = { admin: false, students_created: 0 };

  const { data: existingAdmin } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("role", "admin")
    .maybeSingle();

  if (!existingAdmin) {
    const { data: authUser, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: "admin@institute.local",
        password: "admin123",
        email_confirm: true,
        app_metadata: { role: "admin" },
      });
    if (authError) throw authError;

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: authUser.user.id,
        full_name: "Administrator",
        role: "admin",
        username: "admin",
        email: "admin@institute.local",
      });
    if (profileError) throw profileError;
    results.admin = true;
  }

  const { count } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "student");

  if (count === 0) {
    for (const s of SAMPLE_STUDENTS) {
      try {
        const { data: authUser, error: authError } =
          await supabaseAdmin.auth.admin.createUser({
            email: `${s.username}@institute.local`,
            password: "AA@1234",
            email_confirm: true,
            app_metadata: { role: "student" },
          });
        if (authError) continue;

        await supabaseAdmin.from("profiles").insert({
          id: authUser.user.id,
          full_name: s.name,
          role: "student",
          username: s.username,
          email: `${s.username}@institute.local`,
          class: s.class,
          father_mobile: s.father_mobile,
          mother_mobile: s.mother_mobile,
          student_mobile: s.student_mobile,
        });
        results.students_created++;
      } catch {
        continue;
      }
    }
  }

  return results;
}

interface StudentInput {
  name: string;
  class: string;
  father_mobile: string;
  mother_mobile: string;
  student_mobile: string;
  email: string;
  username: string;
  password: string;
}

async function bulkCreateStudents(students: StudentInput[]) {
  const results = { created: 0, errors: [] as string[] };

  for (const student of students) {
    try {
      const { data: existingProfile } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("username", student.username)
        .maybeSingle();

      if (existingProfile) {
        results.errors.push(
          `${student.name}: Username '${student.username}' already exists`
        );
        continue;
      }

      const authEmail = `${student.username}@institute.local`;
      const { data: authUser, error: authError } =
        await supabaseAdmin.auth.admin.createUser({
          email: authEmail,
          password: student.password,
          email_confirm: true,
          app_metadata: { role: "student" },
        });

      if (authError) {
        results.errors.push(`${student.name}: ${authError.message}`);
        continue;
      }

      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .insert({
          id: authUser.user.id,
          full_name: student.name,
          role: "student",
          username: student.username,
          email: student.email || authEmail,
          class: student.class,
          father_mobile: student.father_mobile,
          mother_mobile: student.mother_mobile,
          student_mobile: student.student_mobile,
        });

      if (profileError) {
        results.errors.push(`${student.name}: ${profileError.message}`);
        await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
        continue;
      }

      results.created++;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      results.errors.push(`${student.name}: ${message}`);
    }
  }

  return results;
}

interface TeacherInput {
  name: string;
  subject: string;
  phone: string;
  username: string;
  password: string;
}

async function createTeacher(teacher: TeacherInput) {
  const { data: existingProfile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("username", teacher.username)
    .maybeSingle();

  if (existingProfile) {
    throw new Error(`Username '${teacher.username}' already exists`);
  }

  const authEmail = `${teacher.username}@institute.local`;
  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email: authEmail,
      password: teacher.password,
      email_confirm: true,
      app_metadata: { role: "teacher" },
    });

  if (authError) throw authError;

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: authUser.user.id,
      full_name: teacher.name,
      role: "teacher",
      username: teacher.username,
      email: authEmail,
      phone: teacher.phone,
      teacher_subject: teacher.subject,
    });

  if (profileError) {
    await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
    throw profileError;
  }

  return { message: `Teacher ${teacher.name} created successfully` };
}

async function listUsers(role?: string) {
  let query = supabaseAdmin
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (role) query = query.eq("role", role);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

async function deleteUser(userId: string) {
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .delete()
    .eq("id", userId);
  if (profileError) throw profileError;

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (error) throw error;
  return { message: "User deleted successfully" };
}

async function resetPassword(userId: string, newPassword: string) {
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });
  if (error) throw error;
  return { message: "Password reset successfully" };
}

async function updateProfile(userId: string, updates: Record<string, string>) {
  const { error } = await supabaseAdmin
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
  return { message: "Profile updated successfully" };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "bootstrap") {
      const result = await bootstrap();
      return respond(result);
    }

    const isAdminUser = await verifyAdmin(
      req.headers.get("Authorization")
    );
    if (!isAdminUser) {
      return respond({ error: "Unauthorized - admin access required" }, 403);
    }

    let result;

    switch (action) {
      case "bulk-create-students":
        result = await bulkCreateStudents(body.students);
        break;
      case "create-teacher":
        result = await createTeacher(body.teacher);
        break;
      case "list-users":
        result = await listUsers(body.role);
        break;
      case "delete-user":
        result = await deleteUser(body.userId);
        break;
      case "reset-password":
        result = await resetPassword(body.userId, body.newPassword);
        break;
      case "update-profile":
        result = await updateProfile(body.userId, body.updates);
        break;
      default:
        return respond({ error: "Invalid action" }, 400);
    }

    return respond(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return respond({ error: message }, 500);
  }
});
