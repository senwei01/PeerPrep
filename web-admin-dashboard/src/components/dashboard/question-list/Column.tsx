import { Checkbox } from "@/components/ui/checkbox";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuestionDialog from "./question-card/QuestionDialog";

export const Columns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "questionId",
    header: "ID",
    cell: ({ row }) => (
      <div className="citalize">{row.getValue("questionId")}</div>
    ),
  },
  {
    accessorKey: "questionTitle",
    header: "Title",
    cell: ({ row }) => <QuestionDialog question={row.original} />,
  },
  {
    accessorKey: "questionDifficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={` h-full w-20 rounded-md p-1 text-center ${
            row.getValue("questionDifficulty") == QuestionDifficulty.Easy
              ? "bg-green-200 text-green-600"
              : row.getValue("questionDifficulty") == QuestionDifficulty.Medium
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {row.getValue("questionDifficulty")}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const question = row.original;

  //     return <ActionsDropdown question={question} />;
  //   },
  // },
];
