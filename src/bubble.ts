export type IBubbleId = string

class Bubble {
  private wipId: IBubbleId

  public get id(): IBubbleId {
    return this.wipId
  }

  public pushBubble(id: IBubbleId): IBubbleId {
    const prevId = this.wipId

    this.wipId = id

    return prevId
  }

  public popBubble(id: IBubbleId) {
    this.wipId = id
  }
}

export type IBubble = Bubble
export function NewBubble(): Bubble {
  return new Bubble()
}
