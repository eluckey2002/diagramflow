import * as fabric from 'fabric'

export interface CanvasConfig {
  dimensions: {
    width: number
    height: number
    minZoom: number
    maxZoom: number
    defaultZoom: number
  }
  viewport: {
    width: number
    height: number
    offsetX: number
    offsetY: number
  }
  rendering: {
    cullingThreshold: number
    batchSize: number
    renderInterval: number
  }
}

export interface Point {
  x: number
  y: number
}

export interface Transform {
  scale: number
  translateX: number
  translateY: number
}

export interface Bounds {
  left: number
  top: number
  right: number
  bottom: number
}

export interface CanvasState {
  zoom: number
  pan: Point
  selectedIds: string[]
  isDragging: boolean
  isZooming: boolean
}

export interface CanvasObject extends fabric.Object {
  id: string
}
