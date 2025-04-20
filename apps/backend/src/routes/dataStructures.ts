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
}
