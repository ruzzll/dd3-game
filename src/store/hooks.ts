import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import type { AppDispatch, RootState } from './'

export const useDispatch = useAppDispatch.withTypes<AppDispatch>()
export const useSelector = useAppSelector.withTypes<RootState>()
