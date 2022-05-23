import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import { AppDispatch } from "../redux/store";
import { getGoals, reset } from "../redux/Goal/slice";
import GoalItem from "../components/GoalItem";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state: any) => state.goals
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      toast.info("Please login before accessing the dashboard", {
        toastId: "no-dup",
      });
      navigate("/login");
    } else {
      dispatch(getGoals());
    }

    //dispatch when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal: any) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}
