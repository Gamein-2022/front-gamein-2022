import { useSetRecoilState } from "recoil";
import { getInfo } from "../apis/profile";
import { balanceState } from "../store/team-info";

function useUpdateBalance() {
  const setBalance = useSetRecoilState(balanceState);

  const updateBalance = () => {
    getInfo()
      .then((res) => res.data)
      .then((data) => {
        setBalance(data.balance);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return updateBalance;
}

export default useUpdateBalance;
