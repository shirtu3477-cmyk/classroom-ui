import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useClassesSelector = useSelector.withTypes<RootState>();
