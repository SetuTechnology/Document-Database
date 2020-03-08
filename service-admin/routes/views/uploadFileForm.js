module.exports = async (req, res) => {
    return res.end(`
        <h2>Upload xls file</h2>
        <form action="/fileupload" enctype="multipart/form-data" method="post">
            <div>File: <input type="file" name="upload" multiple="multiple" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"" /></div>
            <input type="submit" value="Upload" />
        </form>        
        `);

    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    // res.write('<div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>');
    // res.write('<input type="submit">');
    // res.write('</form>');
    // return res.end();
};
