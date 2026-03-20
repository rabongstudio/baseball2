document.addEventListener('DOMContentLoaded', async function () {

  // ── 헤더 삽입 ────────────────────────────────────
  const target = document.getElementById('appHeader');
  if (!target) return;

  // data-back        : 뒤로가기 링크 (없으면 버튼 미표시)
  // data-back-label  : 뒤로가기 텍스트 (기본값 "← 홈")
  // data-auth="true" : 로그인/선수정보/로그아웃 버튼 표시 (index.html 전용)
  const backHref  = target.dataset.back || '';
  const backLabel = target.dataset.backLabel || '← 홈';
  const showAuth  = target.dataset.auth === 'true';

  const backBtn = backHref
    ? `<a href="${backHref}" class="_hbtn">${backLabel}</a>`
    : '';

  target.innerHTML = `
    <header style="position:sticky;top:0;z-index:100;background:rgba(10,12,16,.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,.07);padding:0 16px">
      <div style="max-width:480px;margin:0 auto;height:56px;display:flex;align-items:center;justify-content:space-between">
        <div onclick="location.href='index.html'" style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px;color:#e8ff47;line-height:1;cursor:pointer">
          ELITE<span style="color:#f0f2f5"> BASEBALL</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          ${backBtn}
          <div id="_headerAuthArea"></div>
        </div>
      </div>
    </header>
  `;

  // ── 공통 스타일 ──────────────────────────────────
  if (!document.getElementById('_headerStyle')) {
    const style = document.createElement('style');
    style.id = '_headerStyle';
    style.textContent = `
      ._hbtn{padding:5px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:transparent;color:#f0f2f5;font-family:'Noto Sans KR',sans-serif;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;transition:all .15s}
      ._hbtn:hover{border-color:#e8ff47;color:#e8ff47}
      ._hbtn.primary{background:#e8ff47;color:#0a0c10;border-color:#e8ff47}
      ._hbtn.primary:hover{background:#d4ea3a}
    `;
    document.head.appendChild(style);
  }

  const authArea = document.getElementById('_headerAuthArea');

  function renderButtons(session) {
    window._headerSession = session || null;

    if (!showAuth) {
      authArea.innerHTML = '';
      return;
    }

    if (!session) {
      authArea.innerHTML = `<button class="_hbtn primary" onclick="location.href='auth.html'">로그인</button>`;
    } else {
      authArea.innerHTML = `
        <button class="_hbtn" onclick="location.href='createPlayer.html'">선수정보</button>
        <button class="_hbtn" onclick="_headerLogout()">로그아웃</button>
      `;
    }
  }

  window._headerLogout = async function () {
    try { localStorage.removeItem('baseball_home_cache_v4'); } catch (e) {}
    await window.sb.auth.signOut();
    location.href = 'index.html';
  };

  try {
    const { data, error } = await window.sb.auth.getSession();
    const session = (!error && data?.session) || null;
    renderButtons(session);

    window.sb.auth.onAuthStateChange((_event, newSession) => {
      renderButtons(newSession);
    });
  } catch (e) {
    renderButtons(null);
  }

});
