import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";

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
  console.log(formData)
  try {
    await sql`
      INSERT INTO guests
        (name, phone, cantidad)
      VALUES
        (${formData.name}, ${formData.phone}, ${parseInt(formData.cantidad)})
    `;
  } catch (err) {
    return { message: `Database Error: Failed to Create Invoice. ${err}` };
  }
  revalidatePath('/');
  redirect('/');
}