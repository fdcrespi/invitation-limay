import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchGuests } from "../lib/data";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function Dashboard() {
  const data = await fetchGuests();

  const cantidadTotal = data.reduce(
    (acc, curr) => acc + (curr.cantidad + 1),
    0
  );

  return (
    <main className="h-[100dvh] flex flex-col gap-4 row-start-2 items-center sm:items-start p-4">
      <Card className="mx-auto">
        <CardHeader>
          <CardTitle>Asistencia</CardTitle>
          <CardDescription>Cantidad de confirmados</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Cantidad de confirmaciones:{" "}
            <span className="font-semibold">{data.length}</span>
          </p>
          <p>
            Cantidad de personas confirmadas:{" "}
            <span className="font-semibold">{cantidadTotal}</span>
          </p>
        </CardContent>
      </Card>
      <Table className="overflow-auto">
        <TableCaption className="caption-top">Lista de confirmados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead className="text-right">Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.map(invitado => (
              <TableRow key={invitado.id}>
                <TableCell className="w-96">{invitado.name}</TableCell>
                <TableCell>{invitado.cantidad}</TableCell>
                <TableCell className="text-right">{new Date(invitado.created_at).toLocaleDateString('es-AR')}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="bg-gray-100 font-semibold">
            <TableCell colSpan={2} className="text-right">Total:</TableCell>
            <TableCell>{cantidadTotal}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}
