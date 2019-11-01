const getFormatedRawData = (data) => {
  return data.map((item, index) => ({
    id: index,
    q1: item[0],
    q2: item[1],
    q3: item[2],
    q4: item[3],
    q5: item[4],
    q6: item[5],
    q7: item[6],
    q8: item[7],
  }))
};

const getCleanRawData = (data) => {
  return data.map((row) => Object.values(row).slice(1));
};

const parseRawDataToInt = (data) => {
  return data.map((row) => row.map((item) => parseInt(item)));
};

const getArrSum = (arr) => {
  return arr.reduce( ( p, c ) => p + c, 0 );
};

const getArrAvg = (arr) => {
  return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
};

const getNonBlankArr = (arr) => {
  return arr.filter((item) => item !== '');
};

const getNonBlankCount = (arr) => {
  return arr.filter((item) => item !== '').length;
};

const getProFormat = (val, num) => {
  return (val*100).toFixed(num) + '%';
};

export {
  getFormatedRawData,
  getCleanRawData,
  parseRawDataToInt,
  getArrSum,
  getArrAvg,
  getNonBlankArr,
  getNonBlankCount,
  getProFormat
};
