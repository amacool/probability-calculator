//For SUPRQ we go through the options and find the positons of each option because the question might not always bee in the correct order. Also you need to make sure that you have the nps score for this question so you can correctly calculate it


//Calculations and functiosn are based on 1st getting an average for all 8 items and then averages for subitems as shown below.

//Global Calcs THAT ADMIN UPDATES

//MEANS
var suprq_GloballnMean=  0.03922;
var usability_GloballnMean= -0.04253;
var trust_GloballnMean= -0.10909;
var loyalty_GloballnMean= 0.13932;
var appear_GloballnMean= 0.09327;
var nps_GloballnMean= -0.0030;

//SDs
var suprq_GloballnSD=  0.279325899;
var usability_GloballnSD= 	0.29906667;
var trust_GloballnSD= 0.322811031;
var loyalty_GloballnSD= 0.410510425;
var appear_GloballnSD= 0.267100878;
var nps_GloballnSD= 0.295020156;



//Max Scores (These don't change)
var suprqmax = 5;
var usabilitymax = 5;
var trustmax = 5;
var loyaltymax = 5;
var appearancemax = 5;
var npsmax =10;

//MIN SCORES
var suprqmin = 1;
var usabilitymin = 1;
var trustmin = 1;
var loyaltymin = 1;
var appearancemin = 1;
var npsmax =1;

///END GLOBAL VALS THAT ADMIN UPDATES


//Confidence Level Set in Drop Down
var confidence = .90;
var alpha = 1-confidence;
var z =  zinv(alpha/2);



///SAMPLE DATA

var q1 = [5, 4, 4, 5, 5, 4, 4, 4, 4, 4, 5, 4, 4, 4]; //This website is easy to use
var q2 = [4, 4, 4, 4, 5, 4, 5, 4, 3, 4, 5, 4, 4, 4]; //It is easy to navigate within the website.

var q3 = [5, 3, 5, 5, 4, 4, 3, 4, 4, 4, 5, 4, 4, 4]; //The information on this website is trustworthy.
var q4 = [4, 3, 5, 3, 4, 3, 4, 4, 4, 4, 5, 4, 4, 4]; //The information on this website is credible.

var q5 = [8, 6, 6, 10, 8, 9, 8, 3, 3, 6, 10, 9, 5, 9];//How likely are you to recommend this website to a friend or colleague?
var q6 = [5, 4, 4, 5, 5, 4, 4, 2, 2, 3, 5, 5, 5, 4]; //I will likely visit this website in the future.

var q7 = [4, 4, 3, 3, 5, 5, 4, 3, 3, 4, 5, 4, 4, 4];  //I find the website to be attractive.
var q8 = [4, 4, 5, 4, 5, 3, 5, 4, 3, 4, 5, 5, 4, 4];  //The website has a clean and simple presentation.




var suprq = new Array ;
var usability = new Array ;
var trust = new Array ;
var loyalty = new Array ;
var appearance = new Array ;


for (var i = 0; i <= 5000; i++) { //MAKE THIS THE MAX LENGTH INSTEAD OF FOR LOOP, SOME VALUES MAY BE MISSING
  //usability
  if (!isNaN(q1[i]) && !isNaN(q2[i]) ) {
    usability[i] = (q1[i]+q2[i] )/2;

  }
  //trust
  if (!isNaN(q3[i]) && !isNaN(q4[i]) ) {
    trust[i] = (q3[i]+q4[i] )/2;
  }
  //appearance
  if (!isNaN(q7[i]) && !isNaN(q8[i]) ) {
    appearance[i] = (q7[i]+q8[i] )/2;
  }
  //loyalty
  if (!isNaN(q5[i]) && !isNaN(q6[i]) ) {
    loyalty[i] = (q6[i]+q5[i]/2 )/2;
  }
  //suprq
  if (!isNaN(q1[i]) && !isNaN(q2[i]) && !isNaN(q3[i]) && !isNaN(q4[i]) && !isNaN(q5[i]) && !isNaN(q6[i]) && !isNaN(q7[i]) && !isNaN(q8[i]) ) {
    suprq[i] = (q1[i]+q2[i]+q3[i]+q4[i]+q5[i]/2+q6[i]+q7[i]+q8[i] )/8;
  }
}





//MEAN FUNCTION
let getMean = function (data) {
  return data.reduce(function (a, b) {
    return Number(a) + Number(b);
  }) / data.length;
};

//SD FUNCTION

let getSD = function (data) {
  let m = getMean(data);
  return Math.sqrt(data.reduce(function (sq, n) {
    return sq + Math.pow(n - m, 2);
  }, 0) / (data.length - 1));
};

//MEANS AND SD AND N
var usabilityMean =  getMean(usability);
var trustMean = getMean(trust);
var loyaltyMean =  getMean(loyalty);
var appearanceMean =  getMean(appearance);
var suprqMean =  getMean(suprq);

var usabilitySD =  getSD(usability);
var trustSD = getSD(trust);
var loyaltySD =  getSD(loyalty);
var appearanceSD =  getSD(appearance);
var suprqSD =  getSD(suprq);

//N
var usabilityN =  usability.length;
var trustN = trust.length;
var loyaltyN =  loyalty.length;
var appearanceN =  appearance.length;
var suprqN =  suprq.length;



var studyMeanRefsuprq = Math.log(suprqmax-suprqMean);
var studyMeanRefusability = Math.log(usabilitymax-usabilityMean);
var studyMeanReftrust = Math.log(trustmax-trustMean);
var studyMeanRefloyalty = Math.log(loyaltymax-loyaltyMean);
var studyMeanRefappearance = Math.log(appearancemax-appearanceMean);

//ROW 18 in EXCEL CAL zReflect
var zRefsuprq = (studyMeanRefsuprq-suprq_GloballnMean)/suprq_GloballnSD;
var zRefusability = (studyMeanRefusability-usability_GloballnMean)/usability_GloballnSD;
var zReftrust = (studyMeanReftrust-trust_GloballnMean)/trust_GloballnSD;
var zRefappearance = (studyMeanRefappearance-appear_GloballnMean)/appear_GloballnSD;
var zRefloyalty = (studyMeanRefloyalty-loyalty_GloballnMean)/loyalty_GloballnSD;


//ROW 20 in EXCEL CAL %zReflect
var perRefsuprq = oneTailFromScore(zRefsuprq);
var perRefusability = oneTailFromScore(zRefusability);
var perReftrust = oneTailFromScore(zReftrust);
var perRefappearance = oneTailFromScore(zRefappearance);
var perRefloyalty = oneTailFromScore(zRefloyalty);

//SE ROW 22 Need the Sample Size and SD for EAch Value
var SEsuprq = suprqSD/Math.sqrt(suprq.length);
var SEusability = usabilitySD/Math.sqrt(usability.length);
var SEtrust = trustSD/Math.sqrt(trust.length);
var SEapperance = appearanceSD/Math.sqrt(appearance.length);
var SEloyalty = loyaltySD/Math.sqrt(loyalty.length);

//t values Row 23 in EXCEL
var tsuprq = TScore(alpha/2, suprqN-1);
var tusability = TScore(alpha/2, usabilityN-1);
var ttrust= TScore(alpha/2, trustN-1);
var tappearance = TScore(alpha/2, appearanceN-1);
var tloyalty = TScore(alpha/2, loyaltyN-1);


//Margin values Row 24 in Excel
var Marginsuprq = SEsuprq*tsuprq;
var Marginusability = SEusability*tusability;
var Margintrust= SEtrust*ttrust;
var Marginappearance = SEapperance*tappearance;
var Marginloyalty = SEloyalty*tloyalty;

//LOW and HIgh ROWS 25 and 26 in EXCEL

var suprqLow = checklow( ( suprqMean - Marginsuprq), suprqmin);
var usabilityLow = checklow( ( usabilityMean - Marginusability), usabilitymin);
var trustLow = checklow( ( trustMean - Margintrust), trustmin);
var appearanceLow = checklow( ( appearanceMean - Marginappearance), appearancemin);
var loyaltyLow = checklow( ( loyaltyMean - Marginloyalty), loyaltymin);

//HIGHS
var suprqHigh = checkhigh( ( suprqMean + Marginsuprq), suprqmax);
var usabilityHigh = checkhigh( ( usabilityMean + Marginusability), usabilitymax);
var trustHigh = checkhigh( ( trustMean + Margintrust), trustmax);
var appearanceHigh = checkhigh( ( appearanceMean + Marginappearance), appearancemax);
var loyaltyHigh = checkhigh( ( loyaltyMean + Marginloyalty), loyaltymax);


//Low Ln Reflect Line 28 in EXCEl
var lowLNsuprq = Math.log(suprqmax - suprqLow);
var lowLNusability = Math.log(usabilitymax - usabilityLow);
var lowLNtrust = Math.log(trustmax - trustLow);
var lowLNappearance = Math.log(appearancemax - appearanceLow);
var lowLNloyalty = Math.log(loyaltymax - loyaltyLow);


//ROW 30 in EXCEL CAL zReflect
var zRefsuprqLow = (lowLNsuprq-suprq_GloballnMean)/suprq_GloballnSD;
var zRefusabilityLow = (lowLNusability-usability_GloballnMean)/usability_GloballnSD;
var zReftrustLow = (lowLNtrust-trust_GloballnMean)/trust_GloballnSD;
var zRefappearanceLow = (lowLNappearance-appear_GloballnMean)/appear_GloballnSD;
var zRefloyaltyLow = (lowLNloyalty-loyalty_GloballnMean)/loyalty_GloballnSD;


//ROW 31 in EXCEL CALC
var perRefsuprqLow = oneTailFromScore(zRefsuprqLow);
var perRefusabilityLow = oneTailFromScore(zRefusabilityLow);
var perReftrustLow = oneTailFromScore(zReftrustLow);
var perRefappearanceLow = oneTailFromScore(zRefappearanceLow);
var perRefloyaltyLow = oneTailFromScore(zRefloyaltyLow);


//ROW 33 in EXCEL CAL zReflect
var highLNsuprq = Math.log(suprqmax-suprqHigh);
var highLNusability = Math.log(usabilitymax-usabilityHigh);
var highLNtrust = Math.log(trustmax-trustHigh);
var highLNappearance = Math.log(appearancemax-appearanceHigh);
var highLNloyalty = Math.log(loyaltymax-loyaltyHigh);


var zRefsuprqHigh = (highLNsuprq-suprq_GloballnMean)/suprq_GloballnSD;
var zRefusabilityHigh = (highLNusability-usability_GloballnMean)/usability_GloballnSD;
var zReftrustHigh = (highLNtrust-trust_GloballnMean)/trust_GloballnSD;
var zRefappearanceHigh = (highLNappearance-appear_GloballnMean)/appear_GloballnSD;
var zRefloyaltyHigh = (highLNloyalty-loyalty_GloballnMean)/loyalty_GloballnSD;


//ROW 34 in EXCEL CALC
var perRefsuprqHigh = oneTailFromScore(zRefsuprqHigh);
var perRefusabilityHigh = oneTailFromScore(zRefusabilityHigh);
var perReftrustHigh = oneTailFromScore(zReftrustHigh);
var perRefappearanceHigh = oneTailFromScore(zRefappearanceHigh);
var perRefloyaltyHigh = oneTailFromScore(zRefloyaltyHigh);


//NPS CALC
var numNPS = q5.length;
var promoters = npsgroups (q5, 'p');
var passives = npsgroups (q5, 'v');
var detractors = npsgroups (q5, 'd');
var netpromoters = promoters-detractors;
var netpromoterscore = netpromoters/numNPS;
var p_promoter = promoters/numNPS;
var p_detractor = detractors/numNPS;


//ADDED 11/2
//Example confidence intervals around quetsion items


//Make this a simple function to return low and high

var mean_q1 = getMean(q1);
var sd_q1 = getSD(q1);
var n_q1 = q1.length;
var tq1 = TScore(alpha/2, n_q1-1);
var seq1 = sd_q1/Math.sqrt(n_q1);
var marginq1= seq1*tq1;
var lowq1 = mean_q1-marginq1;
var highq1 = mean_q1+marginq1;


//SUS Equivelent Score
var sus_equivelent = -2.279 + 19.2048 * getMean(q1); //means of q1 which is the ease item





/* UNCOMMENT TO SEE ALL VALUES FOR TESTING

 document.getElementById('v1').innerHTML = 	"SUPR-Q: " + suprqMean + 'SD ' + suprqSD  + ' Study Mean Ref : ' + studyMeanRefsuprq + 'zRefl: ' + zRefsuprq + '%Reflect' + perRefsuprq + 'SE: ' + SEsuprq  + 't Value: ' + tsuprq + "SUPRQ N" + suprqN + "Margin" + Marginsuprq + "Low: " + suprqLow + "High: " + suprqHigh
 + 'LowLN' + lowLNsuprq + 'Zlow' + zRefsuprqLow + 'Zlow%' + perRefsuprqLow + 'Zhigh %' + perRefsuprqHigh;
 document.getElementById('v1').innerHTML += "<br> Usability: " + usabilityMean + 'SD ' + usabilitySD + ' Study Mean Ref : ' + studyMeanRefusability + 'zRefl: ' + zRefusability+ '%Reflect' + perRefusability + 'SE: ' + SEusability + tsuprq + "SUPRQ N" + suprqN + "Margin" + Marginusability + "Low: " + usabilityLow+ "High: " + usabilityHigh + 'LowLN' + lowLNusability + 'Zlow' + zRefusabilityLow + 'Zlow%' + perRefusabilityLow + 'Zhigh %' + perRefusabilityHigh;
 document.getElementById('v1').innerHTML += "<br> Trust: " + trustMean + 'SD ' + trustSD + ' Study Mean Ref : ' + studyMeanReftrust + 'zRefl: ' + zReftrust+ '%Reflect' + perReftrust+ 'SE: ' + SEtrust+ tsuprq + "SUPRQ N" + suprqN + "Margin" + Margintrust + "Low: " + trustLow + "High: " + trustHigh + 'LowLN' + lowLNtrust + 'Zlow' + zReftrustLow + 'Zlow%' + perReftrustLow + 'Zhigh %' + perReftrustHigh;
  document.getElementById('v1').innerHTML += "<br> Appearance: " + appearanceMean + 'SD ' + trustSD + ' Study Mean Ref : ' + studyMeanRefappearance + 'zRefl: ' + zRefappearance+ '%Reflect' + perRefappearance + 'SE: ' + SEapperance+ tsuprq + "SUPRQ N" + suprqN+ "Margin" + Marginappearance+ "Low: " + appearanceLow + "High: " + appearanceHigh + 'LowLN' + lowLNappearance + 'Zlow' + zRefappearanceLow + 'Zlow%' + perRefappearanceLow + 'Zhigh %' + perRefappearanceHigh;
  document.getElementById('v1').innerHTML += "<br> Loyalty: " + loyaltyMean + 'SD ' + loyaltySD + ' Study Mean Ref : ' + studyMeanRefloyalty+ 'zRefl: ' + zRefloyalty + '%Reflect' + perRefloyalty+ 'SE: ' + SEloyalty + tsuprq + "SUPRQ N" + suprqN + "Margin" + Marginloyalty + "Low: " + loyaltyLow + "High: " + loyaltyHigh + 'LowLN' + lowLNloyalty + 'Zlow' + zRefloyaltyLow + 'Zlow%' + perRefloyaltyLow + 'Zhigh %' + perRefloyaltyHigh;

 */

//Add 1/3 of a squared z-square to each category
//SEE Rocks 2016 Interval Estimation for the Net Promoter Score
//CALCULATIONS STARTING ON ROW 42
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
var nps_low = adj_p_netpromoters - adj_npsMargin;
var nps_high = adj_p_netpromoters + adj_npsMargin;



//DISPLAYS SHOULD MATCH CALC EXCEPT NPS WHICH WILL DIFFER SLIGHTLY
document.getElementById('v2').innerHTML = "<h3>SUPR-Q: Mean : " + (perRefsuprq*100).toFixed(2)  + "%"  +  " Low : " + (perRefsuprqLow*100).toFixed(2) + "%"  + " High: "  + (perRefsuprqHigh*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>Usability: Mean : " + (perRefusability*100).toFixed(2)  + "%"  +  " Low : " + (perRefusabilityLow*100).toFixed(2) + "%"  + " High: "  + (perRefusabilityHigh*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>Trust Mean: " + (perReftrust*100).toFixed(2)  + "%"  +  " Low : " + (perReftrustLow*100).toFixed(2) + "%"  + " High: "  + (perReftrustHigh*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>Loyalty Mean: " + (perRefloyalty*100).toFixed(2)  + "%"  +  " Low : " + (perRefloyaltyLow*100).toFixed(2) + "%"  + " High: "  + (perRefloyaltyHigh*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>Appearance Mean: " + (perRefappearance*100).toFixed(2)  + "%"  +  " Low : " + (perRefappearanceLow*100).toFixed(2) + "%"  + " High: "  + (perRefappearanceHigh*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>NPS: " + (netpromoterscore*100).toFixed(2)  + "%"  +  " Low : " + (nps_low*100).toFixed(2) + "%"  + " High: "  + (nps_high*100).toFixed(2) + '%' + "</h3>";
document.getElementById('v2').innerHTML += "<h3>Mean Item 1: " + mean_q1.toFixed(2) +  " Low : " + lowq1.toFixed(2) + " High: "  + highq1.toFixed(2) + "</h3>";

//document.getElementById('v2').innerHTML += "promoters" + promoters + "detractors" + detractors + "NPS NUM " + numNPS + "Adj NPS " + adj_p_netpromoters + " Adj NPS Margin " + adj_npsMargin;
// document.getElementById('v2').innerHTML += "<h3>SUPR-Q: Mean : " + perRefsuprq + "</h3>";

/*
var mean_q1 = getMean(data);
var sd_q1 = getMean(data);
var n_q1 = q1.length;
var tq1 = TScore(alpha/2, n_q1-1);
var seq1 = sd_q1/Math.sqrt(n_q1);
var marginq1= seq1*tq1;
var lowq1 = marginq1-mean_q1;
var highq1 = marginq1+mean_q1;
*/

//adding 3/4 to the counts of both Promoters and Detractors and 3/2 to the count of Passives, before construction of a Wald interval.
//Variance for the NPS = p_promoters +  p_detractors - (p_promoters - p_detractors) ^2






function npsgroups (vals, type) {
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

}

function checklow(passedvalue, minval) {
//MAKES SURE CONF INTERVALS ARE WITHIN SCALE RANGE LOW
  if (passedvalue < minval) return minval
  else return passedvalue;

}

function checkhigh(passedvalue, maxval) {
//MAKES SURE CONF INTERVALS ARE WITHIN SCALE RANGE HIGH
  if (passedvalue > maxval) return maxval
  else return passedvalue;

}



//KATIE AND LANDON TO REVIEW THESE TO SEE IF THEY HAVE BETTER ONES

//ANOTHER MEAN FUNCTION YOU CAN USE
function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}


function TScore(alpha,nu)  {
  //echo "$alpha $nu Key : $i<br />";
  //Scores of the Student t distribution
  //Function TScore(alpha,nu) estimates t_alpha from
  //P(T>t_alpha) = alpha < 1, where T ~ Student t (nu = degrees of freedom)
  //Reference: Abramowitz & Stegun
  //Ported to PHP by Jeff Sauro July-2007
  var z = zinv(alpha);

  if (nu > 10000) {
    var t_alpha = z;
  } else {
    var g1 = (Math.pow(z,3)+z)/4;
    // echo "g1 $g1<br>";
    var g2 = (5*Math.pow(z,5)+16*Math.pow(z,3)+3*z)/96;
    var g3 = (3*Math.pow(z,7)+19*Math.pow(z,5)+17*Math.pow(z,3)-15*z)/384;
    var g4 = (79*Math.pow(z,9)+776*Math.pow(z,7)+1482*Math.pow(z,5)-1920*Math.pow(z,3)-945*z)/92160;
    //var t_alpha = Math.round((z+g1/nu+g2/(nu*nu)+g3/Math.pow(nu,3)+g4/Math.pow(nu,4))*100, 4)/100;  //this was old one, rounded to 2 digits, Katie needs to check new one
    var t_alpha =  (z+g1/nu+g2/(nu*nu)+g3/Math.pow(nu,3)+g4/Math.pow(nu,4) );
  }
  return(t_alpha);
}

function zinv(alphaN)   {
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
  d = new Array ;
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
}






//We will work from what you need, SUPR-Q % Score of 80% shown in Cell E6
//Points to AC20
//AC20 is 1 -AC19

//AC19 needs the function convertValueToPercent (


//NORMSDIST FUNCTION   Row 19, called %Reflect in Excel calc



//Expects a z score from -10 to positibe 10 and returns a percenatage


//t function



//NORMSINV function, expects a percentaged from .000001 to .99999 and converts to a z from -10 to 10


function convertValueToPercent (value, maxValue, globalMean, globalStd){
  //calculate the zscore from the raw responses and our globalMean and gloabStd (which are special for this value):
  var zscore = (Math.log(maxValue - value) - globalMean) / globalStd;
  return st.z.oneTailFromScore(zscore);
}
/**
 Converts a z-score into a percentile for the area of one tail. Equivalent to
 Excel's 1-NORMSDIST function.
 @method oneTailFromScore
 @param {Number} score The z-score you're converting
 @return Number
 */

function oneTailFromScore (score) {
  var z = Math.abs(score);
  var l1 = 0.0000488906 + z * 0.0000053830;
  var l2 = 0.0000380036 + z * l1;
  var l3 = 0.0032776263 + z * l2;
  var l4 = 0.0211410061 + z * l3;
  var l5 = 0.0498673470 + z * l4;

  var base = 1 + (z * l5);
  var exp = -16;

  var result = 1 - Math.pow(base, exp) / 2;

  if (score < 0) result = 1 - result;

  return 1 - result;
}



function adjWald (x, n, alpha) {
  x     = Number(x);
  n     = Number(n);
  var z = st.z.scoreFromAlpha(alpha, 2);

  var p    = x/n;
  var adjX = x + (Math.pow(z, 2) / 2);
  var adjN = n + Math.pow(z, 2);
  var adjP = adjX / adjN;

  var margin = Math.sqrt( (adjP * (1 - adjP)) / adjN ) * z;

  var low  = st.lowBound(adjP - margin, 0);
  var high = st.highBound(adjP + margin, 1);

  return [low, high];
}

function tCont (mean, sd, n, alpha) {
  // n -1 degrees of freedom
  // two tailed alpha
  var tScore = scoreFromAlpha(n - 1, alpha, 2);
  var diff = tScore * st.stdErr(sd, n);

  var low = mean - diff;
  var high = mean + diff;
  return [low, high];
}

//CANT GET THIS TO WORK, I THINK HAS FRAMWORK
function scoreFromAlpha (df, alpha, tails) {
  // convert a two-tailed alpha to a single tail
  if (Number(tails) == 2) {
    alpha = alpha/2;
  }

  var z = scoreFromAlpha(alpha); // THIS BREAKS ON MY JS, SAYS TOO MUCH recursion, I think must be using different libraries?

  // t distribution matches z distribution at large df
  if (df > 10000) {
    return z;
  }

  var g1 = Math.pow(z, 3) + z;
  g1 = g1/4;

  var g2 = (5 * Math.pow(z, 5)) +
    (16 * Math.pow(z, 3)) +
    (3 * z);
  g2 = g2/96;

  var g3 = (3 * Math.pow(z, 7)) +
    (19 * Math.pow(z, 5)) +
    (17 * Math.pow(z, 3)) -
    (15 * z);
  g3 = g3/384;

  var g4 = (79 * Math.pow(z, 9)) +
    (776 * Math.pow(z, 7)) +
    (1482 * Math.pow(z, 5)) -
    (1920 * Math.pow(z, 3)) -
    (945 * z);
  g4 = g4/92160;

  var t = z +
    (g1/df) +
    (g2/Math.pow(df, 2)) +
    (g3/Math.pow(df, 3)) +
    (g4/Math.pow(df, 4));

  return t;
}

/**
 Converts a t-score into the equivalent two-tailed area under the t-distribution curve
 @method .t.twoTailsFromScore
 @param {Number} score the t-score to convert
 @param {Number} df The degrees of freedom
 */
function twoTailsFromScore (score, df) {
  score = Math.abs(score);

  if (df === 0) throw new Error('df can never be 0');

  var ACONST = 0.36338023,
    w = Math.atan(score / Math.sqrt(df)),
    sinW = Math.sin(w),
    cosW = Math.cos(w),
    t1, t2, j1, j2, k2;

  // short circuit in special cases
  if (df == 2) return (1 - (0.5 * (1 + sinW))) * 2;
  if (df == 1) return (1 - (0.5 * (1 + (w * (1 - ACONST))))) * 2;
  if (df == 3) return (1 - (0.5 * (1 + ((w + sinW * cosW) * (1 - ACONST))))) * 2;

  if (df % 2 === 0) {
    t1 = sinW;
    t2 = sinW;
    j1 = -1;
    j2 = 0;
    k2 = (df - 2) / 2;
  }
  else {
    t2 = sinW * cosW;
    t1 = w + t2;
    j1 = 0;
    j2 = 1;
    k2 = (df - 3) / 2;
  }

  for (var i = 1; i <= k2; i++) {
    j1 = j1 + 2;
    j2 = j2 + 2;
    t2 = t2 * cosW * cosW * j1 / j2;
    t1 = t1 + t2;
  }

  return (1 - (0.5 * (1 + (t1 * (1 - ACONST * (df % 2)))))) * 2;
}




function logsd (vals) {
  vals = _.map(vals, function(val) {
    return Math.log(Number(val));
  });
  return st.sd(vals);
}

function se (sd, n) {
  return Number(sd) / Math.sqrt(Number(n));
}







