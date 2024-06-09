import { read, utils } from "xlsx";

const readExcelFirstChartOfEachSheet = async (file) => {
  let finalData = {};
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = (e) => {
    if (!e.target) return;
    const bufferArray = e.target.result;
    const fileInformation = read(bufferArray, {
      type: "buffer",
      cellText: false,
      cellDates: true,
    });
    for (const sheetName of fileInformation.SheetNames) {
      const rawData = fileInformation.Sheets[sheetName];
      finalData[sheetName] = utils.sheet_to_json(rawData)[0];
    }
  };
  return finalData;
};

export { readExcelFirstChartOfEachSheet };
