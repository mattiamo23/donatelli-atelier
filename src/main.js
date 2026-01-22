document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const logo = document.getElementById('introLogo');

  // small intro animation: fade-in logo then slower dissolve overlay for a cinematic effect
  const introReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!introReduced) {
    // ensure background is white while overlay is visible for a clean dissolve
    document.body.style.backgroundColor = 'white';

    setTimeout(() => {
      logo.classList.remove('opacity-0');
      // gently finish scale to 1 for a subtle effect
      logo.style.transform = 'scale(1)';
    }, 120);

    // more pronounced dissolve: show overlay longer then fade with blur
    setTimeout(() => {
      intro.classList.add('fade-out');
      // after the overlay transition completes, restore the normal background
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 1100); // matches CSS transition duration
    }, 1400);
  } else {
    // reduced motion: do a simple immediate reveal
    logo.classList.remove('opacity-0');
    logo.style.transform = 'scale(1)';
    intro.classList.add('fade-out');
  }

  // Modern accessible lightbox for gallery items with animations
  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const img = document.createElement('img');
      img.src = el.getAttribute('href');
      img.className = 'max-w-[95vw] max-h-[90vh] rounded-lg';
      img.alt = el.querySelector('img')?.alt || 'Immagine ingrandita';

      const modal = document.createElement('div');
      modal.className = 'lightbox-overlay fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.appendChild(img);
      
      // Click to close
      modal.addEventListener('click', () => {
        modal.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 200);
      });
      
      // ESC to close
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          modal.click();
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
      
      document.body.appendChild(modal);
    });
  });

  // Subtle pulse animation for hero logo
  const hero = document.getElementById('heroLogo');
  if (hero) {
    // Animation removed per user request
  }

  // Delicate page transitions with fade
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mainEl = document.querySelector('main');

  if (!prefersReduced && mainEl) {
    // Initial fade in
    mainEl.style.opacity = '0';
    mainEl.style.transition = 'opacity 0.4s ease';
    
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        mainEl.style.opacity = '1';
      }, 50);
    });
  }

  function navigateWithTransition(href) {
    if (prefersReduced || !mainEl) { 
      window.location.href = href; 
      return; 
    }
    
    mainEl.style.opacity = '0';
    setTimeout(() => { window.location.href = href; }, 300);
  }

  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    // ignore external links and anchors and mailto/tel
    if (href.startsWith('http') && !href.includes(location.hostname)) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      navigateWithTransition(href);
    });
  });

});