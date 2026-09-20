export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

.rento-root {
  --ink: #15141A;
  --ink-2: #1D1B24;
  --ink-3: #26232E;
  --line: #322F3B;
  --paper: #F6F2E9;
  --paper-dim: #E8E2D3;
  --gold: #C2954F;
  --gold-dim: #A67B3D;
  --muted: #8B889A;
  --ease: cubic-bezier(.2,.7,.3,1);
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}
.rento-root * { box-sizing: border-box; }
.ambient-bg { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
.nav, main, .footer { position: relative; z-index: 1; }
.rento-root h1, .rento-root h2, .rento-root h3, .rento-root h4 { font-family: 'Fraunces', serif; margin: 0; }
.rento-root p { margin: 0; line-height: 1.55; }
.rento-root button { font-family: inherit; cursor: pointer; }
.rento-root img { display: block; }

.btn { border: none; border-radius: 6px; padding: 12px 20px; font-size: 14px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; transition: transform .16s var(--ease), opacity .16s var(--ease), background .16s var(--ease), box-shadow .16s var(--ease); }
.btn:hover { box-shadow: 0 4px 14px rgba(21,20,26,0.10); }
.btn:active { transform: scale(0.96); box-shadow: none; }
.btn-primary { background: var(--gold); color: var(--ink); }
.btn-primary:hover { background: var(--gold-dim); }
.btn-ghost { background: transparent; border: 1px solid var(--line); color: var(--ink); }
.btn-ghost:hover { border-color: var(--gold-dim); color: var(--gold-dim); }
.btn-ghost-dark { background: transparent; border: 1px solid rgba(246,242,233,0.35); color: var(--paper); }
.btn-ghost-dark:hover { border-color: var(--gold); color: var(--gold); }
.btn-danger { background: #9C2A24; color: white; }
.btn-danger:hover { background: #B3322C; }
.btn-full { width: 100%; justify-content: center; margin-top: 8px; }
.btn-sm { padding: 8px 14px; font-size: 13px; }

/* PAGE TRANSITION */
.page-transition { animation: pageIn .38s var(--ease) both; }
@keyframes pageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* REVEAL ON SCROLL */
.reveal { opacity: .38; filter: blur(7px); transform: translateY(18px) scale(.985); transition: opacity .65s var(--ease), transform .65s var(--ease), filter .65s var(--ease); }
.reveal-in { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-in { filter: none; transform: none; transition: opacity .2s ease; }
}

/* SMART IMAGE */
.img-loading { opacity: 0; }
.img-loaded { opacity: 1; transition: opacity .35s ease; }
.img-fallback { display: flex; align-items: center; justify-content: center; background: repeating-linear-gradient(135deg, #ECE7DA, #ECE7DA 10px, #E3DDCC 10px, #E3DDCC 20px); color: #A8A292; width: 100%; height: 100%; }

/* TOASTS */
.toast-stack { position: fixed; bottom: 22px; right: 22px; display: flex; flex-direction: column; gap: 10px; z-index: 9999; }
.toast { background: var(--ink); color: var(--paper); padding: 12px 16px; border-radius: 8px; font-size: 13.5px; box-shadow: 0 12px 28px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 8px; animation: toastIn .3s var(--ease); }
.toast-success svg { color: var(--gold); }
@keyframes toastIn { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

/* NAV & NOTIFICATIONS */
.nav { position: sticky; top: 0; z-index: 50; background: rgba(246,242,233,0.92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--paper-dim); transition: box-shadow .2s ease; }
.nav-inner { max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; }
.brand { display: flex; align-items: center; gap: 8px; background: none; border: none; font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--ink); }
.brand-mark { width: 28px; height: 28px; border-radius: 6px; background: var(--ink); color: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 15px; transition: transform .3s var(--ease); }
.brand:hover .brand-mark { transform: rotate(-8deg); }
.nav-links { position: relative; display: flex; gap: 4px; }
.nav-link { position: relative; background: none; border: none; padding: 8px 14px; border-radius: 6px; font-size: 14px; color: var(--muted); font-weight: 500; transition: color .15s ease, background .15s ease; z-index: 1; }
.nav-link-active, .nav-link:hover { color: var(--ink); }
.nav-link:hover { background: rgba(0,0,0,0.04); }
.nav-indicator { position: absolute; bottom: -1px; height: 2px; background: var(--gold); border-radius: 2px; transition: left .3s var(--ease), width .3s var(--ease), opacity .2s ease; }
.nav-actions { display: flex; align-items: center; gap: 8px; position: relative; }
.icon-btn { position: relative; background: none; border: 1px solid var(--paper-dim); border-radius: 6px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: var(--ink); transition: border-color .15s ease, transform .15s ease; }
.icon-btn:hover { border-color: var(--gold-dim); }
.icon-btn:active { transform: scale(.92); }
.badge-dot { position: absolute; top: 4px; right: 4px; width: 8px; height: 8px; border-radius: 50%; background: #C2452F; border: 2px solid var(--paper); }
.mobile-toggle { display: none; background: none; border: 1px solid var(--paper-dim); border-radius: 6px; width: 36px; height: 36px; align-items: center; justify-content: center; }
.mobile-menu { max-height: 0; overflow: hidden; transition: max-height .32s var(--ease); display: flex; flex-direction: column; gap: 2px; padding: 0 20px; }
.mobile-menu-open { max-height: 320px; padding: 10px 20px 18px; }
.mobile-link { text-align: left; background: none; border: none; padding: 10px 4px; font-size: 15px; color: var(--ink); border-bottom: 1px solid var(--paper-dim); }
.mobile-link-active { color: var(--gold-dim); font-weight: 600; }

/* NOTIFICATION POPOVER */
.notif-popover { position: absolute; top: 46px; right: 0; width: 340px; background: white; border: 1px solid var(--paper-dim); border-radius: 10px; box-shadow: 0 16px 36px rgba(21,20,26,0.18); z-index: 100; overflow: hidden; animation: toastIn .2s var(--ease); }
.notif-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--paper-dim); background: var(--paper); }
.notif-head h4 { font-size: 14px; margin: 0; }
.notif-clear { background: none; border: none; font-size: 12px; color: var(--gold-dim); font-weight: 600; }
.notif-list { max-height: 360px; overflow-y: auto; }
.notif-item { padding: 12px 16px; border-bottom: 1px solid var(--paper-dim); transition: background .15s ease; cursor: pointer; }
.notif-item:hover { background: rgba(194,149,79,0.05); }
.notif-item-unread { background: #FAF7F0; font-weight: 500; }
.notif-item strong { display: block; font-size: 13px; margin-bottom: 3px; color: var(--ink); }
.notif-item p { font-size: 12px; color: #514E5C; margin: 0; }
.notif-item span { display: block; font-size: 11px; color: var(--muted); margin-top: 4px; }

/* HERO */
.hero { max-width: 1180px; margin: 0 auto; padding: 64px 24px 40px; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
.eyebrow-plain { color: var(--gold-dim); font-size: 13px; font-weight: 600; margin-bottom: 14px; }
.hero-title { font-size: 56px; line-height: 1.03; font-weight: 500; letter-spacing: -0.5px; animation: fadeUp .6s var(--ease) both; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.hero-sub { margin-top: 18px; font-size: 17px; color: #514E5C; max-width: 460px; }
.search-bar { margin-top: 28px; display: flex; align-items: center; background: white; border: 1px solid var(--paper-dim); border-radius: 8px; padding: 6px 6px 6px 16px; max-width: 480px; gap: 8px; transition: box-shadow .2s ease, border-color .2s ease; }
.search-bar:focus-within { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(194,149,79,0.15); }
.search-icon { color: var(--muted); flex-shrink: 0; }
.search-bar input { flex: 1; border: none; outline: none; font-size: 15px; padding: 10px 0; background: none; }
.search-submit { flex-shrink: 0; }
.hero-stats { display: flex; gap: 32px; margin-top: 40px; }
.hero-stats div { display: flex; flex-direction: column; }
.hero-stats strong { font-family: 'Fraunces', serif; font-size: 20px; }
.hero-stats span { font-size: 12px; color: var(--muted); margin-top: 2px; }
.hero-visual { position: relative; }
.hero-img-main { width: 100%; height: 420px; object-fit: cover; border-radius: 10px; }
.hero-img-float { position: absolute; width: 42%; aspect-ratio: 4/3; object-fit: cover; bottom: -32px; left: -36px; border-radius: 8px; border: 4px solid var(--paper); box-shadow: 0 12px 30px rgba(0,0,0,0.18); }
.hero-product-swap { animation: productSwap .55s var(--ease) both; }
@keyframes productSwap { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.hero-badge { position: absolute; top: 16px; right: 16px; background: rgba(21,20,26,0.85); color: var(--paper); font-size: 12px; font-weight: 600; padding: 8px 12px; border-radius: 20px; display: flex; align-items: center; gap: 6px; }

/* SECTIONS */
.section { max-width: 1180px; margin: 0 auto; padding: 56px 24px 0; }
.section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 24px; }
.section-head h2 { font-size: 28px; font-weight: 500; }
.link-more { background: none; border: none; color: var(--gold-dim); font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 2px; transition: gap .15s ease; }
.link-more:hover { gap: 6px; }

/* HOW RENTO WORKS */
.how { padding-top: 72px; }
.how .section-head { max-width: 620px; margin-bottom: 30px; }
.how .section-head h2 { font-size: 34px; }
.how-grid { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.how-grid::before { content: ""; position: absolute; top: 38px; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), var(--gold), transparent); opacity: .55; }
.how-step { position: relative; z-index: 1; min-height: 220px; padding: 30px 24px 24px; background: rgba(255,255,255,.78); border: 1px solid var(--paper-dim); border-radius: 12px; box-shadow: 0 12px 28px rgba(21,20,26,.05); transition: transform .28s var(--ease), box-shadow .28s var(--ease), border-color .28s ease; }
.how-step:hover { transform: translateY(-7px); border-color: rgba(194,149,79,.7); box-shadow: 0 20px 36px rgba(21,20,26,.11); }
.how-index { width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; border: 1px solid var(--gold); border-radius: 50%; background: var(--paper); color: var(--gold-dim); font-family: 'Fraunces', serif; font-size: 21px; box-shadow: 0 0 0 7px rgba(194,149,79,.1); }
.how-step h3 { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 500; margin-bottom: 10px; }
.how-step p { max-width: 300px; color: #514E5C; font-size: 14px; line-height: 1.65; }

/* COMPACT HOST CTA */
.earn-wrap { max-width: 1180px; margin: 64px auto 0; padding: 0 24px; }
.earn { display: grid; grid-template-columns: 1fr .8fr; min-height: 260px; overflow: hidden; border-radius: 12px; background: var(--ink); color: var(--paper); box-shadow: 0 20px 42px rgba(21,20,26,.16); }
.earn-copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 38px 42px; }
.earn-copy .eyebrow-plain { margin-bottom: 8px; color: var(--gold); }
.earn-copy h2 { font-size: 32px; font-weight: 500; margin-bottom: 10px; }
.earn-copy p:not(.eyebrow-plain) { max-width: 400px; color: rgba(246,242,233,.7); font-size: 14px; margin-bottom: 20px; }
.earn-img { width: 100%; height: 100%; min-height: 260px; object-fit: cover; opacity: .82; }

.cat-row { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; }
.cat-chip { flex-shrink: 0; display: flex; align-items: center; gap: 8px; background: white; border: 1px solid var(--paper-dim); padding: 10px 16px; border-radius: 22px; font-size: 13.5px; font-weight: 500; color: var(--ink); transition: border-color .15s ease, color .15s ease, transform .15s ease; }
.cat-chip:hover { border-color: var(--gold); color: var(--gold-dim); transform: translateY(-2px); }
.cat-chip:active, .link-more:active { transform: scale(.96); }
.rento-root button:focus-visible, .rento-root input:focus-visible, .rento-root select:focus-visible { outline: 3px solid rgba(194,149,79,.38); outline-offset: 3px; }

.grid-featured { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 260px; gap: 18px; }
.grid-explore { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

.pcard { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; transition: transform .22s var(--ease), box-shadow .22s var(--ease), border-color .22s var(--ease); will-change: transform; }
.pcard:hover { transform: translateY(-4px); box-shadow: 0 18px 34px rgba(21,20,26,0.10); border-color: transparent; }
.pcard:active { transform: translateY(-1px) scale(.985); }
.pcard-lg { grid-row: span 2; }
.pcard-media { position: relative; aspect-ratio: 4/3; overflow: hidden; cursor: pointer; background: var(--paper-dim); transform-style: preserve-3d; transition: transform .35s var(--ease); will-change: transform; }
.pcard-lg .pcard-media { aspect-ratio: auto; height: 62%; }
.pcard-media img, .pcard-media .img-fallback { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease); }
.pcard:hover .pcard-media img { transform: scale(1.07); }
.avail-pill { position: absolute; top: 10px; left: 10px; background: rgba(21,20,26,0.78); color: var(--paper); font-size: 10.5px; font-weight: 600; padding: 4px 9px 4px 7px; border-radius: 12px; display: flex; align-items: center; gap: 5px; opacity: 0; transform: translateY(-4px); transition: opacity .2s ease, transform .2s ease; }
.pcard:hover .avail-pill { opacity: 1; transform: translateY(0); }
.avail-dot { width: 6px; height: 6px; border-radius: 50%; background: #6FCF7E; animation: availPulse 1.8s ease-in-out infinite; }
@keyframes availPulse { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(111,207,126,0.5); } 50% { opacity: .6; box-shadow: 0 0 0 4px rgba(111,207,126,0); } }
.fav-btn { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.92); border: none; display: flex; align-items: center; justify-content: center; color: var(--ink); transition: transform .15s ease, color .15s ease; }
.fav-btn:hover { transform: scale(1.08); }
.fav-btn-active { color: #C2452F; }
.pcard-body { padding: 14px 16px 16px; cursor: pointer; flex: 1; }
.pcard-top { display: flex; justify-content: space-between; gap: 10px; align-items: baseline; }
.pcard-top h3 { font-size: 15.5px; font-weight: 600; font-family: 'Inter', sans-serif; line-height: 1.3; }
.pcard-price { font-weight: 700; color: var(--gold-dim); font-size: 14.5px; white-space: nowrap; }
.pcard-price small { font-weight: 500; color: var(--muted); }
.pcard-meta { display: flex; gap: 14px; margin-top: 8px; font-size: 12.5px; color: var(--muted); }
.pcard-meta span { display: flex; align-items: center; gap: 4px; }

/* EXPLORE */
.explore { max-width: 1180px; margin: 0 auto; padding: 44px 24px 80px; }
.explore-head { display: flex; justify-content: space-between; align-items: flex-end; }
.explore-head h1 { font-size: 32px; font-weight: 500; }
.explore-head p { color: var(--muted); margin-top: 6px; font-size: 14px; }
.explore-body { display: grid; grid-template-columns: 220px 1fr; gap: 40px; margin-top: 32px; }
.filters { border-right: 1px solid var(--paper-dim); padding-right: 24px; }
.filter-block { margin-bottom: 28px; }
.filter-block h4 { font-size: 12px; color: var(--muted); font-weight: 600; margin-bottom: 10px; font-family: 'Inter', sans-serif; }
.filter-item { display: flex; align-items: center; gap: 6px; width: 100%; text-align: left; background: none; border: none; padding: 6px 0; font-size: 13.5px; color: #514E5C; transition: color .15s ease, transform .15s ease; }
.filter-item:hover { color: var(--ink); transform: translateX(2px); }
.filter-item-active { color: var(--gold-dim); font-weight: 600; }
.filter-check { color: var(--gold-dim); opacity: 0; transform: scale(0.4); transition: opacity .18s var(--ease), transform .18s var(--ease); flex-shrink: 0; }
.filter-item-active .filter-check { opacity: 1; transform: scale(1); }
.range { width: 100%; accent-color: var(--gold); }
.range-value { font-size: 12.5px; color: var(--muted); margin-top: 4px; }
.toggle-row { display: flex; align-items: center; gap: 10px; background: none; border: none; padding: 4px 0; font-size: 13.5px; color: #514E5C; }
.toggle-track { width: 34px; height: 20px; border-radius: 12px; background: var(--paper-dim); position: relative; transition: background .2s var(--ease); flex-shrink: 0; }
.toggle-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.25); transition: transform .22s var(--ease); }
.toggle-row-active .toggle-track { background: var(--gold); }
.toggle-row-active .toggle-thumb { transform: translateX(14px); }
.results-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.results-toolbar select { border: 1px solid var(--paper-dim); border-radius: 6px; padding: 8px 12px; font-size: 13.5px; background: white; }

/* PRODUCT PAGE */
.product-page { max-width: 1180px; margin: 0 auto; padding: 32px 24px 80px; }
.back-link { background: none; border: none; display: flex; align-items: center; gap: 4px; color: var(--muted); font-size: 13.5px; margin-bottom: 20px; }
.product-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; }
.gallery-main { border-radius: 10px; overflow: hidden; aspect-ratio: 4/3; background: var(--paper-dim); box-shadow: 0 20px 40px rgba(21,20,26,0.06); }
.gallery-main-inner { width: 100%; height: 100%; }
.gallery-main img { width: 100%; height: 100%; object-fit: cover; }
.gallery-thumbs { display: flex; gap: 8px; margin-top: 10px; }
.thumb { width: 72px; height: 54px; border-radius: 6px; overflow: hidden; border: 2px solid transparent; padding: 0; cursor: pointer; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb-active { border-color: var(--gold); }
.product-info h1 { font-size: 28px; font-weight: 500; margin-top: 4px; }
.product-meta { display: flex; gap: 16px; margin-top: 10px; font-size: 13.5px; color: var(--muted); }
.product-desc { margin-top: 16px; font-size: 14.5px; color: #514E5C; }
.owner-row { display: flex; align-items: center; gap: 10px; margin-top: 22px; padding: 14px; border: 1px solid var(--paper-dim); border-radius: 8px; }
.owner-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--ink); color: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
.owner-sub { font-size: 12px; color: var(--muted); }

/* BOOKING CARD & CONFLICT PREVENTION */
.booking-card { margin-top: 24px; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 20px; background: white; }
.booking-price { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; }
.booking-price .big { font-family: 'Fraunces', serif; font-size: 26px; }
.booking-price .unit { color: var(--muted); font-size: 13px; }
.booking-price .weekly { margin-left: auto; font-size: 12.5px; color: var(--muted); }
.date-selector-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.date-field label { font-size: 12px; color: var(--muted); font-weight: 600; margin-bottom: 4px; display: block; }
.date-input { width: 100%; border: 1px solid var(--paper-dim); border-radius: 6px; padding: 8px 10px; font-size: 13.5px; font-family: inherit; }
.conflict-alert { margin-top: 14px; padding: 10px 12px; background: #FDE8E8; border: 1px solid #F8B4B4; border-radius: 6px; color: #9C2A24; font-size: 12.5px; display: flex; align-items: flex-start; gap: 8px; }
.price-breakdown { margin-top: 16px; border-top: 1px solid var(--paper-dim); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; }
.price-breakdown div { display: flex; justify-content: space-between; font-size: 13.5px; color: #514E5C; }
.price-total { font-weight: 700; color: var(--ink) !important; border-top: 1px solid var(--paper-dim); padding-top: 8px; margin-top: 4px; }
.price-total span { font-size: 15px !important; }

/* DASHBOARD */
.dash { max-width: 1180px; margin: 0 auto; padding: 40px 24px 80px; display: grid; grid-template-columns: 220px 1fr; gap: 40px; }
.dash-side-title { font-size: 12px; color: var(--muted); font-weight: 600; margin-bottom: 12px; }
.dash-tab { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; background: none; border: none; padding: 10px 12px; border-radius: 6px; font-size: 14px; color: #514E5C; margin-bottom: 2px; transition: background .15s ease, color .15s ease; }
.dash-tab:hover { background: rgba(21,20,26,0.05); }
.dash-tab-active { background: var(--ink); color: var(--paper); }
.dash-tab-active:hover { background: var(--ink); }
.dash-badge { margin-left: auto; background: var(--gold); color: var(--ink); font-size: 11px; padding: 2px 7px; border-radius: 10px; font-weight: 700; }
.dash-new-btn { width: 100%; justify-content: center; margin-top: 18px; }
.dash-content h1 { font-size: 26px; font-weight: 500; margin-bottom: 24px; }
.dash-head-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.dash-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.dash-filter-btn { background: white; border: 1px solid var(--paper-dim); border-radius: 20px; padding: 6px 14px; font-size: 12.5px; color: var(--muted); cursor: pointer; transition: all .15s ease; }
.dash-filter-btn-active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 32px; }
.stat-card { border: 1px solid var(--paper-dim); border-radius: 10px; padding: 18px; background: white; display: flex; flex-direction: column; gap: 6px; transition: transform .2s var(--ease), box-shadow .2s var(--ease); }
.stat-card:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(21,20,26,0.06); }
.stat-label { font-size: 12px; color: var(--muted); }
.stat-value { font-family: 'Fraunces', serif; font-size: 22px; }
.dash-chart-block { border: 1px solid var(--paper-dim); border-radius: 10px; padding: 22px; background: white; }
.dash-chart-block h3 { font-size: 15px; margin-bottom: 12px; font-weight: 600; font-family: 'Inter', sans-serif; }

/* MY LISTINGS DASHBOARD CARDS */
.my-listings-list { display: flex; flex-direction: column; gap: 16px; }
.my-listing-card { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 18px; display: grid; grid-template-columns: 140px 1fr auto; gap: 20px; align-items: center; transition: box-shadow .2s ease; }
.my-listing-card:hover { box-shadow: 0 8px 24px rgba(21,20,26,0.06); }
.my-listing-img { width: 140px; height: 105px; border-radius: 8px; object-fit: cover; background: var(--paper-dim); }
.my-listing-info h3 { font-size: 17px; margin-bottom: 6px; font-family: 'Inter', sans-serif; font-weight: 600; }
.my-listing-price { font-size: 14.5px; font-weight: 700; color: var(--gold-dim); margin-bottom: 8px; }
.my-listing-stats { display: flex; gap: 16px; font-size: 12.5px; color: var(--muted); }
.my-listing-stats span { display: flex; align-items: center; gap: 4px; }
.my-listing-actions { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
.action-row { display: flex; gap: 8px; }
.rejection-banner { margin-top: 10px; padding: 8px 12px; background: #FDE8E8; border-radius: 6px; font-size: 12px; color: #9C2A24; display: flex; align-items: center; gap: 6px; }

/* TABLE */
.table { border: 1px solid var(--paper-dim); border-radius: 10px; overflow: hidden; background: white; }
.table-row { display: grid; grid-template-columns: 2fr 1.2fr 1fr 1.2fr; padding: 14px 18px; font-size: 13.5px; align-items: center; border-bottom: 1px solid var(--paper-dim); }
.table-row:last-child { border-bottom: none; }
.table-head { background: var(--paper); font-weight: 600; color: var(--muted); font-size: 12px; }
.table-item { display: flex; align-items: center; gap: 10px; }
.table-item img { width: 42px; height: 42px; border-radius: 6px; object-fit: cover; }
.handover-box { display: flex; flex-direction: column; gap: 6px; font-size: 12px; }
.handover-box label { display: flex; align-items: center; gap: 6px; cursor: pointer; }

/* PILLS */
.pill { font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px; }
.pill-amber { background: #FBEBD2; color: #92600E; }
.pill-green { background: #DCEFDD; color: #1D6A32; }
.pill-blue { background: #DCE7F5; color: #1E4E8C; }
.pill-red { background: #F7DCDA; color: #9C2A24; }
.pill-grey { background: #ECE9E1; color: #6B6878; }

/* WIZARD & MODALS */
.wizard-overlay { position: fixed; inset: 0; background: rgba(21,20,26,0.72); backdrop-filter: blur(6px); z-index: 900; display: flex; align-items: center; justify-content: center; padding: 20px; overflow-y: auto; }
.wizard-modal { background: var(--paper); border-radius: 14px; width: 100%; max-width: 820px; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 24px 60px rgba(0,0,0,0.3); overflow: hidden; animation: pageIn .25s var(--ease); }
.detail-modal { max-width: 860px; }
.reject-dialog { max-width: 520px; }
.wizard-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 28px; border-bottom: 1px solid var(--paper-dim); background: white; }
.wizard-header h2 { font-size: 22px; font-weight: 500; margin: 0; }
.wizard-sub { font-size: 13px; color: var(--muted); margin-top: 2px; }

/* STEPPER */
.stepper-nav { display: flex; gap: 6px; padding: 12px 28px; background: white; border-bottom: 1px solid var(--paper-dim); overflow-x: auto; }
.step-chip { display: flex; align-items: center; gap: 6px; background: none; border: none; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; color: var(--muted); transition: all .15s ease; white-space: nowrap; }
.step-chip-active { background: var(--ink); color: var(--paper); font-weight: 600; }
.step-chip-done { color: var(--ink); }
.step-num { width: 18px; height: 18px; border-radius: 50%; background: var(--paper-dim); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; }
.step-chip-active .step-num { background: var(--gold); color: var(--ink); }
.step-chip-done .step-num { background: #DCEFDD; color: #1D6A32; }

/* WIZARD BODY & FORMS */
.wizard-body { padding: 28px; overflow-y: auto; flex: 1; }
.step-intro { margin-bottom: 24px; }
.step-intro h3 { font-size: 20px; margin-bottom: 6px; }
.step-intro p { font-size: 13.5px; color: #514E5C; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.col-span-2 { grid-column: span 2; }
.form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--ink); }
.form-group small { display: block; font-size: 11.5px; color: var(--muted); margin-top: 4px; }
.form-input, .form-select, .form-textarea { width: 100%; background: white; border: 1px solid var(--paper-dim); border-radius: 6px; padding: 10px 12px; font-size: 14px; font-family: inherit; color: var(--ink); transition: border-color .15s ease, box-shadow .15s ease; }
.form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px rgba(194,149,79,0.15); }
.input-err { border-color: #C2452F !important; }
.field-err { color: #C2452F; font-size: 11.5px; margin-top: 4px; display: block; }
.input-prefix { display: flex; align-items: center; background: white; border: 1px solid var(--paper-dim); border-radius: 6px; overflow: hidden; }
.input-prefix span { padding: 0 12px; color: var(--muted); font-weight: 600; font-size: 14px; }
.input-prefix .form-input { border: none; }

/* PHOTO UPLOADER */
.upload-dropzone { border: 2px dashed var(--gold); background: rgba(194,149,79,0.04); border-radius: 10px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all .2s ease; }
.upload-dropzone:hover, .dropzone-active { background: rgba(194,149,79,0.12); border-color: var(--gold-dim); }
.upload-icon { color: var(--gold-dim); margin-bottom: 10px; }
.dropzone-text strong { color: var(--ink); font-weight: 600; }
.dropzone-text span { color: var(--gold-dim); text-decoration: underline; }
.upload-dropzone small { display: block; color: var(--muted); margin-top: 6px; font-size: 12px; }
.sample-photos-bar { margin: 18px 0; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.sample-label { font-size: 12.5px; color: var(--muted); display: flex; align-items: center; gap: 4px; font-weight: 600; }
.sample-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.btn-sample-chip { background: white; border: 1px solid var(--paper-dim); border-radius: 16px; padding: 4px 10px; font-size: 12px; color: var(--ink); transition: border-color .15s ease; }
.btn-sample-chip:hover { border-color: var(--gold); }
.wizard-photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 20px; }
.photo-item { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 4/3; background: var(--paper-dim); border: 2px solid transparent; }
.photo-item-primary { border-color: var(--gold); box-shadow: 0 4px 12px rgba(194,149,79,0.25); }
.photo-item img { width: 100%; height: 100%; object-fit: cover; }
.primary-tag { position: absolute; top: 6px; left: 6px; background: var(--gold); color: var(--ink); font-size: 10.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: flex; align-items: center; gap: 3px; }
.photo-actions { position: absolute; bottom: 0; inset-x: 0; background: rgba(21,20,26,0.85); display: flex; justify-content: center; gap: 4px; padding: 4px; opacity: 0; transition: opacity .15s ease; }
.photo-item:hover .photo-actions { opacity: 1; }
.photo-btn { background: none; border: none; color: white; padding: 4px 6px; font-size: 11px; border-radius: 4px; display: flex; align-items: center; gap: 2px; }
.photo-btn:hover { background: rgba(255,255,255,0.2); }
.photo-btn-delete:hover { background: #C2452F; }

/* CONDITION & SPECS */
.condition-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.condition-card { background: white; border: 1px solid var(--paper-dim); border-radius: 8px; padding: 10px; cursor: pointer; display: flex; flex-direction: column; gap: 4px; transition: all .15s ease; }
.condition-card strong { font-size: 13px; }
.condition-card span { font-size: 11px; color: var(--muted); line-height: 1.3; }
.condition-card:hover { border-color: var(--gold); }
.condition-active { border-color: var(--gold); background: #FAF7F0; box-shadow: 0 0 0 2px var(--gold); }
.dynamic-specs-box { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 18px; margin-top: 10px; }
.specs-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
.specs-header h4 { font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; }
.specs-header small { color: var(--muted); }
.specs-list { display: flex; flex-direction: column; gap: 8px; }
.spec-row { display: grid; grid-template-columns: 140px 1fr auto; gap: 10px; align-items: center; }
.spec-key { font-size: 13px; font-weight: 500; color: #514E5C; }
.spec-input { padding: 6px 10px; font-size: 13px; }
.add-spec-bar { display: grid; grid-template-columns: 140px 1fr auto; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px dashed var(--paper-dim); }

/* CALCULATOR CARD */
.calculator-card { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 20px; margin-top: 24px; }
.calc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.calc-header h4 { font-size: 15px; font-family: 'Inter', sans-serif; font-weight: 600; }
.calc-badge { background: #DCE7F5; color: #1E4E8C; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 10px; }
.calc-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13.5px; border-bottom: 1px solid var(--paper-dim); }
.calc-fee { color: #9C2A24; }
.calc-highlight { border-bottom: none; padding-top: 12px; font-size: 15px; }
.calc-takehome { color: #1D6A32; font-size: 18px; }
.deposit-notice { margin-top: 16px; background: #FAF7F0; border: 1px solid #E8DFCC; border-radius: 8px; padding: 12px 14px; display: flex; gap: 10px; align-items: flex-start; color: #514E5C; font-size: 12.5px; }
.deposit-notice svg { color: var(--gold); flex-shrink: 0; margin-top: 2px; }

/* APPROVAL CARDS */
.approval-options { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.approval-card { background: white; border: 1px solid var(--paper-dim); border-radius: 8px; padding: 14px; display: flex; gap: 12px; cursor: pointer; transition: all .15s ease; }
.approval-card:hover { border-color: var(--gold); }
.approval-card-active { border-color: var(--gold); background: #FAF7F0; box-shadow: 0 0 0 2px var(--gold); }
.approval-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.approval-card-active .approval-radio { border-color: var(--gold); }
.radio-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
.approval-card strong { display: block; font-size: 13.5px; margin-bottom: 4px; }
.approval-card p { font-size: 12px; color: #514E5C; margin: 0; }

/* CALENDAR & BLOCKED DATES */
.calendar-block { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 20px; }
.calendar-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.calendar-top h4 { font-size: 15px; font-family: 'Inter', sans-serif; font-weight: 600; }
.cal-legend { display: flex; gap: 14px; font-size: 12px; color: var(--muted); }
.cal-legend span { display: flex; align-items: center; gap: 5px; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot-avail { background: #6FCF7E; }
.dot-blocked { background: #8B889A; }
.dot-booked { background: #C2954F; }
.mini-cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; }
.cal-day-cell { border-radius: 6px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--paper-dim); cursor: pointer; transition: all .15s ease; }
.day-avail { background: white; }
.day-avail:hover { background: #FAF7F0; border-color: var(--gold); }
.day-blocked { background: #ECE9E1; border-color: #D3CEBF; color: #6B6878; }
.day-booked { background: #FBEBD2; border-color: #E6CFA0; color: #92600E; cursor: not-allowed; }
.cell-day { font-size: 14px; font-weight: 600; }
.cell-status { font-size: 10px; margin-top: 2px; }
.cal-actions { display: flex; gap: 10px; margin-top: 16px; justify-content: flex-end; }

/* PRIVACY & FULFILLMENT */
.privacy-box { background: #FAF7F0; border: 1px solid #E8DFCC; border-radius: 8px; padding: 12px 14px; display: flex; gap: 10px; font-size: 12.5px; color: #514E5C; }
.privacy-box svg { color: var(--gold); flex-shrink: 0; }
.fulfillment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.checkbox-row { background: white; border: 1px solid var(--paper-dim); border-radius: 8px; padding: 12px; display: flex; gap: 10px; align-items: flex-start; cursor: pointer; }
.checkbox-row input { margin-top: 3px; accent-color: var(--gold); }
.checkbox-row strong { display: block; font-size: 13.5px; }
.checkbox-row span { font-size: 12px; color: var(--muted); }

/* RULES */
.preset-rules-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.rule-chip { background: white; border: 1px solid var(--paper-dim); border-radius: 20px; padding: 8px 14px; font-size: 12.5px; color: var(--ink); display: flex; align-items: center; gap: 6px; transition: all .15s ease; }
.rule-chip:hover { border-color: var(--gold); }
.rule-chip-active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.rule-check { font-weight: 700; }
.custom-rule-bar { display: flex; gap: 8px; margin-top: 10px; }
.active-rules-list { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
.active-rule-item { display: flex; justify-content: space-between; align-items: center; background: white; border: 1px solid var(--paper-dim); border-radius: 6px; padding: 8px 12px; font-size: 13px; }
.icon-btn-sm { background: none; border: none; color: var(--muted); cursor: pointer; padding: 2px; }
.icon-btn-sm:hover { color: #C2452F; }

/* PREVIEW SECTION */
.preview-container { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; overflow: hidden; }
.preview-section { padding: 20px; border-bottom: 1px solid var(--paper-dim); }
.preview-section:last-child { border-bottom: none; }
.preview-sec-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.preview-sec-head h4 { font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600; color: var(--muted); }
.preview-edit-btn { background: none; border: none; color: var(--gold-dim); font-size: 13px; font-weight: 600; cursor: pointer; }
.preview-edit-btn:hover { text-decoration: underline; }
.preview-gallery { display: flex; gap: 14px; }
.preview-main-img { width: 220px; height: 160px; object-fit: cover; border-radius: 8px; }
.preview-thumbs { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; max-height: 160px; }
.preview-thumb-img { width: 64px; height: 48px; object-fit: cover; border-radius: 4px; }
.preview-title { font-size: 24px; font-weight: 500; margin: 4px 0 8px; }
.preview-meta { display: flex; gap: 10px; align-items: center; font-size: 13px; color: var(--muted); margin-bottom: 12px; }
.preview-desc { font-size: 14px; color: #514E5C; line-height: 1.5; }
.preview-acc { margin-top: 10px; font-size: 13px; color: var(--ink); }
.preview-specs-table { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 14px; background: var(--paper); padding: 12px; border-radius: 8px; }
.spec-table-row { display: flex; justify-content: space-between; font-size: 12.5px; padding: 4px 0; border-bottom: 1px solid var(--paper-dim); }
.preview-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; font-size: 13.5px; }
.preview-pricing-grid div { display: flex; flex-direction: column; gap: 4px; }
.preview-pricing-grid span { color: var(--muted); font-size: 12px; }
.preview-rules-list { padding-left: 18px; font-size: 13.5px; color: #514E5C; display: flex; flex-direction: column; gap: 6px; }

/* WIZARD FOOTER */
.wizard-footer { display: flex; justify-content: space-between; align-items: center; padding: 16px 28px; background: white; border-top: 1px solid var(--paper-dim); }
.wizard-footer-right { display: flex; gap: 10px; }

/* SUCCESS MODAL */
.wizard-success { padding: 40px 20px; text-align: center; max-width: 520px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.success-icon { width: 72px; height: 72px; border-radius: 50%; background: #DCEFDD; color: #1D6A32; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
.wizard-success h3 { font-size: 26px; margin-bottom: 10px; }
.wizard-success p { font-size: 14.5px; color: #514E5C; margin-bottom: 24px; }
.timeline-box { width: 100%; text-align: left; background: white; border: 1px solid var(--paper-dim); border-radius: 10px; padding: 18px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
.timeline-step { display: flex; gap: 12px; align-items: center; font-size: 13px; color: var(--muted); }
.t-dot { width: 22px; height: 22px; border-radius: 50%; background: var(--paper-dim); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.timeline-done { color: var(--ink); }
.timeline-done .t-dot { background: #DCEFDD; color: #1D6A32; }
.timeline-active { color: #92600E; font-weight: 600; }
.timeline-active .t-dot { background: #FBEBD2; color: #92600E; }
.timeline-step strong { display: block; font-size: 13.5px; }
.timeline-step span { font-size: 12px; }
.success-actions { display: flex; gap: 12px; }

/* ADMIN PORTAL */
.admin-portal { margin-top: 10px; }
.admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; border-bottom: 1px solid var(--paper-dim); padding-bottom: 16px; }
.admin-header h2 { font-size: 24px; }
.admin-header p { font-size: 13.5px; color: var(--muted); margin-top: 4px; }
.admin-tabs { display: flex; gap: 8px; }
.admin-tab { background: white; border: 1px solid var(--paper-dim); border-radius: 6px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--muted); }
.admin-tab-active { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.admin-queue-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.admin-card { background: white; border: 1px solid var(--paper-dim); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
.admin-card-media { position: relative; height: 180px; }
.admin-card-media img { width: 100%; height: 100%; object-fit: cover; }
.admin-pill { position: absolute; top: 10px; right: 10px; }
.admin-card-body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
.admin-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.admin-card-top h3 { font-size: 16px; font-weight: 600; font-family: 'Inter', sans-serif; }
.admin-price { font-weight: 700; color: var(--gold-dim); }
.admin-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 12.5px; color: #514E5C; margin: 10px 0 16px; }
.admin-actions { margin-top: auto; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--paper-dim); padding-top: 12px; }
.admin-btn-group { display: flex; gap: 8px; }
.inspector-gallery { display: flex; gap: 10px; overflow-x: auto; margin-bottom: 20px; }
.inspector-img { height: 160px; border-radius: 6px; object-fit: cover; }
.inspector-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: white; padding: 16px; border-radius: 8px; border: 1px solid var(--paper-dim); font-size: 13.5px; }
.inspector-sec { margin-top: 18px; }
.inspector-sec h4 { font-size: 14px; font-family: 'Inter', sans-serif; font-weight: 600; margin-bottom: 6px; }
.reason-options { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
.reason-option { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; cursor: pointer; }
.reason-option input { margin-top: 2px; }
.alert-box { padding: 10px 14px; border-radius: 6px; font-size: 13px; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.alert-error { background: #FDE8E8; border: 1px solid #F8B4B4; color: #9C2A24; }

/* FOOTER */
.footer { background: var(--ink); color: var(--paper); margin-top: 80px; }
.footer-inner { max-width: 1180px; margin: 0 auto; padding: 48px 24px; display: flex; justify-content: space-between; }
.footer .brand { color: var(--paper); }
.footer-inner > div:first-child p { margin-top: 10px; color: rgba(246,242,233,0.6); font-size: 13.5px; max-width: 240px; }
.footer-cols { display: flex; gap: 56px; }
.footer-cols h5 { font-size: 12px; color: var(--gold); margin-bottom: 12px; }
.footer-cols div { display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: rgba(246,242,233,0.75); }

@media (max-width: 900px) {
  .hero, .product-grid, .explore-body, .dash, .my-listing-card { grid-template-columns: 1fr; }
  .grid-featured, .grid-explore, .admin-queue-grid { grid-template-columns: repeat(2, 1fr); }
  .condition-grid { grid-template-columns: repeat(3, 1fr); }
  .nav-links { display: none; }
  .mobile-toggle { display: flex; }
  .footer-inner { flex-direction: column; gap: 32px; }
  .my-listing-actions { align-items: flex-start; }
  .how-grid { grid-template-columns: 1fr; gap: 14px; }
  .how-grid::before { top: 38px; bottom: 38px; left: 23px; right: auto; width: 1px; height: auto; background: linear-gradient(180deg, transparent, var(--gold), transparent); }
  .how-step { min-height: 0; padding: 24px 24px 24px 88px; }
  .how-index { position: absolute; left: 24px; top: 24px; margin-bottom: 0; }
  .earn { grid-template-columns: 1fr; }
  .earn-copy { padding: 30px 24px; }
  .earn-img { min-height: 180px; max-height: 220px; }
}
@media (max-width: 560px) {
  .hero-title { font-size: 38px; }
  .hero { padding-top: 38px; }
  .hero-img-main { height: 300px; }
  .hero-img-float { left: -10px; bottom: -24px; }
  .earn-wrap { margin-top: 44px; }
  .grid-featured, .grid-explore, .admin-queue-grid, .condition-grid { grid-template-columns: 1fr; }
  .wizard-photo-grid { grid-template-columns: repeat(2, 1fr); }
}
`;
