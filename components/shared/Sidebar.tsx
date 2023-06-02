import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import Button from "./Button";

export default function Sidebar() {
  const { logout } = useUser();
  const { currentUser } = useAuth();

  return (
    <div className="flex justify-between">
      Sidebar
      {currentUser && <Button onClick={logout}>登出</Button>}
    </div>
  );
}
