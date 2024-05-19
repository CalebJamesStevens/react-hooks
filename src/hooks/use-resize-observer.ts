import { useEffect, useMemo, useRef } from 'react'

type ObserverHandler = (contectRect: Omit<DOMRectReadOnly, 'toJSON'>) => void

/**
 * Detects changes to the dimensions of an Element with ResizeObserver.
 * @param {ObserverHandler} handler Function called when the size of the element observed changes. Content Rect values are passed as an object parameter.
 * @param {React.DependencyList} depsList Optional list of dependencies used in the handler. Pass state values that the handler might depend on.
 * @param {ResizeObserverOptions} options ResizeObserver options.
 * @returns Ref object that must be passed to the element whose size is being observed.
 */
export const useResizeObserver = <T extends HTMLElement>(
  handler: ObserverHandler,
  depsList?: React.DependencyList,
  options?: ResizeObserverOptions
) => {
  const frameID = useRef(0)
  const ref = useRef<T>(null)

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver((entries) => {
            const entry = entries[0]

            if (entry) {
              cancelAnimationFrame(frameID.current)

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  handler(entry.contentRect)
                }
              })
            }
          })
        : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    depsList || []
  )

  useEffect(() => {
    if (ref.current) {
      observer?.observe(ref.current, options)
    }

    return () => {
      observer?.disconnect()

      if (frameID.current) {
        cancelAnimationFrame(frameID.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, observer])

  return ref
}