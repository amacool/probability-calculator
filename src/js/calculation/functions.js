import { tinv } from "./ibetainv";
import {globalInMean, globalLnSD} from "./constants";

// Arithmetic mean
const getMean = function (data) {
  return data.reduce(function (a, b) {
    return Number(a) + Number(b);
  }, 0) / data.length;
};

// Standard deviation
const getSD = function (data, num) {
  let m = getMean(data);
  let val = Math.sqrt(data.reduce(function (sq, n) {
    return sq + Math.pow(n - m, 2);
  }, 0) / (data.length - 1));
  return parseFloat(val.toFixed(num));
};

// NORMSDIST
const erf = (x) => {
  //A&S formula 7.1.26
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const xx = Math.abs(x);
  const t = 1 / (1 + p * xx);
  //Direct calculation using formula 7.1.26 is absolutely correct
  //But calculation of nth order polynomial takes O(n^2) operations
  //return 1 - (a1 * t + a2 * t * t + a3 * t * t * t + a4 * t * t * t * t + a5 * t * t * t * t * t) * Math.Exp(-1 * x * x);

  //Horner's method, takes O(n) operations for nth order polynomial
  return 1 - ((((((a5 * t + a4) * t) + a3) * t + a2) * t) + a1) * t * Math.exp(-1 * xx * xx);
};
const getND = (z) => {
  let sign = 1;
  if (z < 0) sign = -1;
  return parseFloat((0.5 * (1.0 + sign * erf(Math.abs(z)/Math.sqrt(2)))).toFixed(9));
};

// 2 tailed TINV
const getTINV = (conf, df) => {
	if(! isNaN(df)) {
	  if (df > 0) {
  		conf = conf + (1 - conf) / 2;
  		var cv = tinv(conf, df);
  		cv = Math.round(cv*1000);
  		cv = cv/1000;
      return cv;
	  }
	}
  return -1;
};

// calc zinv
const zinv = (alphaN) => {
  //Standard normal scores
  //Function SNScore(alpha) approximates z_alpha,
  //where P(Z>z_alpha) = alpha < 1, and Z ~ N(0,1).
  //Reference: Abramowitz & Stegun - modified by G. Urroz, April 2002
  //Ported to PHP by Jeff Sauro July-2007

  if (alphaN == 1) {
 		return 3.00;
  }
  if (alphaN < 0.5) {
     var alpha = alphaN;
  } else {
     var alpha = 1-alphaN;
  }

  var t = Math.sqrt(Math.log(1/(alpha*alpha)));
  var c = new Array ;
  c[0] = 2.515517; c[1] = 0.802853; c[2] = 0.010328;
  var d = new Array ;
  d[0] = 1.432788; d[1] = 0.1898269; d[2] = 0.001308;
  var num = c[0]+(c[1]+c[2]*t)*t;
  var den = 1+(d[0]+(d[1]+d[2]*t)*t)*t;
  //$z_alpha = round(($t - $num/$den)*100)/100;
  var z_alpha = (t - num/den);
  /*
  if ($alphaN < 0.5) {
      return(-$z_alpha);
  } else {
      return($z_alpha);
  }
  */
  return(z_alpha);
};

// calc NPS
const npsgroups = (vals, type) => {
	var nps_count = 0;

	if (type =='p') {
		for (var i = 0; i <= vals.length; i++) {
			if (vals[i] > 8) {
				nps_count++;
			}
		}
	}
	if (type =='d') {
		for (var i = 0; i <= vals.length; i++) {
			if (vals[i] < 7)  {
				nps_count++;
			}
		}
	}
	if (type =='v') {
		for (var i = 0; i <= vals.length; i++) {
			if (vals[i] == 7 || vals[i] == 8 )  {
				nps_count++;
			}
		}
	}

	return nps_count;
};

const calcNPS = (q5, z) => {
  var numNPS = q5.length;
  var promoters = npsgroups (q5, 'p');
  var passives = npsgroups (q5, 'v');
  var detractors = npsgroups (q5, 'd');
  var netpromoters = promoters-detractors;
  var netpromoterscore = netpromoters/numNPS;
  var p_promoter = promoters/numNPS;
  var p_detractor = detractors/numNPS;

  // Add 1/3 of a squared z-square to each category
  // SEE Rocks 2016 Interval Estimation for the Net Promoter Score
  var zthird = Math.pow(z,2)/3;
  var npsvariance = p_promoter +p_detractor - Math.pow( (p_promoter - p_detractor), 2);
  var adj_promoters = promoters+zthird;
  var adj_passives = passives+zthird;
  var adj_detractors = detractors+zthird;
  var adjnumNPS = adj_promoters+adj_passives+adj_detractors;  // This is the same as adding one z-square to N

  var adj_p_promoters = adj_promoters/adjnumNPS;
  var adj_p_passives = adj_passives/adjnumNPS;
  var adj_p_detractors = adj_detractors/adjnumNPS;
  var adj_p_netpromoters = (adj_promoters-adj_detractors)/adjnumNPS;

  var adj_npsvariance = adj_p_promoters + adj_p_detractors - Math.pow( (adj_p_promoters - adj_p_detractors), 2);
  var adj_npsSE = Math.sqrt(adj_npsvariance/adjnumNPS);
  var adj_npsMargin = adj_npsSE*z;
  var npsLow = adj_p_netpromoters - adj_npsMargin;
  var npsHigh = adj_p_netpromoters + adj_npsMargin;
  var npsProLow = getND(npsLow - globalInMean[6]) / globalLnSD[6];
  var npsProHigh = getND(npsHigh - globalInMean[6]) / globalLnSD[6];

  return { npsMean: netpromoterscore, npsLow, npsHigh, npsProLow, npsProHigh };
};

const calcCiForQ = (q, confLevel) => {
  var mean_q = getMean(q);
  var sd_q = getSD(q);
  var n_q = q.length;
  var tq = getTINV(confLevel, n_q-1);
  var seq = sd_q/Math.sqrt(n_q);
  var marginq= seq*tq;
  var lowq = mean_q - marginq;
  var highq = mean_q + marginq;
  return { lowq, highq };
};

export {
  calcNPS,
  calcCiForQ,
  getMean,
  getSD,
  getND,
  getTINV,
  zinv
};
