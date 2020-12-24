import { IBubble, IBubbleId } from './bubble'

export function useBubbleId(bubble: IBubble): IBubbleId {
  return bubble.id
}
