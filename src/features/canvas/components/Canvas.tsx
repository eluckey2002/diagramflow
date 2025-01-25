import { useEffect, useRef } from 'react'
import * as fabric from 'fabric'
import { useCanvasStore } from '../store/canvasStore'
import { CanvasConfig } from '../types'

const defaultConfig: CanvasConfig = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
    minZoom: 0.25,
    maxZoom: 4,
    defaultZoom: 1,
  },
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    offsetX: 0,
    offsetY: 0,
  },
  rendering: {
    cullingThreshold: 100,
    batchSize: 50,
    renderInterval: 16,
  },
}

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const { zoom, pan, setZoom, setPan } = useCanvasStore()

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Fabric canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: defaultConfig.dimensions.width,
      height: defaultConfig.dimensions.height,
      selection: true,
      preserveObjectStacking: true,
    })

    const canvas = fabricRef.current

    // Set up event handlers
    const handleMouseWheel = (opt: fabric.TEvent<WheelEvent>) => {
      const delta = opt.e.deltaY
      let newZoom = zoom * (1 - delta / 1000)
      newZoom = Math.min(
        Math.max(newZoom, defaultConfig.dimensions.minZoom),
        defaultConfig.dimensions.maxZoom
      )
      setZoom(newZoom)

      const pointer = canvas.getPointer(opt.e)
      const point = {
        x: pointer.x - pan.x,
        y: pointer.y - pan.y,
      }

      setPan({
        x: pointer.x - point.x * (newZoom / zoom),
        y: pointer.y - point.y * (newZoom / zoom),
      })

      opt.e.preventDefault()
      opt.e.stopPropagation()
    }

    canvas.on('mouse:wheel', handleMouseWheel)

    // Cleanup
    return () => {
      canvas.off('mouse:wheel', handleMouseWheel)
      canvas.dispose()
    }
  }, [pan.x, pan.y, setPan, setZoom, zoom])

  // Update canvas on zoom/pan changes
  useEffect(() => {
    if (!fabricRef.current) return

    fabricRef.current.setZoom(zoom)
    fabricRef.current.absolutePan({ x: pan.x, y: pan.y } as fabric.Point)
  }, [zoom, pan.x, pan.y])

  return (
    <div className="w-full h-full overflow-hidden bg-gray-100">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
