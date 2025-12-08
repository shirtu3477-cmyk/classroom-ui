import { RootState } from "../../store";
import { useSelector } from "react-redux";

export const useClassesSelector = useSelector.withTypes<RootState>();
