const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const mergePdfs = async (p1,p2,p3,p4,p5) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2
  if(p3) await merger.add(p3); 
  if(p4) await merger.add(p4); 
  if(p5) await merger.add(p5); 

  let x = Math.floor(Math.random()*10000000);
  await merger.save(`public/${x}.pdf`)
  await merger.saveAsBuffer();
  return x;
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};

module.exports = {mergePdfs}
