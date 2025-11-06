class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(it) { this.items.push(it); }
    dequeue() { return this.items.shift(); }
    peek() { return this.items[0]; }
    size() { return this.items.length; }
    isEmpty() { return this.items.length === 0; }
    clear() { this.items = []; }
}

module.exports = new Queue();
