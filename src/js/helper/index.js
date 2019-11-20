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
  }));
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

const parseRawDataToInt = (data) => {
  return data.map((row) => row.map((item) => parseInt(item)));
};

const parseRawDataToFloat = (data) => {
  return data.map((row) => row.map((item) => parseFloat(item)));
};

const getArrSum = (arr) => {
  return arr.reduce( ( p, c ) => p + c, 0 );
};

const getArrAvg = (arr) => {
  return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
};

const getNonBlankArr = (arr) => {
  return arr.filter((item) => item !== '' && item !== 'NaN' && !isNaN(item));
};

const getNonBlankCount = (arr) => {
  return arr.filter((item) => item !== '' && item !== 'NaN' && !isNaN(item)).length;
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

const downloadAsSvg = (target, name) => {
  function filter (node) {
    return (node.tagName !== 'g');
  }
  htmlToImage.toSvgDataURL(document.getElementById(target), {filter: filter})
    .then(function (dataUrl) {
      console.log(target);
      let link = document.createElement('a');
      link.download = name;
      link.href = dataUrl;
      link.click();
    });
};

const exportTable = (data) => {
  let str = data.map(item => item.join(',')).join('\n');
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(str);
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "table-data.csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const exportJson = (data) => {
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent('export const params=' + JSON.stringify(data));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "calcParams.js");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const isValidDate = (dateString) => {
  // First check for the pattern
  if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    return false;

  // Parse the date parts to integers
  let parts = dateString.split("/");
  let day = parseInt(parts[1], 10);
  let month = parseInt(parts[0], 10);
  let year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

  let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

export {
  getFormatedRawData,
  getReorderedData,
  getSortedData,
  parseRawDataToInt,
  parseRawDataToFloat,
  getArrSum,
  getArrAvg,
  getNonBlankArr,
  getNonBlankCount,
  getProFormat,
  downloadAsPng,
  downloadAsSvg,
  exportTable,
  exportJson,
  isValidDate
};
