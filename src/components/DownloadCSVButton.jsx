import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';

function DownloadCSVButton({ csvData }) {
    const convertCSVToExcelAndDownload = (csvData) => {
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const wsname = workbook.SheetNames[0];
            workbook.Sheets[wsname];
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
            saveAs(data, 'archivoConvertido.xlsx');
        };
        reader.readAsBinaryString(blob);
    };

    const handleDownloadExcel = () => {
        convertCSVToExcelAndDownload(csvData);
    };

    return (
        <div className='flex cursor-pointer mt-10 justify-center py-3 bg-[#87eaeeda] hover:bg-[#b4f0f1da] text-black mx-10 rounded-md transition-all duration-150' onClick={handleDownloadExcel}>
            <h1 className='font-semibold text-[20px]'>
                Download CSV as Excel
            </h1>
        </div>
    );
}

export default DownloadCSVButton;

DownloadCSVButton.propTypes = {
    csvData: PropTypes.string.isRequired,
};