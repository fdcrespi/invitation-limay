
'use server'
import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchGuests() {
  unstable_noStore();
  try {
    const data = await sql`SELECT * FROM guests`;
    return data.rows
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Error al obtener invitados')
  }
}

export async function createGuest(formData) {
  unstable_noStore();
  try {
    await sql`
      INSERT INTO guests
        (name, phone, cantidad)
      VALUES
        (${formData.name}, ${formData.phone}, ${parseInt(formData.cantidad)})
    `;
    return { message: `Invitacion agregada`, status: 200}
  } catch (err) {
    return { message: `Database Error: Failed to Create guests. ${err}`, status: 500 };
  }
}