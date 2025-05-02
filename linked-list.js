// class for each node in the list

class node {
    value=null;
    nextNode=null;

    constructor (value, nextNode) {
        this.value=value,
        this.nextNode=nextNode
    }
}

// class for the list builder, with functions append, prepend, size, at(index), pop, contains(value), find(value), toString

class LinkedList {
    
  constructor () {
    this.head=null;
    this.tail=null;
    this.length=0;
  }

    append(data) {
        const node1 = new node (data);
        if (this.length===0) {
            this.head=node1;
            this.tail=node1;
            this.length++;
            node1.nextNode=null;
        }
        else {
            this.tail.nextNode=node1;
            this.tail=node1;
            node1.nextNode=null;
            this.length++;
        }
    }

    prepend(data) {
        const node1 = new node (data);
        if (this.length===0) {
            this.head=node1;
            this.tail=node1;
            this.length++;
        }
          else {
            node1.nextNode=this.head;
            this.head=node1;
            this.length++;
        }
    }

    size() {
        return this.length
    }

    head() {
        return this.head
    }

    tail() {
        return this.tail
    }

    at(index) {
        if (index < 0 || index >= this.length) {
            return "Error! Invalid Index!";
        }
        let nodeIndex = this.head
        for (let i=0;i<index;i++) {
            nodeIndex=nodeIndex.nextNode
        }
        return nodeIndex
    }

    pop() {
        if (this.length===0) {
            return
        } else if (this.length===1) {
        this.head=null;
        this.tail=null;
        this.length=0;
        } else{
        this.tail=null;
        this.length--;
        let secondToLastNode = this.head
        for (let i=0;i<this.length;i++) {
        secondToLastNode=secondToLastNode.nextNode
        }     
        this.tail=secondToLastNode;
        this.tail.nextNode=null;
        }
    }

    contains(searchedValue) {
        let currentIndex = this.head;
        let resultValue=false;
        for (let i=0;i<this.length;i++) {
        if(currentIndex.value===searchedValue) {
            resultValue=true;
        }
        currentIndex=currentIndex.nextNode;
        }
        return resultValue
    }

    find(searchedValue){
        let currentIndex = this.head;
        let resultValue=null;
        for (let i=0;i<this.length;i++) {
        if(currentIndex.value===searchedValue) {
            resultValue=i;
        }
        currentIndex=currentIndex.nextNode;
        }
        return resultValue 
    }

    toString(){
        //( value ) -> ( value ) -> ( value ) -> null
        let currentIndex = this.head;
        let resultingStatement =""
        if (this.head===null) {
            return "null"
        } else {
        for (let i=0;i<this.length-1;i++) {
        resultingStatement+= (`( ${currentIndex.value} ) -> `);
            

        currentIndex=currentIndex.nextNode;
        }
        resultingStatement+="null";
        return resultingStatement  
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) {
            return "Error! Index must be within range of list!";
        }
        if (this.length===0) {
            return
        } else if (this.length===1) {
        this.pop()
            return
        } 
        
        if (index===0) {
            this.head=this.head.nextNode;
            this.length--
        } else {
        
            let nodeBeforeIndex = this.head
            let nodeIndex = this.head

            for (let i=0;i<index-1;i++) {
                nodeBeforeIndex=nodeBeforeIndex.nextNode;
                console.log(nodeBeforeIndex)
            }
            for (let i=0;i<index;i++) {
                nodeIndex=nodeIndex.nextNode;
                console.log(nodeIndex)
            }
        nodeBeforeIndex.nextNode=nodeIndex.nextNode;
        this.length--
        
        }
    }

    insertAt(value, index) {
        if (index < 0 || index >= this.length) {
            return "Error! Index must be within range of list!";
        }
        let nodeBeforeIndex = this.head
        let nodeIndex = this.head

        if (this.length===0) {
            const node1 = new node (value);
            this.head=node1;
            this.tail=node1;
            this.length=1;
        } else {
            if (index===0) {
                const node1 = new node (value);
                this.head=node1;
                this.length++;
                node1.nextNode=nodeIndex
            } else {

            for (let i=0;i<index-1;i++) {
                nodeBeforeIndex=nodeBeforeIndex.nextNode;
            }

            if (nodeIndex.nextNode===null) {
                const node1 = new node (value)
                nodeIndex.nextNode=node1;
                node1.nextNode=null;
                this.length++;
                console.log("here")
            } else {

                for (let i=0;i<index;i++) {
                nodeIndex=nodeIndex.nextNode;
                }
                console.log(nodeIndex)
                const node1 = new node (value)
                node1.nextNode=nodeIndex;
                nodeBeforeIndex.nextNode=node1;
                this.length++
            }}
            console.log(list)
        }
    }
}

export default LinkedList;