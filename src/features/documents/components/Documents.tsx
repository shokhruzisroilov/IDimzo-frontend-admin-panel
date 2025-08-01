import { SquarePen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useNavigate } from "react-router-dom";

const Documents = () => {
  const documents = [
    {
      id: "613 445 793",
      name: "QARZ SHARTNOMASI",
      updated: "23.01.2025",
    },
  ];

  const navigate = useNavigate()

  return (
    <div>
      <h1 className="text-3xl mb-4 font-bold">Hujjatlar</h1>
      <div className="w-full h-[80vh] bg-white rounded-xl p-5">
        <button onClick={() => navigate("/documents/create")} className="bg-mainColor py-2 px-7 text-white rounded-md mb-10">
          Hujjat yaratish
        </button>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="ID bo'yicha qidirish"
            className="border border-gray-300 rounded-md p-2 w-1/4"
          />
          <input
            type="text"
            placeholder="Nomi bo'yicha qidirish"
            className="border border-gray-300 rounded-md p-2 w-1/4"
          />
        </div>
        <Table className=" border-2 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead>Yangilangan vaqti</TableHead>
              <TableHead>Tahrirlash</TableHead>
              <TableHead>O'chirish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc, index) => (
              <TableRow
                key={index}
                className="hover:bg-mainColor hover:text-white transition-colors cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.id}</TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.updated}</TableCell>
                <TableCell>
                  <SquarePen />
                </TableCell>
                <TableCell>
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Documents;
