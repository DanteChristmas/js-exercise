Array.prototype.asyncAsyncMap = function (func, callback) {
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
    proms.push(new Promise(async (resolve, error) => {
      //clone values because scope.
      var myVal = val;
      var data = {
        i: i,
        result: null
      }

      try {
        var res = async (T, V, I) => {
          var stuff = func.call(T, V, I)
          return await stuff
        }

        res(original, myVal, data.i).then(d => {
          data.result = d;
          resolve(data);
        })
      } catch(e) {
        error(e)
      }
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
