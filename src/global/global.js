import gsap from 'gsap';

document.body.style.overflowX = "hidden";


const rosaFiltro = 'invert(18%) sepia(88%) saturate(3736%) hue-rotate(324deg) brightness(91%) contrast(92%)';

const contenedor = document.getElementById('imgDiv');

if (contenedor) {
  Object.assign(contenedor.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    pointerEvents: 'none',
    overflow: 'hidden'
  });

  const img = document.createElement('img');
  img.src = new URL('../assets/img/engranaje/img_bg.png', import.meta.url).href;
  img.alt = 'Engranaje de Innovación';

  img.style.filter = 'invert(18%) sepia(88%) saturate(3736%) hue-rotate(324deg) brightness(91%) contrast(92%)';
  img.style.display = 'block';
  img.style.width = '700px';
  img.style.filter = `${rosaFiltro}`;
  contenedor.appendChild(img);

  gsap.set(img, {
    position: "absolute",
    left: -500,
    top: "50%",
    yPercent: -50,
    force3D: true
  });

  gsap.to(img, {
    left: -420,
    duration: 1.5,
    ease: "power2.out"
  });

  gsap.to(img, {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: "none"
  });
}

