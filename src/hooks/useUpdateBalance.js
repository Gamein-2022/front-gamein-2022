import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getInfo } from "../apis/profile";
import { balanceState } from "../store/team-info";

function useUpdateBalance() {
  const setBalance = useSetRecoilState(balanceState);
  const navigate = useNavigate();

  const updateBalance = () => {
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate("/login");
        }
      });
  };

  return updateBalance;
}

export default useUpdateBalance;
