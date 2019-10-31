const HelmertTransformation = require ('./helmert-trafo.js');

const y0 = 200996.148;
const x0 = 1251460.485
const o =  -0.801798904;
const a =  0.597593941;

const ht = new HelmertTransformation(y0, x0, o, a);

const transformedPt = ht.doTransformation(960, 1000);
console.log('Transformed point:', transformedPt);
const transformedPtRounded = ht.doTransformation(960, 1000, true);
console.log('Transformed point (rounded)', transformedPtRounded);
