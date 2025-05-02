import LinkedList from "./linked-list.js"

// creat a  class with set(key, value), get(key), has(key), remove(key) ...

class HashMap {
    constructor(loadFactor=0.75, capacity=16) {
    this.loadFactor=loadFactor;
    this.capacity=capacity;
    this.buckets=new Array(capacity).fill(null);
    this.size=0;
    }

    errorBucket(index) {
      if (index < 0 || index >= this.buckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
    }

    hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
    } 

    set(key, value) {

// to create an index within my hashmap I need remainder of the hashkey from capacity

      const index= this.hash(key) % this.capacity;
      this.errorBucket(index);

// check if the key already exists. If so write over the value, otherwise create a linkedlist

    if (this.buckets[index]===null){
      const list = new LinkedList();
      this.buckets[index]=list;
      this.buckets[index].append([key, value]);
      this.size++;
    } else {
      let keyAlreadyExist = false
      for (let i=0; i<this.buckets[index].size();i++) {
        if (this.buckets[index].at(i).value[0]===key) {
          this.buckets[index].at(i).value[1] = value;
          keyAlreadyExist=true
        }
      }
      if (keyAlreadyExist===false) {
      this.buckets[index].append([key, value]);
      this.size++;
      }
      }

      // resize the hash table if there are too many items

      if (this.size/this.capacity>this.loadFactor) {
        this.resize();
      }
    }

    resize () {
      let oldBuckets = this.buckets;
      this.capacity=this.capacity*2;
      this.buckets=new Array(this.capacity).fill(null);
      this.size=0;
      // reposition all old buckets by finding their new hashmap

      for (let i of oldBuckets) {
        if(i!==null) {
          for (let j=0; j<i.size();j++) {
            this.set(i.at(j).value[0], i.at(j).value[1]) 
            }

        }

      }
    }

    get (key) {
      const index=this.hash(key) % this.capacity;
      this.errorBucket(index);
      let result=null;
      this.buckets.forEach((el)=>{
      if (el!==null) {
        for (let i=0; i<this.buckets[index].size();i++) {
          if (el.at(i).value[0]===key) {
            result = el.at(i).value[1]
          }
        }   
      }});
      return result;
    }

    has (key) {
      const index=this.hash(key) % this.capacity;
      this.errorBucket(index);
      let result=false;
      this.buckets.forEach((el)=>{
      if (el!==null) {
        for (let i=0; i<this.buckets[index].size();i++) {
          if (el.at(i).value[0]===key) {
            result = true;
          }
        }   
      }});
      return result;
    }

    remove (key) {
      const index=this.hash(key) % this.capacity;
      this.errorBucket(index);
      let result=false;
      console.log(this.buckets);
      this.buckets.forEach((el)=>{
      if (el!==null) {
        for (let i=0; i<el.size();i++) {
          if (el.at(i).value[0]===key) {
            if(el.size()===1){
            this.buckets[index]=null
            result=true;
            }else {
            el.removeAt(i)
            result=true;
            }   
        }

    }}});            
      return result
    }

    length() {
      let totalSize=0;
      this.buckets.forEach((el)=>{
        if (el!==null) {
        totalSize+=el.size()
        }
      })
      return totalSize
    }

    clear() {
      this.capacity=16;
      this.buckets.fill(null);
      this.size=0;
    }

    keys() {
      let result = []
      this.buckets.forEach((el)=>{
        if (el!==null) {
          for (let i=0; i<el.size();i++) {
            result.push(el.at(i).value[0])
          }
        }
      })
      return result
    }


    values() {
      let result = []
      this.buckets.forEach((el)=>{
        if (el!==null) {
          for (let i=0; i<el.size();i++) {
            result.push(el.at(i).value[1])
          }
        }
      })
      return result
    }


    entries() {
      let result = []
      this.buckets.forEach((el)=>{
        if (el!==null) {
          for (let i=0; i<el.size();i++) {
            let thisPair = []
            thisPair.push(el.at(i).value[0]);
            thisPair.push(el.at(i).value[1]);
            result.push(thisPair)            
          }
        }
      })
      return result
    }

}

export default HashMap