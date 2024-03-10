import React from "react";
import { Badge } from "@/components/ui/badge";

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-1 flex items-center">
            <Badge className="mr-2">{index + 1}</Badge>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
