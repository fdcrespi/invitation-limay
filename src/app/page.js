"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { createGuest } from "./lib/data";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [msgerr, setmsg] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cantidad: 0,
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (msgerr) setmsg(null);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeAcompaniante = (value) => {
    setFormData({
      ...formData,
      cantidad: value,
    });
  }

  const handleSubmit = async (e) => {
    event.preventDefault();
    if (!formData.name) {
      setmsg("El nombre no puede estar vacio");
      return;
    }
    try {
      const res = await createGuest(formData);
      if (res.status == 200) {
        setOpen(false);
        toast("Asistencia confirmada.", {
          style: { backgroundColor: "#4caf50", color: "#fff" },
          action: {
            label: "Cerrar",
          },
        });
      } else {
        console.log(res);
        toast("Intente nuevamente.", {
          action: {
            label: "Cerrar",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg">
      <main className="main-bg h-[100dvh] flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="absolute bottom-16 right-5">
            <Button
              variant="outline"
              className="bg-lime-600 text-white font-semibold"
              onClick={() => {
                setOpen(true), setFormData({ ...formData, name: "" });
              }}
            >
              Confirmar asistencia
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] top-2 translate-y-0">
            <DialogHeader>
              <DialogTitle>Confirmar asistencia</DialogTitle>
              <DialogDescription>
                Complete los siguientes campos para confirmar su asistencia
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  placeholder="Nombre y apellido"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Tel.
                </Label>
                <Input
                  id="phone"
                  type="number"
                  name="phone"
                  placeholder="Telefono"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
            </div>
            {msgerr && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{msgerr}</AlertDescription>
              </Alert>
            )}
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
