export class Utilities {

  static getDiff(a, b){
    let diff = (Utilities.isArray(a) ? [] : {});
    Utilities.recursiveDiff(a, b, diff);
    return diff;
  }

  static recursiveDiff(a, b, node){

    for(let prop in b){
      if(typeof b[prop] == 'undefined'){
        Utilities.addNode(prop, '[[removed]]', node);
      }
      else if(JSON.stringify(a[prop]) != JSON.stringify(b[prop])){
        // if value
        if(typeof b[prop] != 'object' || b[prop] == null){
          Utilities.addNode(prop, b[prop], node);
        }
        else {
          // if array
          if(Utilities.isArray(b[prop])){
            Utilities.addNode(prop, [], node);
            this.recursiveDiff(a[prop], b[prop], node[prop]);
          }
          // if object
          else {
            Utilities.addNode(prop, {}, node);
            this.recursiveDiff(a[prop], b[prop], node[prop]);
          }
        }
      }
    }
  }

  static addNode(prop, value, parent){
    parent[prop] = value;
  }

  static isArray(obj){
    return (Object.prototype.toString.call(obj) === '[object Array]');
  }

  static handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    window.alert(error.error.cause.message + error.error.cause.cause.message);
    return errorMessage;
  }

}
