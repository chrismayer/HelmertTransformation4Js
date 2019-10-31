
class HelmertTransformation {
  constructor (y0, x0, o, a) {
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
   * Transform point from origin to destination
   * as defined in the transformation parameters.
   * For example from local grid to national grid.
   *
   * @param  {Number} x     A X-coordinate in your destination system
   * @param  {Number} y     A Y-coordinate in your destination system
   * @param  {Boolean} round `true` if only 3 decimals should be used, default=false
   * @return {Object}       Plain JS-object representing the transformed point
   */
  doTransformation (x, y, round) {
    const xIn = x;
    const yIn = y;

    if (typeof round === "undefined" || round === null) {
      round = false;
    }

    y = this.y0 + this.o * xIn + this.a * yIn;
    x = this.x0 + this.a * xIn - this.o * yIn;

    if (round) {
      y = parseFloat(y.toFixed(3));
      x = parseFloat(x.toFixed(3));
    }

    return {
      x: x,
      y: y
    };
  }

  /**
   * Calculate transformation from destination to origin
   * as defined in the transformation parameters.
   * For example from national grid to local grid.
   *
   * @param  {Number} x     A X-coordinate in your destination system
   * @param  {Number} y     A Y-coordinate in your destination system
   * @param  {Boolean} round `true` if only 3 decimals should be used, default=false
   * @return {Object}       Plain JS-object representing the transformed point
   */
  doReverseTransformation (x, y, round) {
    if (typeof round === "undefined" || round === null) {
      round = false;
    }

    const aT = this.a / (Math.pow(this.a, 2) + Math.pow(this.o, 2));
    const oT = this.o / (Math.pow(this.a, 2) + Math.pow(this.o, 2));
    const y0Rev = -this.x0 * oT + this.y0 * aT;
    const x0Rev = this.x0 * aT + this.y0 * oT;
    const xIn = x;
    const yIn = y;

    y = -y0Rev + aT * yIn - oT * xIn;
    x = -x0Rev + aT * xIn + oT * yIn;

    if (round) {
      y = parseFloat(y.toFixed(3));
      x = parseFloat(x.toFixed(3));
    }

    return {
      x: y,
      y: x
    };
  }
}

if (typeof module !== 'undefined') {
  module.exports = HelmertTransformation;
}
