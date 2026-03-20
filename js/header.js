(async function initHeader() {
  // ── 헤더 HTML 삽입 ───────────────────────────────
  const target = document.getElementById('appHeader');
  if (!target) return;

  target.innerHTML = `
    <header class="header">
      <div class="header-inner">
        <div class="logo" style="cursor:pointer" onclick="location.href='index.html'">
          ELITE<span> BASEBALL</span>
        </div>
        <div id="_headerAuthArea" style="display:flex;gap:8px"></div>
      </div>
    </header>
  `;

  // ── 공통 CSS (아직 없으면 주입) ──────────────────
  if (!document.getElementById('_headerStyle')) {
    const style = document.createElement('style');
    style.id = '_headerStyle';
    style.textContent = `
      .header{position:sticky;top:0;z-index:100;background:rgba(10,12,16,.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,.07);padding:0 16px}
      .header-inner{max-width:480px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between}
      .logo{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px;color:#e8ff47;line-height:1}
      .logo span{color:#f0f2f5}
      ._hbtn{padding:7px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#f0f2f5;font-family:'Noto Sans KR',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s}
      ._hbtn:hover{border-color:#e8ff47;color:#e8ff47}
      ._hbtn.primary{background:#e8ff47;color:#0a0c10;border-color:#e8ff47}
      ._hbtn.primary:hover{background:#d4ea3a}
    `;
    document.head.appendChild(style);
  }

  // ── 로그인 상태 확인 ──────────────────────────────
  const authArea = document.getElementById('_headerAuthArea');

  function renderButtons(session) {
    if (!session) {
      authArea.innerHTML = `
        <button class="_hbtn primary" onclick="location.href='auth.html'">로그인</button>
      `;
    } else {
      authArea.innerHTML = `
        <button class="_hbtn" onclick="location.href='createPlayer.html'">선수정보</button>
        <button class="_hbtn" onclick="_headerLogout()">로그아웃</button>
      `;
    }
  }

  // 로그아웃 함수 전역 노출
  window._headerLogout = async function () {
    try { localStorage.removeItem('baseball_home_cache_v4'); } catch (e) {}
    await window.sb.auth.signOut();
    location.href = 'index.html';
  };

  // 초기 세션 확인
  try {
    const { data, error } = await window.sb.auth.getSession();
    const session = (!error && data?.session) || null;
    renderButtons(session);

    // 세션 변경 감지 (로그인/로그아웃 시 자동 반영)
    window.sb.auth.onAuthStateChange((_event, newSession) => {
      renderButtons(newSession);
    });
  } catch (e) {
    renderButtons(null);
  }
})();
