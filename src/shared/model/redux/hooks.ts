import { useDispatch, useSelector, useStore } from "react-redux";

// делаю исключение из правил fsd (кастомные redux хуки нужны везде в проекте, поэтому 
// выносим их в /shared, но при этом их надо типизировать типами из /app/store)
import { AppDispatch, AppStore, RootState } from "@/app/store";

// у useAppDispatch типизация старого формата, потому что withTypes почему-то некорретно 
// работает для него
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();