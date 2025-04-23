export class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  isEmpty(): boolean { return this.items.length === 0; }

}

export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void { this.items.push(item); }
  dequeue(): T | undefined { return this.items.shift(); }
  peek(): T | undefined { return this.items[0]; }
  isEmpty(): boolean { return this.items.length === 0; }
}

interface HeapNode<T> {
  value: T;
  priority: number;
}

export class PriorityQueue<T> {
  private heap: HeapNode<T>[] = [];

  isEmpty(): boolean {
    return this.heap.length === 0;
  }


  enqueue(value: T, priority: number): void {
    const node: HeapNode<T> = { value, priority };
    this.heap.push(node);
    this.bubbleUp();
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const root = this.heap[0].value;
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown();
    }
    return root;
  }

  private bubbleUp(): void {

    let idx = this.heap.length - 1;
    const node = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (node.priority >= parent.priority) break;
      this.heap[parentIdx] = node;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
  }

  private sinkDown(): void {
    let idx = 0;
    const length = this.heap.length;
    const node = this.heap[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx: number | null = null;

      if (leftIdx < length) {
        if (this.heap[leftIdx].priority < node.priority) {
          swapIdx = leftIdx;
        }
      }
      if (rightIdx < length) {
        const shouldSwapRight =
          (swapIdx === null && this.heap[rightIdx].priority < node.priority) ||
          (swapIdx !== null &&
            this.heap[rightIdx].priority < this.heap[leftIdx].priority);
        if (shouldSwapRight) {
          swapIdx = rightIdx;
        }
      }
      if (swapIdx === null) break;
      this.heap[idx] = this.heap[swapIdx];
      this.heap[swapIdx] = node;
      idx = swapIdx;
    }
  }
};
