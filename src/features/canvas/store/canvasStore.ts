import { create } from 'zustand'
import { CanvasState, Point } from '../types'

interface CanvasStore extends CanvasState {
  // Actions
  setZoom: (zoom: number) => void
  setPan: (pan: Point) => void
  setSelectedIds: (ids: string[]) => void
  setDragging: (isDragging: boolean) => void
  setZooming: (isZooming: boolean) => void
  reset: () => void
}

const initialState: CanvasState = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  selectedIds: [],
  isDragging: false,
  isZooming: false,
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  ...initialState,

  // Actions
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  setSelectedIds: (selectedIds) => set({ selectedIds }),
  setDragging: (isDragging) => set({ isDragging }),
  setZooming: (isZooming) => set({ isZooming }),
  reset: () => set(initialState),
}))
