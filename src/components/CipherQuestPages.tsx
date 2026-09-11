export function isCipherQuestPath() {
  const pathname = window.location.pathname.replace(/\/$/, '');
  return [
    '/posterchild',
    '/eastofjava',
    '/luwak',
    '/maude',
    '/mayqueen',
    '/underpressure',
  ].includes(pathname);
}

function writeRawPage(html: string) {
  document.open();
  document.write(html);
  document.close();
}

function renderPosterchild() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>posterchild</title></head>' +
    '<body>' +
    '<!-- child support ended here -->' +
    '<!-- 1969 had confidence -->' +
    '<img src="https://file.garden/aqFpFUAG_0sBTo_p/itlies.jpg" />' +
    '<br />' +
    'not the child.' +
    '<br />' +
    'the poster lied.' +
    '</body>' +
    '</html>'
  );
}

function renderEastOfJava() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>eastofjava</title></head>' +
    '<body>' +
    '<!-- the map is gaslighting you -->' +
    '<!-- language people will overthink this -->' +
    '<!-- coffee people will not -->' +
    '<img src="https://file.garden/aqFpFUAG_0sBTo_p/eeee.jpg" />' +
    '<br />' +
    'EAST OF JAVA' +
    '<br /><br />' +
    'ok but what if it wasn\'t.' +
    '<br /><br />' +
    'one direction was enough.' +
    '</body>' +
    '</html>'
  );
}

function renderLuwak() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>luwak</title></head>' +
    '<body>' +
    '<!-- civet was framed -->' +
    '<!-- ask the loud box what the cat became -->' +
    '<!-- meow meow capitalism -->' +
    'LUWAK' +
    '<br /><br />' +
    'expensive animal water.' +
    '<br /><br />' +
    'the cat changed names before the old film kept singing.' +
    '</body>' +
    '</html>'
  );
}

function renderMaude() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>maude</title></head>' +
    '<body>' +
    '<!-- harold did not stay on land -->' +
    '<!-- captain bait is still bait -->' +
    '<!-- covers are not originals -->' +
    '<!-- token A is the original, uppercase -->' +
    'MAUDE' +
    '<br /><br />' +
    'wrong half.' +
    '<br /><br />' +
    'the boy went swimming with a captain.' +
    '<br /><br />' +
    'not the captain.' +
    '<br />' +
    'not the original.' +
    '</body>' +
    '</html>'
  );
}

function renderMayQueen() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>mayqueen</title></head>' +
    '<body>' +
    '<!-- may is acting like a title now -->' +
    '<!-- flowers are not always romantic -->' +
    '<!-- token B is the band, uppercase -->' +
    '<img src="https://file.garden/aqFpFUAG_0sBTo_p/dreamgoth.webp" />' +
    '<br />' +
    'MAY QUEEN' +
    '<br /><br />' +
    'not a wedding.' +
    '<br />' +
    'not a filter.' +
    '<br />' +
    'wrong festival.' +
    '<br /><br />' +
    'the crown became louder than the season.' +
    '</body>' +
    '</html>'
  );
}

function renderUnderPressure() {
  writeRawPage(
    '<!DOCTYPE html>' +
    '<html>' +
    '<head><title>underpressure</title></head>' +
    '<body>' +
    '<!-- two tokens opened the room -->' +
    '<!-- sample the pressure, don\'t worship it -->' +
    '<!-- final is the artist, lowercase, no space -->' +
    'UNDER PRESSURE' +
    '<br /><br />' +
    'not them.' +
    '<br />' +
    'not the pressure.' +
    '<br /><br />' +
    'too cold.' +
    '<br />' +
    'too babyish.' +
    '<br /><br />' +
    'who made the borrowed pressure famous?' +
    '</body>' +
    '</html>'
  );
}

export function CipherQuestPage() {
  const pathname = window.location.pathname.replace(/\/$/, '');

  switch (pathname) {
    case '/posterchild':
      renderPosterchild();
      break;
    case '/eastofjava':
      renderEastOfJava();
      break;
    case '/luwak':
      renderLuwak();
      break;
    case '/maude':
      renderMaude();
      break;
    case '/mayqueen':
      renderMayQueen();
      break;
    case '/underpressure':
      renderUnderPressure();
      break;
  }

  // Return null — document.write already took over the entire page
  return null;
}