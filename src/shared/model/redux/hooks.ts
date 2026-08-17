import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

// делаю исключение из правил fsd (кастомные redux хуки нужны везде в проекте, поэтому 
// выносим их в /shared, но при этом их надо типизировать типами из /app/store)
import { AppDispatch, AppStore, RootState } from "@/fsd-app/store";

// типизация старого формата, потому что при использовании withTypes при сборке появляется TypeError, 
// сообщающая, что нет такой функции как withTypes
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;