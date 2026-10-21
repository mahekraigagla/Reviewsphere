(function() {
  console.log("ReviewSphere Widget Engine initialized.");

  function getBaseUrl() {
    try {
      if (document.currentScript && document.currentScript.src) {
        return new URL(document.currentScript.src).origin;
      }
    } catch (e) {}
    if (typeof window !== 'undefined' && window.location && window.location.origin) {
      return window.location.origin;
    }
    return '';
  }

  function initWidgets() {
    const containers = document.querySelectorAll('[data-reviewsphere-widget]');
    const baseUrl = getBaseUrl();

    containers.forEach(container => {
      const type = container.getAttribute('data-reviewsphere-widget');
      const businessId = container.getAttribute('data-business-id') || 'BUS001';

      fetch(`${baseUrl}/api/public/business/${businessId}`)
        .then(res => res.json())
        .then(data => {
          if (!data.success) return;
          const b = data.business;
          const reviews = data.reviews || [];

          if (type === 'badge' || type === 'rating-badge') {
            container.innerHTML = `
              <div style="display: inline-flex; align-items: center; gap: 12px; font-family: sans-serif; background: #0f172a; color: #fff; padding: 10px 18px; border-radius: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 18px; color: #f59e0b;">★★★★★</div>
                <div style="font-weight: 700; font-size: 16px;">${b.rating} / 5</div>
                <div style="font-size: 13px; color: #94a3b8;">${b.totalReviews.toLocaleString()} Verified Reviews</div>
                <div style="background: #0d9488; color: #fff; font-size: 10px; text-transform: uppercase; font-weight: 800; padding: 2px 8px; border-radius: 10px;">ReviewSphere</div>
              </div>
            `;
          } else {
            // Default Carousel / List Widget
            let cardsHtml = reviews.slice(0, 4).map(r => `
              <div style="flex: 0 0 280px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); font-family: sans-serif;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="color: #f59e0b; font-size: 14px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
                  ${r.verified ? '<span style="font-size: 11px; background: #dcfce7; color: #166534; font-weight: 600; padding: 2px 6px; border-radius: 4px;">✓ Verified</span>' : ''}
                </div>
                <p style="font-size: 13px; color: #334155; margin: 0 0 12px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">"${r.reviewText}"</p>
                <div style="font-size: 12px; font-weight: 600; color: #0f172a;">${r.customerName}</div>
                <div style="font-size: 11px; color: #64748b;">${r.productName || 'Verified Order'}</div>
              </div>
            `).join('');

            container.innerHTML = `
              <div style="font-family: sans-serif; padding: 16px 0;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                  <div>
                    <h4 style="margin: 0; font-size: 18px; color: #0f172a;">Customer Reviews for ${b.name}</h4>
                    <div style="font-size: 13px; color: #64748b; margin-top: 2px;">Rated ${b.rating} ⭐ out of 5 based on ${b.totalReviews} verified reviews</div>
                  </div>
                  <span style="font-size: 12px; font-weight: 700; color: #0d9488;">Powered by ReviewSphere</span>
                </div>
                <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px;">
                  ${cardsHtml}
                </div>
              </div>
            `;
          }
        })
        .catch(err => console.error("Error loading ReviewSphere widget:", err));
    });
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initWidgets();
  } else {
    document.addEventListener('DOMContentLoaded', initWidgets);
  }
})();
