import htmlToImage from "html-to-image";

const getFormatedRawData = (data, start) => {
  return data.map((item, index) => ({
    id: start + index,
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

const getReorderedData = (rawData, oldOrder, newOrder) => {
  return rawData.map((row) => {
    return row.map((item, index) => row[oldOrder.indexOf(newOrder[index])]);
  });
};

const getSortedData = (rawData, orders) => {
  return rawData.map((row) => {
    let newRow = [];
    orders.forEach((order, index) => {
      newRow[order] = row[index];
    });
    return newRow;
  });
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

const downloadAsPng = (target, name) => {
  htmlToImage.toPng(document.getElementById(target))
    .then(function (dataUrl) {
      let link = document.createElement('a');
      link.download = name;
      link.href = dataUrl;
      link.click();
    });
};

export {
  getFormatedRawData,
  getReorderedData,
  getSortedData,
  getCleanRawData,
  parseRawDataToInt,
  getArrSum,
  getArrAvg,
  getNonBlankArr,
  getNonBlankCount,
  getProFormat,
  downloadAsPng
};
