class Stack {
    constructor() {
        this.stack = [];
    }
    push(item) { this.stack.push(item); }
    pop() { return this.stack.pop(); }
    peek() { return this.stack[this.stack.length - 1]; }
    isEmpty() { return this.stack.length === 0; }
    size() { return this.stack.length; }
}

module.exports = new Stack();
