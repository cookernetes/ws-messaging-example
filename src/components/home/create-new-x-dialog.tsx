import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CreateNewXDialog({
  xText,
  dataFields,
  onSubmit,
}: {
  xText: string;
  dataFields: readonly string[];
  onSubmit: (fieldsDataValues: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldDatas, setFieldDatas] = useState<string[]>([]);

  const handleValueChange = (idx: number, dv: string) => {
    let newFieldDatas = fieldDatas;
    newFieldDatas[idx] = dv.trim();
    setFieldDatas(newFieldDatas);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(io) => setIsOpen(io)}>
      <Button onClick={() => setIsOpen(true)}>Create new {xText}</Button>
      <DialogContent className={"sm:max-w-[425px]"}>
        <DialogHeader>
          <DialogTitle>Create new {xText}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {dataFields.map((df, idx) => (
            <div key={idx} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {df}
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={fieldDatas[idx]}
                onChange={(e) => handleValueChange(idx, e.target.value)}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              onSubmit(fieldDatas);
              setIsOpen(false);
            }}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
