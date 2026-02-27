import { useState, useEffect, useRef } from "react";

const FONT_URL = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

const style = `
  @import url('${FONT_URL}');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080C16;
    --surface: #0F1522;
    --surface2: #151D2E;
    --surface3: #1C2538;
    --border: rgba(255,255,255,0.07);
    --accent: #4DFFA0;
    --accent2: #5B8AF0;
    --accent3: #FF6B6B;
    --accent4: #FFB347;
    --text: #EEF2FF;
    --text2: #8896B3;
    --text3: #4A5A7A;
    --font: 'DM Sans', sans-serif;
    --fontHead: 'Space Grotesk', sans-serif;
    --fontMono: 'JetBrains Mono', monospace;
    --r: 18px;
    --r2: 12px;
    --r3: 8px;
    --shadow: 0 8px 32px rgba(0,0,0,0.4);
    --glow: 0 0 20px rgba(77,255,160,0.15);
  }
  body { background: #000; font-family: var(--font); }

  .phone-wrap {
    display: flex; justify-content: center; align-items: center;
    min-height: 100vh; background: radial-gradient(ellipse at 50% 30%, #0F1A2E 0%, #050810 70%);
    padding: 20px;
  }
  .phone {
    width: 390px; height: 844px;
    background: var(--bg);
    border-radius: 52px;
    border: 1.5px solid rgba(255,255,255,0.12);
    box-shadow: 0 0 0 6px #0a0a12, 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08);
    display: flex; flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  .notch {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 126px; height: 34px;
    background: #000;
    border-radius: 0 0 20px 20px;
    z-index: 100;
  }
  .status-bar {
    height: 44px; display: flex; align-items: flex-end; justify-content: space-between;
    padding: 0 28px 6px;
    flex-shrink: 0;
    font-family: var(--fontMono);
    font-size: 11px;
    color: var(--text2);
  }
  
  /* TOP BAR */
  .topbar {
    padding: 4px 20px 12px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }
  .account-btn {
    display: flex; align-items: center; gap: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 50px;
    padding: 7px 14px 7px 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .account-btn:hover { background: var(--surface3); }
  .account-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: linear-gradient(135deg, #4DFFA0, #5B8AF0);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700; color: #000;
  }
  .account-name { font-family: var(--fontHead); font-size: 13px; font-weight: 600; color: var(--text); }
  .account-chevron { color: var(--text2); font-size: 10px; }
  .topbar-right { display: flex; gap: 8px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--surface2);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px;
    transition: all 0.2s;
  }
  .icon-btn:hover { background: var(--surface3); }

  /* SCREEN */
  .screen {
    flex: 1; overflow-y: auto; overflow-x: hidden;
    padding: 0 20px 20px;
    scrollbar-width: none;
  }
  .screen::-webkit-scrollbar { display: none; }

  /* BOTTOM NAV */
  .bottom-nav {
    height: 80px; flex-shrink: 0;
    background: var(--surface);
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-around;
    padding: 0 10px 12px;
    position: relative;
  }
  .nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    cursor: pointer; padding: 4px 14px; border-radius: 12px;
    transition: all 0.2s;
    flex: 1;
  }
  .nav-item:hover { background: var(--surface2); }
  .nav-icon { font-size: 20px; transition: transform 0.2s; }
  .nav-label { font-size: 10px; font-weight: 500; color: var(--text3); letter-spacing: 0.3px; }
  .nav-item.active .nav-label { color: var(--accent); }
  .nav-item.active .nav-icon { transform: translateY(-1px); }
  .nav-add-wrap { flex: 1; display: flex; justify-content: center; align-items: center; margin-top: -28px; }
  .nav-add {
    width: 58px; height: 58px; border-radius: 50%;
    background: linear-gradient(135deg, #4DFFA0 0%, #22D3EE 100%);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(77,255,160,0.4), 0 0 0 4px var(--surface);
    font-size: 26px; color: #000; font-weight: 300;
    transition: all 0.2s;
    line-height: 1;
  }
  .nav-add:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(77,255,160,0.5), 0 0 0 4px var(--surface); }

  /* CARDS */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r);
    padding: 18px;
    margin-bottom: 14px;
  }
  .card-sm {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 14px;
  }

  /* DASHBOARD */
  .kpi-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
  .kpi-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r2);
    padding: 16px;
    position: relative;
    overflow: hidden;
  }
  .kpi-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .kpi-card.green::before { background: linear-gradient(90deg, var(--accent), transparent); }
  .kpi-card.blue::before { background: linear-gradient(90deg, var(--accent2), transparent); }
  .kpi-label { font-size: 11px; color: var(--text2); font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px; }
  .kpi-value { font-family: var(--fontHead); font-size: 24px; font-weight: 700; color: var(--text); letter-spacing: -0.5px; }
  .kpi-sub { font-size: 11px; color: var(--text3); margin-top: 4px; }
  .kpi-badge {
    display: inline-flex; align-items: center; gap: 3px;
    font-size: 10px; font-weight: 600;
    padding: 2px 7px; border-radius: 20px;
    margin-top: 6px;
  }
  .kpi-badge.up { background: rgba(77,255,160,0.12); color: var(--accent); }
  .kpi-badge.down { background: rgba(255,107,107,0.12); color: var(--accent3); }

  /* BANNER */
  .banner {
    background: linear-gradient(135deg, rgba(255,179,71,0.12) 0%, rgba(255,107,107,0.08) 100%);
    border: 1px solid rgba(255,179,71,0.25);
    border-radius: var(--r2);
    padding: 14px;
    margin-bottom: 14px;
    position: relative;
  }
  .banner-title { display: flex; align-items: center; gap: 7px; font-family: var(--fontHead); font-size: 13px; font-weight: 600; color: var(--accent4); margin-bottom: 8px; }
  .banner-close {
    position: absolute; top: 10px; right: 12px;
    width: 22px; height: 22px; border-radius: 50%;
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 12px; color: var(--text2);
  }
  .banner-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 12px;
  }
  .banner-item:last-child { border-bottom: none; }
  .banner-item-left { display: flex; align-items: center; gap: 8px; }
  .banner-item-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent4); }
  .banner-item-name { color: var(--text2); }
  .banner-item-date { font-size: 10px; color: var(--text3); }
  .banner-item-amount { font-family: var(--fontMono); color: var(--accent4); font-size: 12px; font-weight: 500; }

  /* TRANSACTIONS */
  .section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 12px;
  }
  .section-title { font-family: var(--fontHead); font-size: 16px; font-weight: 600; color: var(--text); }
  .section-link { font-size: 12px; color: var(--accent2); font-weight: 500; cursor: pointer; }
  .tx-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.15s;
  }
  .tx-item:last-child { border-bottom: none; }
  .tx-icon {
    width: 42px; height: 42px; border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .tx-info { flex: 1; }
  .tx-name { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .tx-cat { font-size: 11px; color: var(--text3); }
  .tx-right { text-align: right; }
  .tx-amount { font-family: var(--fontMono); font-size: 14px; font-weight: 500; }
  .tx-amount.neg { color: var(--accent3); }
  .tx-amount.pos { color: var(--accent); }
  .tx-date { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* STATS SCREEN */
  .period-tabs {
    display: flex; gap: 4px;
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 4px; border-radius: 12px;
    margin-bottom: 16px;
  }
  .period-tab {
    flex: 1; padding: 7px 0; text-align: center;
    font-size: 12px; font-weight: 500; color: var(--text2);
    border-radius: 9px; cursor: pointer;
    transition: all 0.2s;
  }
  .period-tab.active {
    background: var(--surface3);
    color: var(--text);
    font-weight: 600;
  }
  .bar-chart-wrap { height: 140px; display: flex; align-items: flex-end; gap: 6px; padding: 0 4px; }
  .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .bar-bg { width: 100%; background: var(--surface3); border-radius: 6px 6px 3px 3px; position: relative; overflow: hidden; }
  .bar-fill { width: 100%; border-radius: 6px 6px 3px 3px; transition: height 0.6s cubic-bezier(0.34,1.56,0.64,1); }
  .bar-label { font-size: 9px; color: var(--text3); font-family: var(--fontMono); }
  .bar-val { font-size: 8px; color: var(--text2); font-family: var(--fontMono); }

  .cat-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .cat-item:last-child { border-bottom: none; }
  .cat-dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
  .cat-name { font-size: 13px; color: var(--text); flex: 1; }
  .cat-bar-wrap { width: 80px; height: 4px; background: var(--surface3); border-radius: 2px; overflow: hidden; }
  .cat-bar-fill { height: 100%; border-radius: 2px; }
  .cat-pct { font-size: 11px; color: var(--text2); font-family: var(--fontMono); width: 36px; text-align: right; }
  .cat-amt { font-size: 12px; font-family: var(--fontMono); color: var(--text); width: 52px; text-align: right; }

  /* DONUT CHART */
  .donut-wrap { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 8px 0; }
  .donut-legends { display: flex; flex-direction: column; gap: 8px; }
  .donut-leg { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text2); }
  .donut-leg-dot { width: 8px; height: 8px; border-radius: 2px; flex-shrink: 0; }

  /* WALLET */
  .wallet-hero {
    background: linear-gradient(135deg, #0F1E3A 0%, #0A1628 100%);
    border: 1px solid rgba(91,138,240,0.2);
    border-radius: var(--r);
    padding: 20px;
    margin-bottom: 14px;
    position: relative;
    overflow: hidden;
  }
  .wallet-hero::after {
    content: '';
    position: absolute; bottom: -40px; right: -40px;
    width: 140px; height: 140px; border-radius: 50%;
    background: radial-gradient(circle, rgba(91,138,240,0.15) 0%, transparent 70%);
  }
  .wallet-label { font-size: 11px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
  .wallet-total { font-family: var(--fontHead); font-size: 34px; font-weight: 700; color: var(--text); letter-spacing: -1px; }
  .wallet-sub { font-size: 12px; color: var(--text2); margin-top: 4px; }
  .wallet-badges { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
  .wallet-badge {
    display: flex; align-items: center; gap: 5px;
    padding: 6px 12px; border-radius: 20px;
    font-size: 11px; font-weight: 500;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .asset-item {
    display: flex; align-items: center; gap: 12px;
    padding: 13px 0;
    border-bottom: 1px solid var(--border);
  }
  .asset-item:last-child { border-bottom: none; }
  .asset-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .asset-info { flex: 1; }
  .asset-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .asset-type { font-size: 11px; color: var(--text3); margin-top: 2px; }
  .asset-right { text-align: right; }
  .asset-val { font-family: var(--fontMono); font-size: 14px; color: var(--text); font-weight: 500; }
  .asset-chg { font-size: 11px; font-family: var(--fontMono); margin-top: 2px; }
  .pos { color: var(--accent); }
  .neg { color: var(--accent3); }

  /* SETTINGS */
  .settings-section { margin-bottom: 20px; }
  .settings-section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); font-weight: 600; margin-bottom: 8px; padding-left: 4px; }
  .settings-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s;
  }
  .settings-item:first-child { border-radius: var(--r2) var(--r2) 0 0; }
  .settings-item:last-child { border-radius: 0 0 var(--r2) var(--r2); border-bottom: 1px solid var(--border); }
  .settings-item:only-child { border-radius: var(--r2); }
  .settings-item + .settings-item { border-top: 0; }
  .settings-item:hover { background: var(--surface2); }
  .settings-icon { font-size: 18px; width: 30px; text-align: center; }
  .settings-label { flex: 1; font-size: 14px; color: var(--text); font-weight: 400; }
  .settings-value { font-size: 12px; color: var(--text2); margin-right: 4px; }
  .settings-chevron { color: var(--text3); font-size: 12px; }
  .toggle {
    width: 44px; height: 24px; border-radius: 12px;
    position: relative; cursor: pointer;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .toggle.on { background: var(--accent); }
  .toggle.off { background: var(--surface3); }
  .toggle-knob {
    position: absolute; top: 2px;
    width: 20px; height: 20px; border-radius: 50%;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    transition: left 0.2s cubic-bezier(0.34,1.56,0.64,1);
  }
  .toggle.on .toggle-knob { left: 22px; }
  .toggle.off .toggle-knob { left: 2px; }

  /* MODAL */
  .modal-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex; flex-direction: column;
    justify-content: flex-end;
  }
  .modal-sheet {
    background: var(--surface);
    border-radius: 28px 28px 0 0;
    border-top: 1px solid var(--border);
    padding: 0 20px 30px;
    max-height: 88%;
    overflow-y: auto;
    scrollbar-width: none;
    animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .modal-sheet::-webkit-scrollbar { display: none; }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  .modal-handle {
    width: 36px; height: 4px; border-radius: 2px;
    background: var(--surface3); margin: 12px auto 18px;
  }
  .modal-title { font-family: var(--fontHead); font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .modal-sub { font-size: 13px; color: var(--text2); margin-bottom: 20px; }

  /* FORM */
  .form-group { margin-bottom: 14px; }
  .form-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text2); font-weight: 600; margin-bottom: 7px; }
  .form-input {
    width: 100%; background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r3);
    padding: 12px 14px;
    font-family: var(--font); font-size: 14px; color: var(--text);
    outline: none; transition: border 0.2s;
  }
  .form-input:focus { border-color: rgba(77,255,160,0.4); box-shadow: 0 0 0 3px rgba(77,255,160,0.06); }
  .form-input::placeholder { color: var(--text3); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .amount-wrap { position: relative; }
  .amount-currency {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    font-family: var(--fontMono); font-size: 14px; color: var(--text2);
  }
  .amount-wrap .form-input { padding-left: 28px; font-family: var(--fontMono); font-size: 18px; font-weight: 500; }
  .cat-pills { display: flex; flex-wrap: wrap; gap: 7px; }
  .cat-pill {
    padding: 6px 12px; border-radius: 20px;
    font-size: 12px; font-weight: 500;
    background: var(--surface2); border: 1px solid var(--border);
    color: var(--text2); cursor: pointer; transition: all 0.15s;
  }
  .cat-pill.active { border-color: rgba(77,255,160,0.4); color: var(--accent); background: rgba(77,255,160,0.08); }
  .switch-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .switch-btn {
    padding: 10px; text-align: center;
    border-radius: var(--r3); font-size: 13px; font-weight: 500;
    border: 1px solid var(--border); background: var(--surface2);
    color: var(--text2); cursor: pointer; transition: all 0.2s;
  }
  .switch-btn.active { background: rgba(77,255,160,0.1); border-color: rgba(77,255,160,0.35); color: var(--accent); }
  .fixed-extra {
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--r2); padding: 14px; margin-top: 12px;
  }
  .checkbox-row {
    display: flex; align-items: center; gap: 10px; cursor: pointer;
    padding: 8px 0;
  }
  .checkbox {
    width: 18px; height: 18px; border-radius: 5px;
    border: 1.5px solid var(--border);
    background: var(--surface2);
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; transition: all 0.15s;
    flex-shrink: 0;
  }
  .checkbox.checked { background: var(--accent); border-color: var(--accent); color: #000; }
  .checkbox-label { font-size: 13px; color: var(--text2); }
  .submit-btn {
    width: 100%; padding: 16px;
    background: linear-gradient(135deg, #4DFFA0, #22D3EE);
    border-radius: var(--r2); border: none;
    font-family: var(--fontHead); font-size: 16px; font-weight: 700;
    color: #000; cursor: pointer; margin-top: 6px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .submit-btn:hover { opacity: 0.92; transform: scale(0.99); }

  /* ACCOUNT DROPDOWN */
  .acc-dropdown {
    position: absolute; top: 86px; left: 20px; right: 20px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: var(--r);
    z-index: 150;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    overflow: hidden;
    animation: fadeIn 0.18s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .acc-dd-item {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 16px;
    cursor: pointer; transition: background 0.15s;
    border-bottom: 1px solid var(--border);
  }
  .acc-dd-item:last-child { border-bottom: none; }
  .acc-dd-item:hover { background: var(--surface3); }
  .acc-dd-avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #000; flex-shrink: 0; }
  .acc-dd-info { flex: 1; }
  .acc-dd-name { font-size: 14px; font-weight: 600; color: var(--text); }
  .acc-dd-bal { font-size: 11px; color: var(--text2); font-family: var(--fontMono); }
  .acc-dd-check { color: var(--accent); font-size: 14px; }
  .acc-dd-divider { height: 1px; background: var(--border); }
  .acc-dd-new { display: flex; align-items: center; gap: 10px; padding: 14px 16px; cursor: pointer; color: var(--accent); font-size: 14px; font-weight: 500; }

  .pill { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 10px; font-weight: 600; }
  .pill.fixed { background: rgba(91,138,240,0.12); color: var(--accent2); }
  .pill.once { background: rgba(255,255,255,0.05); color: var(--text3); }

  .screen-title { font-family: var(--fontHead); font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 16px; }
  .screen-title span { color: var(--accent); }

  .profile-hero {
    display: flex; align-items: center; gap: 14px;
    padding: 16px; background: var(--surface);
    border: 1px solid var(--border); border-radius: var(--r);
    margin-bottom: 20px;
  }
  .profile-avatar { width: 54px; height: 54px; border-radius: 50%; background: linear-gradient(135deg, #4DFFA0, #5B8AF0); display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #000; flex-shrink: 0; }
  .profile-name { font-family: var(--fontHead); font-size: 17px; font-weight: 600; color: var(--text); }
  .profile-email { font-size: 12px; color: var(--text2); margin-top: 2px; }

  .weekly-wrap { display: flex; align-items: flex-end; gap: 4px; height: 80px; }
  .weekly-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .weekly-bar { width: 100%; border-radius: 4px 4px 0 0; }
  .weekly-day { font-size: 9px; color: var(--text3); font-family: var(--fontMono); }

  .spark-line { position: relative; height: 40px; overflow: hidden; }
`;

const ACCOUNTS = [
    { id: 1, name: "Personal", initial: "P", balance: "€4,231.50", color: "linear-gradient(135deg,#4DFFA0,#22D3EE)" },
    { id: 2, name: "Business", initial: "B", balance: "€12,890.00", color: "linear-gradient(135deg,#5B8AF0,#A78BFA)" },
    { id: 3, name: "Joint w/ Ana", initial: "J", balance: "€2,450.80", color: "linear-gradient(135deg,#FFB347,#FF6B6B)" },
];

const CATEGORIES = [
    { name: "🍔 Food", color: "#FF6B6B" },
    { name: "🚗 Transport", color: "#FFB347" },
    { name: "🏠 Housing", color: "#5B8AF0" },
    { name: "📺 Subs", color: "#A78BFA" },
    { name: "💊 Health", color: "#4DFFA0" },
    { name: "🛍 Shopping", color: "#F472B6" },
    { name: "⚡ Utilities", color: "#22D3EE" },
    { name: "🎉 Leisure", color: "#FBBF24" },
];

const TRANSACTIONS = [
    { icon: "🍔", name: "McDonald's", cat: "Food", amount: -12.50, date: "Today", type: "once", color: "#FF6B6B20" },
    { icon: "🚇", name: "Metro Card", cat: "Transport", amount: -30.00, date: "Today", type: "fixed", color: "#FFB34720" },
    { icon: "📺", name: "Netflix", cat: "Subscriptions", amount: -15.99, date: "Yesterday", type: "fixed", color: "#A78BFA20" },
    { icon: "💼", name: "Salary", cat: "Income", amount: 2400.00, date: "Feb 20", type: "fixed", color: "#4DFFA020" },
    { icon: "🛒", name: "Continente", cat: "Shopping", amount: -87.30, date: "Feb 19", type: "once", color: "#F472B620" },
    { icon: "⚡", name: "EDP Energy", cat: "Utilities", amount: -64.00, date: "Feb 18", type: "fixed", color: "#22D3EE20" },
];

const ASSETS = [
    { icon: "📈", name: "S&P 500 ETF", type: "Investment", value: "€8,430.00", change: "+12.4%", pos: true, color: "#4DFFA020" },
    { icon: "🏦", name: "Savings Account", type: "Savings — 3.5% APY", value: "€5,200.00", change: "+3.5% yr", pos: true, color: "#5B8AF020" },
    { icon: "₿", name: "Bitcoin", type: "Crypto", value: "€1,840.50", change: "-4.2%", pos: false, color: "#FFB34720" },
    { icon: "🏠", name: "Real Estate Fund", type: "Investment", value: "€3,000.00", change: "+7.1%", pos: true, color: "#A78BFA20" },
    { icon: "💶", name: "Emergency Fund", type: "Savings", value: "€2,500.00", change: "Safe", pos: true, color: "#22D3EE20" },
];

const BAR_DATA = [
    { label: "Sep", val: 1640, pct: 65 },
    { label: "Oct", val: 1920, pct: 76 },
    { label: "Nov", val: 1310, pct: 52 },
    { label: "Dec", val: 2540, pct: 100, accent: true },
    { label: "Jan", val: 1780, pct: 70 },
    { label: "Feb", val: 1450, pct: 57, current: true },
];

const CAT_DATA = [
    { name: "🍔 Food", pct: 32, amt: "€464", color: "#FF6B6B" },
    { name: "🏠 Housing", pct: 25, amt: "€362", color: "#5B8AF0" },
    { name: "🚗 Transport", pct: 15, amt: "€217", color: "#FFB347" },
    { name: "📺 Subscriptions", pct: 12, amt: "€174", color: "#A78BFA" },
    { name: "🛍 Shopping", pct: 10, amt: "€145", color: "#F472B6" },
    { name: "⚡ Other", pct: 6, amt: "€87", color: "#22D3EE" },
];

const WEEKLY = [62, 45, 78, 35, 90, 55, 40];
const WEEKLY_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function DonutChart({ data }) {
    const size = 120;
    const r = 44;
    const cx = 60, cy = 60;
    const circumference = 2 * Math.PI * r;
    let offset = 0;
    const segments = data.map(d => {
        const len = (d.pct / 100) * circumference;
        const seg = { ...d, offset, len };
        offset += len;
        return seg;
    });
    return (
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
    {segments.map((s, i) => (
        <circle
            key={i}
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={s.color}
        strokeWidth={16}
        strokeDasharray={`${s.len} ${circumference - s.len}`}
        strokeDashoffset={-s.offset}
        strokeLinecap="butt"
            />
    ))}
    <circle cx={cx} cy={cy} r={30} fill="#0F1522" />
        </svg>
);
}

function SparkLine({ color = "#4DFFA0" }) {
    const pts = [80, 55, 70, 45, 65, 40, 60, 35, 55, 45, 30, 50];
    const w = 200, h = 40;
    const dx = w / (pts.length - 1);
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${i * dx},${h - (p / 100) * h}`).join(" ");
    return (
        <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
    <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
    <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        </defs>
        <path d={path + ` L${w},${h} L0,${h} Z`} fill="url(#sg)" />
    <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
);
}

function Toggle({ on, onToggle }) {
    return (
        <div className={`toggle ${on ? "on" : "off"}`} onClick={onToggle}>
    <div className="toggle-knob" />
        </div>
);
}

export default function SpendyApp() {
    const [tab, setTab] = useState("home");
    const [showModal, setShowModal] = useState(false);
    const [showAccDrop, setShowAccDrop] = useState(false);
    const [activeAccount, setActiveAccount] = useState(0);
    const [showBanner, setShowBanner] = useState(true);
    const [expType, setExpType] = useState("once");
    const [freq, setFreq] = useState("monthly");
    const [notifyMe, setNotifyMe] = useState(false);
    const [selCat, setSelCat] = useState("🍔 Food");
    const [periodTab, setPeriodTab] = useState("Monthly");
    const [settings, setSettings] = useState({ notifs: true, dark: true, biometrics: false });

    return (
        <>
            <style>{style}</style>
        <div className="phone-wrap">
    <div className="phone">
    <div className="notch" />
    <div className="status-bar">
        <span>9:41</span>
    <span>● ● ●</span>
    <span>100%</span>
    </div>

    {/* TOP BAR */}
    <div className="topbar">
    <div className="account-btn" onClick={() => setShowAccDrop(!showAccDrop)}>
    <div className="account-avatar" style={{ background: ACCOUNTS[activeAccount].color }}>
    {ACCOUNTS[activeAccount].initial}
    </div>
    <span className="account-name">{ACCOUNTS[activeAccount].name}</span>
        <span className="account-chevron">{showAccDrop ? "▲" : "▼"}</span>
        </div>
        <div className="topbar-right">
    <div className="icon-btn">🔔</div>
    <div className="icon-btn">⚙️</div>
    </div>
    </div>

    {/* ACCOUNT DROPDOWN */}
    {showAccDrop && (
        <div className="acc-dropdown">
            {ACCOUNTS.map((acc, i) => (
                    <div key={acc.id} className="acc-dd-item" onClick={() => { setActiveAccount(i); setShowAccDrop(false); }}>
        <div className="acc-dd-avatar" style={{ background: acc.color }}>{acc.initial}</div>
    <div className="acc-dd-info">
    <div className="acc-dd-name">{acc.name}</div>
        <div className="acc-dd-bal">{acc.balance}</div>
        </div>
        {activeAccount === i && <span className="acc-dd-check">✓</span>}
        </div>
        ))}
        <div className="acc-dd-new">
            <span>＋</span> Create new account
    </div>
    </div>
    )}

        {/* SCREENS */}
        <div className="screen" onClick={() => showAccDrop && setShowAccDrop(false)}>
        {tab === "home" && <HomeScreen showBanner={showBanner} setShowBanner={setShowBanner} />}
            {tab === "stats" && <StatsScreen periodTab={periodTab} setPeriodTab={setPeriodTab} />}
                {tab === "wallet" && <WalletScreen />}
                {tab === "settings" && <SettingsScreen settings={settings} setSettings={setSettings} />}
                </div>

                    {/* BOTTOM NAV */}
                    <div className="bottom-nav">
                        {[
                                { id: "home", icon: "🏠", label: "Home" },
                    { id: "stats", icon: "📊", label: "Stats" },
                ].map(n => (
                    <div key={n.id} className={`nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
                    <span className="nav-icon">{n.icon}</span>
                        <span className="nav-label" style={tab === n.id ? { color: "var(--accent)" } : {}}>{n.label}</span>
                </div>
                ))}
                    <div className="nav-add-wrap">
                    <div className="nav-add" onClick={() => setShowModal(true)}>＋</div>
                </div>
                    {[
                        { id: "wallet", icon: "💼", label: "Wallet" },
                        { id: "settings", icon: "👤", label: "Profile" },
                    ].map(n => (
                        <div key={n.id} className={`nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
                        <span className="nav-icon">{n.icon}</span>
                            <span className="nav-label" style={tab === n.id ? { color: "var(--accent)" } : {}}>{n.label}</span>
                    </div>
                    ))}
                    </div>

                    {/* ADD EXPENSE MODAL */}
                    {showModal && (
                        <div className="modal-overlay" onClick={(e) => e.target.className === "modal-overlay" && setShowModal(false)}>
                        <div className="modal-sheet">
                        <div className="modal-handle" />
                        <div className="modal-title">Add Expense ✦</div>
                    <div className="modal-sub">Track your spending in seconds</div>

                    <div className="form-group">
                    <div className="form-label">Description</div>
                        <input className="form-input" placeholder="e.g. Netflix subscription..." />
                        </div>

                        <div className="form-group">
                    <div className="form-label">Amount</div>
                        <div className="amount-wrap">
                    <span className="amount-currency">€</span>
                        <input className="form-input" placeholder="0.00" type="number" />
                        </div>
                        </div>

                        <div className="form-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <div className="form-label">Date</div>
                            <input className="form-input" type="date" defaultValue="2026-02-24" />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                        <div className="form-label">Account</div>
                            <select className="form-input" style={{ appearance: "none" }}>
                        {ACCOUNTS.map(a => <option key={a.id}>{a.name}</option>)}
                            </select>
                            </div>
                            </div>
                            <div style={{ height: 14 }} />

                        <div className="form-group">
                        <div className="form-label">Category</div>
                            <div className="cat-pills">
                            {CATEGORIES.map(c => (
                                    <div key={c.name} className={`cat-pill ${selCat === c.name ? "active" : ""}`} onClick={() => setSelCat(c.name)}>
                            {c.name}
                            </div>
                        ))}
                            </div>
                            </div>

                            <div className="form-group">
                        <div className="form-label">Type</div>
                            <div className="switch-row">
                        <div className={`switch-btn ${expType === "once" ? "active" : ""}`} onClick={() => setExpType("once")}>
                        ⚡ One-time
                        </div>
                        <div className={`switch-btn ${expType === "fixed" ? "active" : ""}`} onClick={() => setExpType("fixed")}>
                        🔄 Fixed
                        </div>
                        </div>
                        </div>

                            {expType === "fixed" && (
                                <div className="fixed-extra">
                                <div className="form-label" style={{ marginBottom: 10 }}>Recurrence</div>
                            <div className="switch-row" style={{ marginBottom: 12 }}>
                                <div className={`switch-btn ${freq === "monthly" ? "active" : ""}`} onClick={() => setFreq("monthly")} style={{ fontSize: 12 }}>
                            📅 Monthly
                            </div>
                            <div className={`switch-btn ${freq === "custom" ? "active" : ""}`} onClick={() => setFreq("custom")} style={{ fontSize: 12 }}>
                            🗓 Custom
                            </div>
                            </div>
                                {freq === "custom" && (
                                    <div style={{ marginBottom: 10 }}>
                                    <div className="form-label">Select months</div>
                                <div className="cat-pills">
                                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
                                    <div key={m} className="cat-pill" style={{ fontSize: 10, padding: "4px 9px" }}>{m}</div>
                                ))}
                                    </div>
                                    </div>
                                )}
                                <div className="checkbox-row" onClick={() => setNotifyMe(!notifyMe)}>
                                <div className={`checkbox ${notifyMe ? "checked" : ""}`}>{notifyMe ? "✓" : ""}</div>
                            <span className="checkbox-label">🔔 Notify me when upcoming next month</span>
                            </div>
                            </div>
                            )}

                            <div style={{ height: 6 }} />
                        <button className="submit-btn" onClick={() => setShowModal(false)}>Add Expense →</button>
                        </div>
                        </div>
                        )}
                        </div>
                        </div>
                        </>
                    );
                    }

                    function HomeScreen({ showBanner, setShowBanner }) {
                        return (
                            <>
                                <div style={{ marginBottom: 6 }}>
                        <div style={{ fontFamily: "var(--fontHead)", fontSize: 12, color: "var(--text2)", letterSpacing: 0.5, marginBottom: 2 }}>
                        February 2026
                        </div>
                        <div style={{ fontFamily: "var(--fontHead)", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                        Good evening, João 👋
        </div>
        </div>

        <div style={{ height: 14 }} />

                        {/* KPIs */}
                        <div className="kpi-row">
                        <div className="kpi-card green">
                        <div className="kpi-label">This Month</div>
                        <div className="kpi-value">€1,450</div>
                        <div className="kpi-sub">of €2,000 budget</div>
                        <div className="kpi-badge down">▲ +8% vs last</div>
                        <div style={{ marginTop: 8, height: 3, background: "var(--surface3)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "72.5%", background: "linear-gradient(90deg,#4DFFA0,#22D3EE)", borderRadius: 2 }} />
                        </div>
                        </div>
                        <div className="kpi-card blue">
                        <div className="kpi-label">Monthly Avg</div>
                        <div className="kpi-value">€1,738</div>
                        <div className="kpi-sub">last 6 months</div>
                        <div className="kpi-badge up">▼ -16% trend</div>
                        <div style={{ marginTop: 8, height: 35, overflow: "hidden" }}>
                        <SparkLine color="#5B8AF0" />
                            </div>
                            </div>
                            </div>

                        {/* Upcoming banner */}
                        {showBanner && (
                            <div className="banner">
                            <div className="banner-close" onClick={() => setShowBanner(false)}>✕</div>
                        <div className="banner-title">🔔 Upcoming next month</div>
                            {[
                                { name: "Netflix", date: "Mar 1", amount: "€15.99" },
                                { name: "EDP Energy", date: "Mar 5", amount: "€64.00" },
                                { name: "Metro Card", date: "Mar 10", amount: "€30.00" },
                            ].map(item => (
                                <div key={item.name} className="banner-item">
                            <div className="banner-item-left">
                            <div className="banner-item-dot" />
                            <div>
                                <div className="banner-item-name">{item.name}</div>
                                <div className="banner-item-date">{item.date}</div>
                                </div>
                                </div>
                                <div className="banner-item-amount">{item.amount}</div>
                                </div>
                            ))}
                            </div>
                        )}

                        {/* Transactions */}
                        <div className="section-header">
                        <span className="section-title">Recent Transactions</span>
                        <span className="section-link">See all →</span>
                        </div>
                        <div className="card" style={{ padding: "4px 18px" }}>
                        {TRANSACTIONS.map((tx, i) => (
                            <div key={i} className="tx-item">
                        <div className="tx-icon" style={{ background: tx.color }}>{tx.icon}</div>
                        <div className="tx-info">
                        <div className="tx-name">{tx.name}</div>
                            <div className="tx-cat" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            {tx.cat}
                            <span className={`pill ${tx.type}`}>{tx.type === "fixed" ? "Fixed" : "Once"}</span>
                        </div>
                        </div>
                        <div className="tx-right">
                        <div className={`tx-amount ${tx.amount < 0 ? "neg" : "pos"}`}>
                            {tx.amount < 0 ? "-" : "+"}€{Math.abs(tx.amount).toFixed(2)}
                            </div>
                            <div className="tx-date">{tx.date}</div>
                            </div>
                            </div>
                        ))}
                        </div>
                        </>
                    );
                    }

                    function StatsScreen({ periodTab, setPeriodTab }) {
                        const periods = ["Weekly", "Monthly", "Yearly"];
                        return (
                            <>
                                <div className="screen-title">Statistics <span>✦</span></div>

                        <div className="period-tabs">
                            {periods.map(p => (
                                    <div key={p} className={`period-tab ${periodTab === p ? "active" : ""}`} onClick={() => setPeriodTab(p)}>
                        {p}
                        </div>
                    ))}
                        </div>

                        {/* Summary row */}
                        <div className="kpi-row">
                        <div className="kpi-card green">
                        <div className="kpi-label">Total Spent</div>
                        <div className="kpi-value" style={{ fontSize: 20 }}>€1,450</div>
                        <div className="kpi-badge down">▲ +8%</div>
                        </div>
                        <div className="kpi-card blue">
                        <div className="kpi-label">Avg / Day</div>
                            <div className="kpi-value" style={{ fontSize: 20 }}>€60.4</div>
                        <div className="kpi-badge up">▼ -5%</div>
                        </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="card">
                        <div className="section-header" style={{ marginBottom: 16 }}>
                        <span className="section-title">Spending History</span>
                        <span style={{ fontSize: 11, color: "var(--text3)" }}>6 months</span>
                        </div>
                        <div className="bar-chart-wrap">
                            {BAR_DATA.map((b, i) => (
                                    <div key={i} className="bar-col">
                                <div style={{ fontSize: 9, fontFamily: "var(--fontMono)", color: b.current ? "var(--accent)" : "var(--text3)", marginBottom: 2 }}>
                        {b.current ? `€${(b.val/1000).toFixed(1)}k` : ""}
                        </div>
                        <div className="bar-bg" style={{ height: 100 }}>
                        <div
                            className="bar-fill"
                        style={{
                            height: `${b.pct}%`,
                                background: b.current
                                ? "linear-gradient(180deg, #4DFFA0, #22D3EE)"
                                : b.accent
                                    ? "linear-gradient(180deg,#FFB347,#FF6B6B)"
                                    : "var(--surface3)"
                        }}
                        />
                        </div>
                        <div className="bar-label">{b.label}</div>
                            </div>
                    ))}
                        </div>
                        </div>

                        {/* Weekly trend */}
                        <div className="card">
                        <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>Weekly Trend</div>
                        <div className="weekly-wrap">
                            {WEEKLY.map((v, i) => (
                                    <div key={i} className="weekly-col">
                                <div
                                    className="weekly-bar"
                                style={{
                            height: `${v}%`,
                                background: i === 4
                                ? "linear-gradient(180deg,#FF6B6B,#FF6B6B80)"
                                : `rgba(91,138,240,${0.3 + v / 200})`
                        }}
                        />
                        <div className="weekly-day">{WEEKLY_DAYS[i]}</div>
                            </div>
                    ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                        <span style={{ fontSize: 11, color: "var(--text3)" }}>Peak: Friday €90</span>
                        <span style={{ fontSize: 11, color: "var(--accent)" }}>Avg: €63/day</span>
                        </div>
                        </div>

                        {/* Donut + Categories */}
                        <div className="card">
                        <div className="section-title" style={{ fontSize: 15, marginBottom: 14 }}>By Category</div>
                        <div className="donut-wrap">
                        <DonutChart data={CAT_DATA} />
                        <div className="donut-legends">
                            {CAT_DATA.map((c, i) => (
                                    <div key={i} className="donut-leg">
                                <div className="donut-leg-dot" style={{ background: c.color }} />
                        <span>{c.name}</span>
                        <span style={{ fontFamily: "var(--fontMono)", marginLeft: "auto", color: "var(--text)" }}>{c.pct}%</span>
                        </div>
                    ))}
                        </div>
                        </div>
                        </div>

                        {/* Category breakdown */}
                        <div className="card" style={{ padding: "14px 18px 4px" }}>
                        <div className="section-title" style={{ fontSize: 15, marginBottom: 4 }}>Breakdown</div>
                        {CAT_DATA.map((c, i) => (
                            <div key={i} className="cat-item">
                        <div className="cat-dot" style={{ background: c.color }} />
                        <span className="cat-name">{c.name}</span>
                            <div className="cat-bar-wrap">
                        <div className="cat-bar-fill" style={{ width: `${c.pct}%`, background: c.color }} />
                        </div>
                        <span className="cat-pct">{c.pct}%</span>
                            <span className="cat-amt">{c.amt}</span>
                            </div>
                        ))}
                        </div>
                        </>
                    );
                    }

                    function WalletScreen() {
                        return (
                            <>
                                <div className="screen-title">Wallet <span>✦</span></div>

                        {/* Hero */}
                        <div className="wallet-hero">
                        <div className="wallet-label">Total Net Worth</div>
                        <div className="wallet-total">€20,970.50</div>
                        <div className="wallet-sub">Across 5 assets · Updated now</div>
                        <div style={{ height: 14 }}>
                        <SparkLine color="#5B8AF0" />
                            </div>
                            <div className="wallet-badges">
                        <div className="wallet-badge">
                        <span style={{ color: "var(--accent)" }}>▲</span>
                        <span>+8.4% all time</span>
                        </div>
                        <div className="wallet-badge">
                            <span>💰</span>
                        <span>€7,700 liquid</span>
                        </div>
                        <div className="wallet-badge">
                        <span style={{ color: "var(--accent2)" }}>📈</span>
                        <span>€13,270 invested</span>
                        </div>
                        </div>
                        </div>

                        {/* Assets */}
                        <div className="section-header">
                        <span className="section-title">All Assets</span>
                        <span className="section-link">+ Add asset</span>
                        </div>
                        <div className="card" style={{ padding: "4px 18px" }}>
                        {ASSETS.map((a, i) => (
                            <div key={i} className="asset-item">
                        <div className="asset-icon" style={{ background: a.color }}>{a.icon}</div>
                        <div className="asset-info">
                        <div className="asset-name">{a.name}</div>
                            <div className="asset-type">{a.type}</div>
                            </div>
                            <div className="asset-right">
                        <div className="asset-val">{a.value}</div>
                            <div className={`asset-chg ${a.pos ? "pos" : "neg"}`}>{a.change}</div>
                        </div>
                        </div>
                        ))}
                        </div>

                        {/* Allocation */}
                        <div className="card">
                        <div className="section-title" style={{ fontSize: 15, marginBottom: 12 }}>Allocation</div>
                        {[
                            { name: "Investments", pct: 63, color: "#5B8AF0" },
                            { name: "Savings", pct: 25, color: "#4DFFA0" },
                            { name: "Crypto", pct: 9, color: "#FFB347" },
                            { name: "Cash", pct: 3, color: "#A78BFA" },
                        ].map((a, i) => (
                            <div key={i} style={{ marginBottom: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 12, color: "var(--text2)" }}>{a.name}</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--fontMono)", color: a.color }}>{a.pct}%</span>
                        </div>
                        <div style={{ height: 4, background: "var(--surface3)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${a.pct}%`, background: a.color, borderRadius: 2 }} />
                        </div>
                        </div>
                        ))}
                        </div>
                        </>
                    );
                    }

                    function SettingsScreen({ settings, setSettings }) {
                        const toggle = key => setSettings(s => ({ ...s, [key]: !s[key] }));
                        return (
                            <>
                                <div className="profile-hero">
                            <div className="profile-avatar">J</div>
                            <div>
                            <div className="profile-name">João Silva</div>
                        <div className="profile-email">joao.silva@email.com</div>
                        <div style={{ marginTop: 5 }}>
                        <span style={{ fontSize: 10, background: "rgba(77,255,160,0.1)", color: "var(--accent)", padding: "3px 9px", borderRadius: 20, fontWeight: 600 }}>
                    ✦ Pro Plan
                        </span>
                        </div>
                        </div>
                        </div>

                        <div className="settings-section">
                        <div className="settings-section-label">Preferences</div>
                            <div>
                            {[
                                    { icon: "🔔", label: "Push Notifications", key: "notifs", isToggle: true },
                        { icon: "🌙", label: "Dark Mode", key: "dark", isToggle: true },
                        { icon: "🔐", label: "Biometric Auth", key: "biometrics", isToggle: true },
                    ].map((s, i) => (
                            <div key={i} className="settings-item">
                        <span className="settings-icon">{s.icon}</span>
                            <span className="settings-label">{s.label}</span>
                            <Toggle on={settings[s.key]} onToggle={() => toggle(s.key)} />
                        </div>
                    ))}
                        </div>
                        </div>

                        <div className="settings-section">
                        <div className="settings-section-label">App</div>
                            <div>
                            {[
                                    { icon: "🌐", label: "Language", value: "English" },
                        { icon: "💱", label: "Currency", value: "EUR €" },
                        { icon: "📅", label: "Start of Month", value: "1st" },
                    ].map((s, i) => (
                            <div key={i} className="settings-item">
                        <span className="settings-icon">{s.icon}</span>
                            <span className="settings-label">{s.label}</span>
                            <span className="settings-value">{s.value}</span>
                            <span className="settings-chevron">›</span>
                        </div>
                    ))}
                        </div>
                        </div>

                        <div className="settings-section">
                        <div className="settings-section-label">Account Sharing</div>
                        <div>
                        {[
                                { icon: "👥", label: "Shared Accounts", value: "1 active" },
                        { icon: "📨", label: "Invite Member", value: "" },
                        { icon: "🔗", label: "Linked Services", value: "2" },
                    ].map((s, i) => (
                            <div key={i} className="settings-item">
                        <span className="settings-icon">{s.icon}</span>
                            <span className="settings-label">{s.label}</span>
                        {s.value && <span className="settings-value">{s.value}</span>}
                            <span className="settings-chevron">›</span>
                        </div>
                        ))}
                        </div>
                        </div>

                        <div className="settings-section">
                        <div className="settings-section-label">Support</div>
                            <div>
                            {[
                                    { icon: "💬", label: "Help & Support" },
                        { icon: "⭐", label: "Rate Spendy" },
                        { icon: "📋", label: "Privacy Policy" },
                        { icon: "ℹ️", label: "About App", value: "v1.0.0" },
                    ].map((s, i) => (
                            <div key={i} className="settings-item">
                        <span className="settings-icon">{s.icon}</span>
                            <span className="settings-label">{s.label}</span>
                        {s.value && <span className="settings-value">{s.value}</span>}
                            <span className="settings-chevron">›</span>
                        </div>
                        ))}
                        </div>
                        </div>

                        <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
                        <div style={{ fontSize: 12, color: "var(--accent3)", fontWeight: 600, cursor: "pointer" }}>Sign Out</div>
                        <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 6 }}>SPENDY v1.0.0 · Made with ♥</div>
                        </div>
                        </>
                    );
                    }