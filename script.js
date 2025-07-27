document.addEventListener('DOMContentLoaded', () => {
    const panelRight = document.getElementById('panel-right');

    // IntersectionObserver to detect when #panel-right is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                panelRight.classList.add('visible');
                console.log("panel-right is in view — class 'visible' added.");
            } else {
                panelRight.classList.remove('visible');
                console.log("panel-right is out of view — class 'visible' removed.");
            }
        });
    }, {
        root: null,           // viewport
        threshold: 0.5        // 50% visible triggers
    });

    observer.observe(panelRight);
});
document.addEventListener('DOMContentLoaded', () => {
    const panelRight = document.getElementById('panel-right');
    const followUp = panelRight.querySelector('.follow-up');
    const followUpSpans = followUp.querySelectorAll('span');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                panelRight.classList.add('visible');
                console.log("panel-right is in view — class 'visible' added.");

                // Reveal the follow-up container
                followUp.classList.remove('hidden');

                // Animate in each span with delay
                followUpSpans.forEach((span, index) => {
                    setTimeout(() => {
                        span.classList.add('show');
                    }, index * 700); // 400ms delay between each
                });

            } else {
                panelRight.classList.remove('visible');
                console.log("panel-right is out of view — class 'visible' removed.");

                // Reset animation
                followUp.classList.add('hidden');
                followUpSpans.forEach(span => {
                    span.classList.remove('show');
                });
            }
        });
    }, {
        root: null,
        threshold: 0.5
    });

    observer.observe(panelRight);
});
//this next chunk animates the quotes fading in 
document.addEventListener('DOMContentLoaded', () => {
    const panelRight = document.getElementById('panel-right');
    const panelAfter = document.getElementById('panel-after');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'panel-right') {
                if (entry.isIntersecting) {
                    panelRight.classList.add('visible');
                } else {
                    panelRight.classList.remove('visible');
                }
            }

            if (entry.target.id === 'panel-after') {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        panelAfter.classList.add('visible');
                    }, 100); // 1 second delay
                } else {
                    panelAfter.classList.remove('visible');
                }
            }
        });
    }, {
        root: null,
        threshold: 0.5
    });

    observer.observe(panelRight);
    observer.observe(panelAfter);
});

//adding lines connecting people to concepts
document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('connections-svg');

  const quoteEyal = document.getElementById('quote-eyal');
  const quoteSaba = document.getElementById('quote-saba');
  const quoteSamia = document.getElementById('quote-samia1');

  const conceptEyal = document.getElementById('concept-eyal');
  const conceptSaba = document.getElementById('concept-saba');
  const conceptSamia = document.getElementById('concept-samia');

  const lineEyal = document.getElementById('line-eyal');
  const lineSaba = document.getElementById('line-saba');
  const lineSamia = document.getElementById('line-samia');

  // Function to get center coordinates of an element relative to viewport
  function getCenterCoords(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  // Function to update the position of lines
 function updateLines() {
  const startEyal = getCenterCoords(quoteEyal);
  const endEyal = getCenterCoords(conceptEyal);

  const startSaba = getCenterCoords(quoteSaba);
  const endSaba = getCenterCoords(conceptSaba);

  const startSamia = getCenterCoords(quoteSamia);
  const endSamia = getCenterCoords(conceptSamia);

  console.log('Eyal line coords:', startEyal, endEyal);
  console.log('Saba line coords:', startSaba, endSaba);
  console.log('Samia line coords:', startSamia, endSamia);

  lineEyal.setAttribute('x1', startEyal.x);
  lineEyal.setAttribute('y1', startEyal.y);
  lineEyal.setAttribute('x2', endEyal.x);
  lineEyal.setAttribute('y2', endEyal.y);

  lineSaba.setAttribute('x1', startSaba.x);
  lineSaba.setAttribute('y1', startSaba.y);
  lineSaba.setAttribute('x2', endSaba.x);
  lineSaba.setAttribute('y2', endSaba.y);

  lineSamia.setAttribute('x1', startSamia.x);
  lineSamia.setAttribute('y1', startSamia.y);
  lineSamia.setAttribute('x2', endSamia.x);
  lineSamia.setAttribute('y2', endSamia.y);
}

  // Only show lines when #panel-after and next panel are mostly visible
  function checkVisibility() {
    const panelAfter = document.getElementById('panel-after');
    const panelNext = document.getElementById('panel1'); // adjust if different panel

    const rectAfter = panelAfter.getBoundingClientRect();
    const rectNext = panelNext.getBoundingClientRect();

    const afterVisible = rectAfter.right > 0 && rectAfter.left < window.innerWidth;
    const nextVisible = rectNext.right > 0 && rectNext.left < window.innerWidth;

    if (afterVisible && nextVisible) {
      svg.style.display = 'block';
      updateLines();
    } else {
      svg.style.display = 'none';
    }
  }

  // Update on scroll and resize
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
});
document.addEventListener('DOMContentLoaded', () => {
  const situatednessParagraph = document.getElementById('situatedness-paragraph');
  const panelCartography = document.getElementById('panel-cartography');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Delay before fade-in
        setTimeout(() => {
          situatednessParagraph.classList.add('show');
          situatednessParagraph.classList.remove('hidden');
        }, 2000); // delay in milliseconds (2 seconds)
      }
    });
  }, {
    root: null,
    threshold: 0.5
  });

  observer.observe(panelCartography);
});
const panels = document.querySelectorAll('.panel');

function checkVisible() {
  const viewportWidth = window.innerWidth;
  panels.forEach(panel => {
    const rect = panel.getBoundingClientRect();
    if(rect.left >= 0 && rect.left < viewportWidth / 2) {
      panel.classList.add('visible');
    } else {
      panel.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('resize', checkVisible);
checkVisible(); // Initial check
