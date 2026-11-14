/**
 * 《集藏本体论》全站外壳
 * 样式与《易经本体论》保持一致：深空星象 + 朱砂/金
 */
(function(){
  'use strict';

  var TOP_PAGES = [
    { id:'home',     label:'总览',   href:'index.html' },
    { id:'ontology', label:'本体',   href:'ontology.html' },
    { id:'books',    label:'典籍',   href:'books.html' },
    { id:'schools',  label:'流派',   href:'schools.html' },
    { id:'figures',  label:'文人',   href:'figures.html' },
    { id:'imagery',  label:'意象',   href:'imagery.html' },
    { id:'dict',     label:'文论',   href:'dict.html' },
    { id:'timeline', label:'时序',   href:'timeline.html' }
  ];

  var NAV_PAGES = [
    { id:'overview', label:'本体总览',  href:'index.html#overview', icon:'☰' },
    { id:'layers',   label:'七层本体',  href:'index.html#layers',   icon:'七' },
    { id:'graph',    label:'关系图谱',  href:'index.html#graph',    icon:'網' },
    { id:'theory',   label:'文论体系',  href:'dict.html',           icon:'論' },
    { id:'schools',  label:'文学流派',  href:'schools.html',        icon:'派' },
    { id:'authors',  label:'著者人物',  href:'figures.html',        icon:'人' },
    { id:'images',   label:'文学意象',  href:'imagery.html',        icon:'象' },
    { id:'books',    label:'典籍阅读',  href:'books.html',          icon:'籍' },
    { id:'timeline', label:'时序脉络',  href:'timeline.html',       icon:'史' }
  ];

  // 九类分区（替代八卦）
  var CATEGORIES = [
    { id:'bieji',    name:'别集',   cls:'个人著述汇编', sym:'別' },
    { id:'zongji',   name:'总集',   cls:'诗文合集汇编', sym:'總' },
    { id:'wenping',  name:'文评',   cls:'诗文评文论',   sym:'評' },
    { id:'xiaoshuo', name:'小说',   cls:'文言白话小说', sym:'說' },
    { id:'yanyi',    name:'演义',   cls:'历史演义小说', sym:'演' },
    { id:'huaben',   name:'话本',   cls:'话本拟话本',   sym:'話' },
    { id:'baojuan',  name:'宝卷',   cls:'民间说唱宝卷', sym:'卷' },
    { id:'xiaohua',  name:'笑话',   cls:'谐谑笑话集',   sym:'笑' },
    { id:'miyu',     name:'谜语',   cls:'灯谜谜语集',   sym:'謎' }
  ];

  function buildTopbar(active){
    return '<nav class="topbar">' +
      '<a class="logo" href="index.html"><span class="taiji">文</span>' +
        '<span>集藏本体论<small class="en">· JI-CANG ONTOLOGY</small></span></a>' +
      '<button class="menu-toggle" id="menuToggle" aria-label="菜单">☰</button>' +
      '<div class="nav-links" id="navLinks">' +
        TOP_PAGES.map(function(p){
          return '<a href="' + p.href + '" class="' + (active === p.id ? 'active' : '') + '">' + p.label + '</a>';
        }).join('') +
        '<span class="topbar-actions">' +
          '<span class="yj-theme-host"></span>' +
          '<a href="books.html" class="nav-cta">入藏阅读</a>' +
        '</span>' +
      '</div>' +
    '</nav>';
  }

  function buildSidebar(active){
    var catsHtml = CATEGORIES.map(function(c){
      return '<a href="books.html#' + c.id + '">' +
             '<span style="float:right;color:var(--zhu);font-family:serif;">' + c.sym + '</span>' +
             c.name + '<span style="display:block;font-size:11px;color:var(--ink-3);letter-spacing:1px;margin-left:20px;">' + c.cls + '</span></a>';
    }).join('');
    return '<div class="sidebar" id="sidebar">' +
      '<div class="sidebar-section"><div class="sidebar-title">本体导航</div>' +
        NAV_PAGES.map(function(p){
          return '<a href="' + p.href + '" class="' + (active === p.id ? 'on' : '') + '">' +
                 '<span style="margin-right:8px;color:var(--gold);">' + p.icon + '</span>' + p.label + '</a>';
        }).join('') +
      '</div>' +
      '<div class="sidebar-section"><div class="sidebar-title">九类分区</div>' +
        catsHtml +
        '<a href="books.html" style="color:var(--gold);font-size:12px;">进入典籍库 →</a>' +
      '</div>' +
    '</div>';
  }

  function buildFooter(){
    var st = window.JICANG_STATS || {};
    return '<footer class="footer" style="padding:24px;text-align:center;color:var(--ink-3);font-size:13px;border-top:1px solid var(--line);background:var(--space-deep);margin-top:40px;">' +
      '<div style="margin-bottom:6px;letter-spacing:4px;color:var(--ink-2);">集 藏 本 体 论 · JI-CANG ONTOLOGY</div>' +
      '<div style="font-size:11px;opacity:.7;letter-spacing:2px;">本体驱动 · 数字人文 · 文以载道 · ' +
        (st.books||'1669') + '部典籍 ' + (st.authors||'1363') + '位著者 ' + (st.layers||'7') + '层本体 ' + (st.categories||'9') + '类分区</div>' +
    '</footer>';
  }

  function initMobile(){
    var tog = document.getElementById('menuToggle');
    var nav = document.getElementById('navLinks');
    if(tog && nav && !tog.__bound){
      tog.__bound = true;
      tog.addEventListener('click', function(){ nav.classList.toggle('open'); });
    }
    var sb = document.getElementById('sidebar');
    if(window.innerWidth <= 1024 && sb && !document.getElementById('jc-sb-btn')){
      var btn = document.createElement('button');
      btn.id = 'jc-sb-btn';
      btn.textContent = '☰';
      btn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:46px;height:46px;border-radius:50%;background:var(--zhu);color:#fff;border:none;font-size:20px;box-shadow:var(--shadow-lg);z-index:1100;cursor:pointer;';
      btn.addEventListener('click', function(){ sb.classList.toggle('open'); });
      document.body.appendChild(btn);
    }
  }

  window.JC_Link = {
    topbar: buildTopbar,
    sidebar: buildSidebar,
    footer: buildFooter,
    initMobile: initMobile,
    TOP_PAGES: TOP_PAGES,
    CATEGORIES: CATEGORIES
  };
})();
