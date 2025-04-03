import React from "react";
import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

const FormSubmit = ({
  text,
  pending,
  disabled,
}: {
  text: string;
  pending: boolean;
  disabled: boolean;
}) => {
  //const { pending } = useFormStatus();
  return (
    <Button type="submit" data-testid="submit" disabled={disabled}>
      {pending ? "Submitting..." : text}
    </Button>
  );
};

export default FormSubmit;
