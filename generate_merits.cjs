/**
 * generate_merits.cjs
 * Generates a valid merits.xlsx file using only Node.js built-ins.
 * XLSX is just a ZIP containing XML files.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ---- Minimal ZIP writer ----
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  const table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return t;
  })();
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function writeUint16LE(v) { return Buffer.from([v & 0xFF, (v >> 8) & 0xFF]); }
function writeUint32LE(v) { v = v >>> 0; return Buffer.from([v & 0xFF, (v >> 8) & 0xFF, (v >> 16) & 0xFF, (v >> 24) & 0xFF]); }

function buildZip(files) {
  // files: [{name, data (Buffer)}]
  const localHeaders = [];
  const cdHeaders = [];
  let offset = 0;

  for (const f of files) {
    const nameBytes = Buffer.from(f.name, 'utf8');
    const crc = crc32(f.data);
    const localHeader = Buffer.concat([
      Buffer.from([0x50, 0x4B, 0x03, 0x04]), // local file header sig
      writeUint16LE(20),       // version needed
      writeUint16LE(0),        // general purpose bit flag
      writeUint16LE(0),        // compression: stored
      writeUint16LE(0),        // last mod time
      writeUint16LE(0),        // last mod date
      writeUint32LE(crc),
      writeUint32LE(f.data.length),
      writeUint32LE(f.data.length),
      writeUint16LE(nameBytes.length),
      writeUint16LE(0),        // extra field length
      nameBytes,
      f.data,
    ]);
    cdHeaders.push({ nameBytes, crc, size: f.data.length, offset });
    localHeaders.push(localHeader);
    offset += localHeader.length;
  }

  const cdParts = [];
  for (const cd of cdHeaders) {
    cdParts.push(Buffer.concat([
      Buffer.from([0x50, 0x4B, 0x01, 0x02]), // central dir sig
      writeUint16LE(20),        // version made by
      writeUint16LE(20),        // version needed
      writeUint16LE(0),
      writeUint16LE(0),
      writeUint16LE(0),         // last mod time
      writeUint16LE(0),
      writeUint32LE(cd.crc),
      writeUint32LE(cd.size),
      writeUint32LE(cd.size),
      writeUint16LE(cd.nameBytes.length),
      writeUint16LE(0),
      writeUint16LE(0),
      writeUint16LE(0),
      writeUint16LE(0),
      writeUint32LE(0),
      writeUint32LE(cd.offset),
      cd.nameBytes,
    ]));
  }

  const cdBuf = Buffer.concat(cdParts);
  const eocd = Buffer.concat([
    Buffer.from([0x50, 0x4B, 0x05, 0x06]), // end of central dir
    writeUint16LE(0),
    writeUint16LE(0),
    writeUint16LE(files.length),
    writeUint16LE(files.length),
    writeUint32LE(cdBuf.length),
    writeUint32LE(offset),
    writeUint16LE(0),
  ]);

  return Buffer.concat([...localHeaders, cdBuf, eocd]);
}

// ---- XLSX XML parts ----

const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

const workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Merits" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`;

const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

// Shared strings index:
// 0: merit decides order
// 1: Candidate
// 2: Merit
// 3: U  4: D  5: K  6: S  7: R  8: N  9: I  10: P  11: E  12: P (second P)

const sharedStrings = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="13" uniqueCount="12">
  <si><t>merit decides order</t></si>
  <si><t>Candidate</t></si>
  <si><t>Merit</t></si>
  <si><t>U</t></si>
  <si><t>D</t></si>
  <si><t>K</t></si>
  <si><t>S</t></si>
  <si><t>R</t></si>
  <si><t>N</t></si>
  <si><t>I</t></si>
  <si><t>P</t></si>
  <si><t>E</t></si>
</sst>`;

// Scrambled rows: U/49, D/77, K/35, S/98, R/63, N/42, I/84, P/56, E/70, P/91
// Shared string indices for letters: U=3, D=4, K=5, S=6, R=7, N=8, I=9, P=10, E=11, P=10
const rows = [
  { letter: 3, merit: 49 },  // U
  { letter: 4, merit: 77 },  // D
  { letter: 5, merit: 35 },  // K
  { letter: 6, merit: 98 },  // S
  { letter: 7, merit: 63 },  // R
  { letter: 8, merit: 42 },  // N
  { letter: 9, merit: 84 },  // I
  { letter: 10, merit: 56 }, // P
  { letter: 11, merit: 70 }, // E
  { letter: 10, merit: 91 }, // P
];

let rowXml = '';
rows.forEach((r, i) => {
  const rowNum = i + 4; // data starts at row 4 (row1=title, row2=blank, row3=header)
  rowXml += `  <row r="${rowNum}"><c r="A${rowNum}" t="s"><v>${r.letter}</v></c><c r="B${rowNum}"><v>${r.merit}</v></c></row>\n`;
});

const sheet1 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row r="1"><c r="A1" t="s"><v>0</v></c></row>
    <row r="2"></row>
    <row r="3"><c r="A3" t="s"><v>1</v></c><c r="B3" t="s"><v>2</v></c></row>
${rowXml}  </sheetData>
</worksheet>`;

const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts><font><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
  <borders><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
</styleSheet>`;

// Build ZIP
const files = [
  { name: '[Content_Types].xml',            data: Buffer.from(contentTypes, 'utf8') },
  { name: '_rels/.rels',                    data: Buffer.from(rootRels, 'utf8') },
  { name: 'xl/workbook.xml',               data: Buffer.from(workbookXml, 'utf8') },
  { name: 'xl/_rels/workbook.xml.rels',    data: Buffer.from(workbookRels, 'utf8') },
  { name: 'xl/sharedStrings.xml',          data: Buffer.from(sharedStrings, 'utf8') },
  { name: 'xl/styles.xml',                 data: Buffer.from(styles, 'utf8') },
  { name: 'xl/worksheets/sheet1.xml',      data: Buffer.from(sheet1, 'utf8') },
];

const xlsx = buildZip(files);
const outPath = path.join(__dirname, 'api', 'merits.xlsx');
fs.writeFileSync(outPath, xlsx);
console.log(`Written ${xlsx.length} bytes to ${outPath}`);
