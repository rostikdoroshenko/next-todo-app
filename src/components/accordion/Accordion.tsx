import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { use, useState } from "react";
import AlertDialog from "@/components/dialog/Dialog";
import { TodosContext } from "@/store/todos-context";

interface Props {
  title: string;
  details: string;
  id: string;
}

const AccordionItem: React.FC<Props> = ({ title, details, id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isLoading, editTodoFn } = use(TodosContext);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id={id}
      >
        <Typography component="span">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ whiteSpace: "pre-line" }}>
        {details}
      </AccordionDetails>
      <AccordionActions>
        <Button
          disabled={isLoading}
          size="small"
          onClick={() => editTodoFn(id)}
        >
          Edit
        </Button>
        <Button
          disabled={isLoading}
          data-testid={"open-dialog-" + title}
          color="error"
          size="small"
          onClick={() => setIsDialogOpen(true)}
        >
          Delete
        </Button>
      </AccordionActions>
      <AlertDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`Remove Todo: ${title}`}
        id={id}
      >
        Are you sure you want to delete {title} todo ?
      </AlertDialog>
    </Accordion>
  );
};
export default AccordionItem;
