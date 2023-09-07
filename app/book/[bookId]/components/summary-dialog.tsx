"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface SummaryDialogProps {}

const SummaryDialog: FC<SummaryDialogProps> = ({}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <DialogContent></DialogContent>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SummaryDialog;
