/* Main JavaScript - Core Functionality */

// 1. Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Don't prevent default for empty hash
      if (href === '#' || href === '') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 2. Sticky nav on scroll
  const nav = document.querySelector('.nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
  });

  // 3. Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // 4. GitHub star count (live)
  async function fetchGitHubStars() {
    try {
      // Replace with your actual GitHub repo
      const response = await fetch('https://api.github.com/repos/roampal-ai/roampal');
      const data = await response.json();

      const starsElement = document.getElementById('gh-stars');
      const githubStarsElement = document.getElementById('github-stars');

      if (starsElement) {
        starsElement.textContent = `⭐ ${data.stargazers_count.toLocaleString()}`;
      }

      if (githubStarsElement) {
        githubStarsElement.textContent = data.stargazers_count.toLocaleString();
      }
    } catch (error) {
      console.log('GitHub API rate limit or network error:', error);
      // Fallback to static values if API fails
      const starsElement = document.getElementById('gh-stars');
      if (starsElement) {
        starsElement.textContent = '⭐';
      }
    }
  }

  // Fetch stars on load
  fetchGitHubStars();

  // 5. OS detection for download button
  function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('win') !== -1) return 'Windows';
    if (userAgent.indexOf('mac') !== -1) return 'macOS';
    if (userAgent.indexOf('linux') !== -1) return 'Linux';
    return 'Windows'; // default
  }

  const downloadBtnText = document.getElementById('download-btn-text');
  if (downloadBtnText) {
    const os = detectOS();
    downloadBtnText.textContent = `Download for ${os}`;
  }

  // 6. Auto-open first FAQ (optional)
  // Uncomment if you want the first FAQ item to be open by default
  // const firstFaqItem = document.querySelector('.faq-item');
  // if (firstFaqItem) {
  //   firstFaqItem.setAttribute('open', '');
  // }

  // 7. Track analytics events (placeholder)
  // Add your analytics tracking here (Plausible, GA, etc.)
  function trackEvent(eventName, properties = {}) {
    // Example for Plausible Analytics:
    // if (window.plausible) {
    //   window.plausible(eventName, { props: properties });
    // }

    // Example for Google Analytics:
    // if (window.gtag) {
    //   window.gtag('event', eventName, properties);
    // }

    console.log('Event:', eventName, properties);
  }

  // Track download clicks
  document.querySelectorAll('a[href*="download"], a[href*="releases"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('download_click', {
        source: link.textContent.trim()
      });
    });
  });

  // Track external link clicks
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('external_link_click', {
        url: link.href,
        text: link.textContent.trim()
      });
    });
  });

  // 8. Video lazy loading
  const videoIframes = document.querySelectorAll('.video-wrapper iframe');
  videoIframes.forEach(iframe => {
    // Only load YouTube embed when scrolled into view
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const src = iframe.getAttribute('src');
          if (!src || src.includes('VIDEO_ID')) {
            // Placeholder - update with actual video ID
            console.log('Video placeholder detected. Update VIDEO_ID in index.html');
          }
          videoObserver.unobserve(iframe);
        }
      });
    }, { threshold: 0.25 });

    videoObserver.observe(iframe);
  });

  // 9. Keyboard navigation improvements
  document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any open details/accordions
    if (e.key === 'Escape') {
      document.querySelectorAll('details[open]').forEach(details => {
        details.removeAttribute('open');
      });
    }
  });

  // 10. Copy code blocks on click (optional enhancement)
  document.querySelectorAll('pre code').forEach(codeBlock => {
    codeBlock.style.cursor = 'pointer';
    codeBlock.title = 'Click to copy';

    codeBlock.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);

        // Visual feedback
        const originalBg = codeBlock.style.background;
        codeBlock.style.background = 'rgba(59, 130, 246, 0.2)';

        setTimeout(() => {
          codeBlock.style.background = originalBg;
        }, 200);

        console.log('Code copied to clipboard');
      } catch (err) {
        console.log('Failed to copy code:', err);
      }
    });
  });

  console.log('Roampal website loaded successfully ✨');
});
