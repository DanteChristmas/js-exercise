Array.prototype.asyncMap = function (func, callback) {
  if(this == null) {
    throw new TypeError('this is null')
  }

  if(typeof func !== 'function' || typeof callback !== 'function') {
    throw new TypeError('callbacks must be functions')
  }

  var original = Object(this)

  var length = original.length
  var result = new Array(length)
  var proms = [];

  var i = 0;
  var val;

  while(i < length) {
    val = original[i];
    proms.push(new Promise((resolve, error) => {
      //clone values because scope
      var myVal = val;
      var data = {
        i: i,
        result: null
      }

      //commented lines are for a basic setTimeout async test
      // setTimeout(() => {
        try {
          var res = func.call(original, myVal, data.i)
          data.result = res
        } catch(e) {
          error(e)
        }
        // console.log(data)
        resolve(data);
      // }, Math.floor(Math.random() * 1000) + 200)
    }))
    i++
  }

  Promise.all(proms).then(vals => {
    var pI = 0;
    while(pI < vals.length) {
      result[vals[pI].i] = vals[pI].result
      pI++
    }

    callback.call(original, result)
  })
};
