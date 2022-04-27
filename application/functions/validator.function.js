
class Validator{

    #promiseList=[];
    #_input;
    #_key;
    #_inputErr;
    constructor(){
        this.errors = {};
    }

    static Rule= async (_callBack) =>{
        const validator = new Validator();
        await  _callBack(validator);
        return validator;
        
    }

    validate = ()=>{
       return Promise.all(this.#promiseList).then((values) => {
            return Object.keys(this.errors).length==0
        });
    }

    input=(_key,_input)=>{
        this.#_input = _input;
        this.#_key = _key;
        this.#_inputErr = [];
        return this;
    }

    isEmpty= (_msg)=>{
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(this.#_input==""){  
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
        return this;
    }
    isDate=async (_msg)=>{
        const isValidDate=(_d)=>{
            let d = new Date(_d);
            return d instanceof Date && !isNaN(d);
        }
        let me = this;
        let obj = new Promise(resolve=>{
            if(this.#_input === undefined){
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            else if(!isValidDate(this.#_input)){  
                this.#_inputErr.push(_msg);
                this.errors[this.#_key] = this.#_inputErr;
            }
            resolve(me);
        });

        this.#promiseList.push(obj);
        return this;
    }

    customFunction=async (_callback)=>{
        //await _callback(this);

        //let me = this;
        let me = this;
        let obj = new Promise(async resolve=>{
            await _callback(me);
            resolve(me);
            
        })
        this.#promiseList.push(obj);
        return this;
    }
    setError=(_msg)=>{
        this.#_inputErr.push(_msg);
        this.errors[this.#_key] = this.#_inputErr;
    }

}


module.exports  = Validator;