import { IBubble, IBubbleId } from './bubble'
import React, { useEffect, useRef } from 'react'
import {v4 as uuid} from 'uuid'

export function withBubbleDown<P extends object>(bubble: IBubble, Com: React.ComponentType<P>): React.ComponentType<P> {
  return ((props: P) => {
    const id$ = useRef<IBubbleId>()
    if (!id$.current) {
      id$.current = uuid()
    }

    const prevId = bubble.pushBubble(id$.current)

    const node =  <Com {...props} />

    bubble.popBubble(prevId)

    return node
  })
}

export function withBubbleUp<P extends object>(bubble: IBubble, Com: React.ComponentType<P>): React.ComponentType<P & {
  onBubbleUp?: (id: IBubbleId) => void
  onBubbleBroken?: (id: IBubbleId) => void
}> {
  return ((props: P & {
    onBubbleUp: (id: IBubbleId) => void
    onBubbleBroken: (id: IBubbleId) => void
  }) => {
    const id$ = useRef<IBubbleId>()
    if (!id$.current) {
      id$.current = uuid()
    }

    const prevId = bubble.pushBubble(uuid())

    const node =  <Com {...props} />

    bubble.popBubble(prevId)

    useEffect(() => {
      props.onBubbleUp && props.onBubbleUp(id$.current!)

      return () => {
        props.onBubbleBroken && props.onBubbleBroken(id$.current!)
      }
    }, [])

    return node
  })
}
