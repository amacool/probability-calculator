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

const exportTable = (data) => {
  console.log(data);
  let str = data.map(item => item.join('\t')).join('\n');
  console.log(str);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(str);
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
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
  exportTable
};
