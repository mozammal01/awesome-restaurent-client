import useAuth from "../../../hooks/useAuth";

const UserHome = () => {

  const { user } = useAuth();

  return (
    <div>
      <h3 className="text-4xl">
        <span>Hi, Welcome </span>
        {user ? user?.displayName : 'Back'}
      </h3>
    </div>
  );
};

export default UserHome;