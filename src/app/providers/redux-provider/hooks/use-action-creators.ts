import { useMemo } from "react";
import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./use-app-dispatch";

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
};
