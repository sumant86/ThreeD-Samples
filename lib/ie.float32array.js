/**
 * @author Joshua Farray / http://farray.net/
 */
if (Float32Array === undefined) {
    function Float32Array(params) {
        var internalArray,
                protoName = Object.prototype.toString.call(params);

        if (/\[object (Float32)?Array\]/.test(protoName)) {
            internalArray = params;
        } else if (protoName === '[object Number]') {
            internalArray = Array(params);
            for (var i = 0; i < params; i++) {
                internalArray[i] = 0.0;
            }
        } else {
            throw 'Float32ArrayError:  Invalid constructor.';
        }

        internalArray.set = function(source) {
            if (source.length > internalArray.length) {
                throw 'Float32ArrayError:  Source is too large.';
            }

            for (var i = 0; i < source.length; i++) {
                internalArray[i] = source[i];
            }
        };

        internalArray.get = function() {
            return internalArray;
        };

        internalArray.subarray = function(lower, upper) {
            if (upper === undefined || upper > internalArray.length) {
                upper = internalArray.length;
            }
            var returnArray = Array(upper - lower),
                    i = 0;

            for (lower; lower < upper; lower++) {
                returnArray[i++] = internalArray[lower];
            }
            return returnArray;
        };

        return internalArray;
    }
    ;
}