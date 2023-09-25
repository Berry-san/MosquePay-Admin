import * as XLSX from 'xlsx'

const saveAsExcelFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // For IE browser
    window.navigator.msSaveBlob(data, fileName)
  } else {
    // For modern browsers
    const anchor = document.createElement('a')
    const url = URL.createObjectURL(data)
    anchor.href = url
    anchor.download = fileName
    anchor.click()
    URL.revokeObjectURL(url)
  }
}

export const exportToExcel = (transactions, name) => {
  const worksheet = XLSX.utils.json_to_sheet(transactions)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  saveAsExcelFile(excelBuffer, `${name}.xlsx`)
}
