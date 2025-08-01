import { User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { PaginationComponent } from "./Pagination";
import { Link } from "react-router-dom";

const users = [
  {
    user: "David",
    avatar: "https://i.pravatar.cc/40?u=1",
    paymentCount: "1",
    id: "104214893",
    status: "Active",
    date: "12 Jan, 2025",
  },
  {
    user: "Emily",
    avatar: "https://i.pravatar.cc/40?u=2",
    paymentCount: "3",
    id: "203112765",
    status: "Inactive",
    date: "05 Feb, 2025",
  },
  {
    user: "Michael",
    avatar: "https://i.pravatar.cc/40?u=3",
    paymentCount: "2",
    id: "984321555",
    status: "Active",
    date: "23 Mar, 2025",
  },
  {
    user: "Sarah",
    avatar: "https://i.pravatar.cc/40?u=4",
    paymentCount: "5",
    id: "712909334",
    status: "Pending",
    date: "14 Apr, 2025",
  },
  {
    user: "John",
    avatar: "https://i.pravatar.cc/40?u=5",
    paymentCount: "4",
    id: "623888120",
    status: "Active",
    date: "30 May, 2025",
  },
  {
    user: "Olivia",
    avatar: "https://i.pravatar.cc/40?u=6",
    paymentCount: "1",
    id: "812734999",
    status: "Inactive",
    date: "02 Jun, 2025",
  },
  {
    user: "William",
    avatar: "https://i.pravatar.cc/40?u=7",
    paymentCount: "6",
    id: "455678222",
    status: "Active",
    date: "10 Jul, 2025",
  },
  {
    user: "Sophia",
    avatar: "https://i.pravatar.cc/40?u=8",
    paymentCount: "3",
    id: "301456789",
    status: "Pending",
    date: "18 Aug, 2025",
  },
  {
    user: "James",
    avatar: "https://i.pravatar.cc/40?u=9",
    paymentCount: "2",
    id: "900222111",
    status: "Inactive",
    date: "25 Sep, 2025",
  },
  {
    user: "Isabella",
    avatar: "https://i.pravatar.cc/40?u=10",
    paymentCount: "4",
    id: "777333000",
    status: "Active",
    date: "03 Oct, 2025",
  },
];

const UsersTable = () => {
  return (
    <div>
      <Table className="border bordere-2 bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Mijoz</TableHead>
            <TableHead>Xizmatdan foydalanishlar soni</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Qo'shilgan sana</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-mainColor hover:text-white transition-colors cursor-pointer"
            >
              <Link to={`/users/${user.id}`} className="contents">
                <TableCell className="rounded-l-md font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.user}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{user.user}</span>
                  </div>
                </TableCell>
                <TableCell>{user.paymentCount}</TableCell>
                <TableCell>{Number(user.id).toLocaleString()}</TableCell>
                <TableCell className="text-right">{user.status}</TableCell>
                <TableCell className="text-right rounded-r-md">
                  {user.date}
                </TableCell>
              </Link>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-[30px]">
        <div className="flex items-center gap-3 bg-mainColor text-white px-3 rounded-lg">
          <User />
          <p>Mijozlar soni 2 760 ta.</p>
        </div>
        <PaginationComponent />
      </div>
    </div>
  );
};

export default UsersTable;
