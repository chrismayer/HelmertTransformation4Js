/**
 * Class representing a 4 parameter Helmert Transformation.
 * Instanciate with the classical geodetic parameters.
 *
 * @param y0
 * @param x0
 * @param o
 * @param a
 *
 * @author Christian Mayer
 *
 * @version 1.0
 *
 * @license BSD see license.txt
 *
 * @Example
 *
 * Example call:
 *
 *    // The parameter of the transformation
 *    var y0 = 200996.148;
 *    var x0 = 1251460.485
 *    var o =  -0.801798904;
 *    var a =  0.597593941;
 *
 *    var helmertTransformation = new HelmertTransformation4Js(y0, x0, o, a);
 *
 *    console.log(helmertTransformation.doTransformation(960, 1000));
 */
function HelmertTransformation4Js(y0, x0, o, a) {

    /**
     * The Y0 translation parameter
     */
    this.y0 = y0;

    /**
     * The X0 translation parameter
     */
    this.x0 = x0;

    /**
     * The 'o' parameter having the scale and rotation
     */
    this.o = o;

    /**
     * The 'a' parameter having the the scale and rotation
     */
    this.a = a;

}

/**
 * Calculate transformation from origin to destination
 * as defined in the parameter.
 *
 * For example from local grid to national grid.
 *
 * @param x a X coordinate in your destination system to be transformed
 * @param y an Y coordinate in your destination system to be transformed
 * @param round 'true' if only 3 decimals should be used, default=false
 *
 * @returns {Object} Plain JS-object representing the transformed point
 */
HelmertTransformation4Js.prototype.doTransformation = function(x, y, round) {

    var xIn = x;
    var yIn = y;

    if (typeof round === "undefined" || round === null) {
        round = false;
    }

    y = this.y0 + this.o * xIn + this.a * yIn;
    x = this.x0 + this.a * xIn - this.o * yIn;

    if (round) {
        y = parseFloat(y.toFixed(3));
        x =  parseFloat(x.toFixed(3));
    }

    return {
        x: x,
        y: y
    };
};

/**
 * Calculate transformation from destination to origin
 * as defined in the parameter.
 *
 * For example from national grid to local grid.
 *
 * @param x a X-coordinate in your destination system to be transformed
 * @param y an Y-coordinate in your destination system to be transformed
 * @param round 'true' if only 3 decimals should be used, default=false
 *
 * @returns {Object} Plain JS-object representing the transformed point
 */
HelmertTransformation4Js.prototype.doReverseTransformation = function(x, y, round) {

    if (typeof round === "undefined" || round === null) {
        round = false;
    }

    var aT = this.a / (Math.pow(this.a, 2) + Math.pow(this.o, 2)),
        oT = this.o / (Math.pow(this.a, 2) + Math.pow(this.o, 2)),
        y0Rev = -this.x0 * oT + this.y0 * aT,
        x0Rev = this.x0 * aT + this.y0 * oT,
        xIn = x,
        yIn = y;

    y = -y0Rev + aT * yIn - oT * xIn;
    x = -x0Rev + aT * xIn + oT * yIn;

    if (round) {
        y = parseFloat(y.toFixed(3));
        x =  parseFloat(x.toFixed(3));
    }

    return {
        x: y,
        y: x
    };

};
