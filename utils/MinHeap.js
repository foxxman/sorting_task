class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this.heapUp();
    }

    pop() {
        if (this.size() === 0) {
            return null;
        }

        const root = this.heap[0];
        const last = this.heap.pop();

        if (this.size() > 0) {
            this.heap[0] = last;
            this.heapDown();
        }

        return root;
    }

    size() {
        return this.heap.length;
    }

    swipe(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }

    compareLinesByIndexes (a, b) {
        return this.heap[a].line.localeCompare(this.heap[b].line) < 0;
    }

    heapUp() {
        let current = this.size() - 1;

        while (current > 0) {
            const parent = Math.floor((current - 1) / 2);
            const needToReplace = this.compareLinesByIndexes(current, parent);
            
            if ( needToReplace ) {
                this.swipe(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }

    heapDown() {
        let current = 0;

        while ( true ) {
            const leftChild = 2 * current + 1;
            const rightChild = 2 * current + 2;
            let smallest = current;

            if (
                leftChild < this.size()
                && this.compareLinesByIndexes(leftChild, smallest)
            ) {
                smallest = leftChild;
            }

            if (
                rightChild < this.size()
                && this.compareLinesByIndexes(rightChild, smallest)
            ) {
                smallest = rightChild;
            }

            if (smallest !== current) {
                this.swipe(current, smallest);
                current = smallest;
            } else {
                break;
            }
        }
    }
}

module.exports = {
    MinHeap,
}