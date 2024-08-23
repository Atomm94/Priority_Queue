export default class PriorityQueue<T> {
    private heap: { element: T; priority: number }[];
    private indexMap: Map<T, number>;

    constructor() {
        this.heap = [];
        this.indexMap = new Map();
    }

    /**
     * Insert a new element with a given priority
     * @param element
     * @param priority
     */
    insert(element: T, priority: number): void {
        this.heap.push({ element, priority });
        const index = this.heap.length - 1;
        this.indexMap.set(element, index);
        this.swapUp(index);
    }

    /**
     * Remove the element with the highest priority
     */
    removeMax(): T | null {
        if (this.heap.length === 0) return null;

        const max = this.heap[0];
        const last = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.indexMap.set(last.element, 0);
            this.swapDown(0);
        }

        this.indexMap.delete(max.element);
        return max.element;
    }

    /**
     * Update the priority of an existing element
     * @param element
     * @param newPriority
     */
    updatePriority(element: T, newPriority: number): void {
        const index = this.indexMap.get(element);
        if (index === undefined) return;

        const oldPriority = this.heap[index].priority;
        this.heap[index].priority = newPriority;

        if (newPriority > oldPriority) {
            this.swapUp(index);
        } else {
            this.swapDown(index);
        }
    }

    /**
     * Move an element up the heap
     * @param index
     * @private
     */
    private swapUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority <= this.heap[parentIndex].priority) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    /**
     * Move an element up the heap
     * @param index
     * @private
     */
    private swapDown(index: number): void {
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largestIndex = index;

            if (
                leftChildIndex < length &&
                this.heap[leftChildIndex].priority > this.heap[largestIndex].priority
            ) {
                largestIndex = leftChildIndex;
            }

            if (
                rightChildIndex < length &&
                this.heap[rightChildIndex].priority > this.heap[largestIndex].priority
            ) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex === index) break;

            this.swap(index, largestIndex);
            index = largestIndex;
        }
    }

    /**
     * Swap elements
     * @param i
     * @param j
     * @private
     */
    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        this.indexMap.set(this.heap[i].element, i);
        this.indexMap.set(this.heap[j].element, j);
    }
}
