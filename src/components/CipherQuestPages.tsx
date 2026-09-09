export function PosterchildPage() {
  const html = `<!-- child support ended here -->
<!-- 1969 had confidence -->
<img src="https://file.garden/aqFpFUAG_0sBTo_p/itlies.jpg" />
<br />
not the child.
<br />
the poster lied.`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function EastOfJavaPage() {
  const html = `<!-- the map is gaslighting you -->
<!-- language people will overthink this -->
<!-- coffee people will not -->
<img src="https://file.garden/aqFpFUAG_0sBTo_p/eeee.jpg" />
<br />
EAST OF JAVA
<br />
<br />
ok but what if it wasn't.
<br />
<br />
one direction was enough.`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function LuwakPage() {
  const html = `<!-- civet was framed -->
<!-- ask the loud box what the cat became -->
<!-- meow meow capitalism -->
LUWAK
<br />
<br />
expensive animal water.
<br />
<br />
the cat changed names before the old film kept singing.`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MaudePage() {
  const html = `<!-- harold did not stay on land -->
<!-- captain bait is still bait -->
<!-- covers are not originals -->
<!-- token A is the original, uppercase -->
MAUDE
<br />
<br />
wrong half.
<br />
<br />
the boy went swimming with a captain.
<br />
<br />
not the captain.
<br />
not the original.`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function MayQueenPage() {
  const html = `<!-- may is acting like a title now -->
<!-- flowers are not always romantic -->
<!-- token B is the band, uppercase -->
<img src="https://file.garden/aqFpFUAG_0sBTo_p/dreamgoth.webp" />
<br />
MAY QUEEN
<br />
<br />
not a wedding.
<br />
not a filter.
<br />
wrong festival.
<br />
<br />
the crown became louder than the season.`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function UnderPressurePage() {
  const html = `<!-- two tokens opened the room -->
<!-- sample the pressure, don't worship it -->
<!-- final is the artist, lowercase, no space -->
UNDER PRESSURE
<br />
<br />
not them.
<br />
not the pressure.
<br />
<br />
too cold.
<br />
too babyish.
<br />
<br />
who made the borrowed pressure famous?`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

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

export function CipherQuestPage() {
  const pathname = window.location.pathname.replace(/\/$/, '');

  switch (pathname) {
    case '/posterchild':
      return <PosterchildPage />;
    case '/eastofjava':
      return <EastOfJavaPage />;
    case '/luwak':
      return <LuwakPage />;
    case '/maude':
      return <MaudePage />;
    case '/mayqueen':
      return <MayQueenPage />;
    case '/underpressure':
      return <UnderPressurePage />;
    default:
      return null;
  }
}