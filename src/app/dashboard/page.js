import { fetchGuests } from "../lib/data";

export default async function Dashboard() {
  const data = await fetchGuests();
  console.log(data);
  
  return (
    <>
      GUESTS
    </>
  )
}