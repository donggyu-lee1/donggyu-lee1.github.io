"use strict";
(() => {
  const config = window.PERSONAL_ANALYTICS_CONFIG || {};
  const property = config.property || "donggyu-lee1.github.io";
  const apiBase = String(config.apiBase || "").replace(/\/$/, "");
  const el = id => document.getElementById(id);
  const number = value => new Intl.NumberFormat("ko-KR").format(Math.max(0, Number(value) || 0));
  const safeCount = value => Math.max(0, Number(value) || 0);
  const isEvent = hit => hit.event === true || hit.event === 1;
  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
  const preview = isLocal && new URLSearchParams(location.search).get("preview") === "1";
  const state = { authorization: null, range: null, data: null, rows: 8, loading: false, controller: null };
  const koreanCountries = new Intl.DisplayNames(["ko"], { type: "region" });

  function textElement(tag, text, className) {
    const item = document.createElement(tag);
    if (className) item.className = className;
    item.textContent = text;
    return item;
  }
  function notice(message, error = false) {
    el("status").textContent = message || "";
    el("status").className = "notice" + (error ? " error" : "");
    el("status").hidden = !message;
  }
  function koreanDate(date) {
    return new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Seoul",year:"numeric",month:"2-digit",day:"2-digit"}).format(date);
  }
  function addDays(day, amount) {
    const date = new Date(day + "T12:00:00+09:00");
    date.setUTCDate(date.getUTCDate() + amount);
    return koreanDate(date);
  }
  function makeRange(days = 7) {
    const end = koreanDate(new Date());
    return { start: addDays(end, -(days - 1)), end };
  }
  function setRange(range) {
    state.range = range;
    el("date-range").textContent = range.start.replaceAll("-", ".") + " — " + range.end.replaceAll("-", ".") + " · KST";
    el("start-date").value = range.start;
    el("end-date").value = range.end;
    el("start-date").max = koreanDate(new Date());
    el("end-date").max = koreanDate(new Date());
  }
  function query(extra = {}) {
    return new URLSearchParams({start:state.range.start + "T00:00:00+09:00",end:state.range.end + "T23:59:59+09:00",...extra}).toString();
  }
  class APIError extends Error {
    constructor(status) { super("API request failed"); this.status = status; }
  }
  function pause(milliseconds, signal) {
    return new Promise((resolve,reject)=>{
      if(signal?.aborted){reject(new DOMException("Request cancelled","AbortError"));return;}
      const cancel=()=>{clearTimeout(timer);reject(new DOMException("Request cancelled","AbortError"));};
      const timer=setTimeout(()=>{signal?.removeEventListener("abort",cancel);resolve();},milliseconds);
      signal?.addEventListener("abort",cancel,{once:true});
    });
  }
  async function request(route, extra = {}, signal) {
    for(let attempt=0;attempt<3;attempt++){
      const response = await fetch(apiBase + route + "?" + query(extra), {
        method:"GET", headers:{Authorization:state.authorization,Accept:"application/json"},
        credentials:"omit", cache:"no-store", mode:"cors", referrerPolicy:"no-referrer", signal
      });
      if(response.status===429 && attempt<2){
        const retryAfter=response.headers.get("Retry-After");
        const seconds=Number(retryAfter);
        const delay=retryAfter ? (Number.isFinite(seconds)?seconds*1000:Date.parse(retryAfter)-Date.now()) : 1100;
        await pause(Math.max(1100,Math.min(5000,Number.isFinite(delay)?delay:1100)),signal);
        continue;
      }
      if (!response.ok) throw new APIError(response.status);
      const json = await response.json();
      if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error("Unexpected statistics response");
      return json;
    }
  }
  async function requestHits(signal) {
    let hits = [], more = false;
    for (let i = 0; i < 10; i++) {
      const result = await request("/stats/hits", {limit:"100",daily:"true",exclude_paths:hits.map(h=>h.path_id).join(",")}, signal);
      if (result.hits !== null && !Array.isArray(result.hits)) throw new Error("Unexpected page statistics response");
      const known = new Set(hits.map(h=>String(h.path_id)));
      const next = (result.hits || []).filter(h=>!known.has(String(h.path_id)));
      hits.push(...next);
      more = !!result.more;
      if (!more || !next.length) break;
    }
    return { hits, more };
  }
  function errorMessage(error) {
    if (error.status === 401) return "ID 또는 비밀번호를 확인해 주세요.";
    if (error.status === 403) return "접근이 제한되었습니다. KAIST 교내 네트워크 또는 KVPN에 연결한 후 다시 시도해 주세요.";
    if (error.status === 429) return "요청이 잠시 많아졌습니다. 잠시 후 다시 시도해 주세요.";
    return "통계 서버에 연결하지 못했습니다. KVPN 연결과 인터넷 연결을 확인한 후 다시 시도해 주세요.";
  }
  function authenticated(show) {
    el("login-panel").hidden = show;
    el("dashboard").hidden = !show;
    el("refresh").hidden = !show;
    el("logout").hidden = !show || preview;
  }
  async function load() {
    if (state.loading) return;
    if (preview) { state.data = mockData(); render(); authenticated(true); return; }
    if (!state.authorization) return;
    if (!/^https:\/\//.test(apiBase)) { notice("통계 API 설정을 확인해 주세요.",true); return; }
    state.loading = true;
    state.controller = new AbortController();
    const signal = state.controller.signal;
    el("login-submit").disabled = true;
    el("refresh").disabled = true;
    document.body.classList.add("loading");
    notice("통계를 불러오는 중입니다…");
    try {
      // Complete authentication before requesting optional detailed statistics.
      const total = await request("/stats/total", {}, signal);
      if ((total.stats !== null && !Array.isArray(total.stats)) || !Number.isFinite(total.total) || !Number.isFinite(total.total_events)) throw new Error("Unexpected total statistics response");
      if (total.stats === null) total.stats = [];
      const requests = await Promise.allSettled([
        requestHits(signal), request("/stats/toprefs",{limit:"100"},signal),
        request("/stats/browsers",{limit:"100"},signal),request("/stats/locations",{limit:"100"},signal)
      ]);
      if (signal.aborted) return;
      const get = (i, fallback) => requests[i].status === "fulfilled" ? requests[i].value : fallback;
      state.data = {total,hits:get(0,null),referrers:get(1,null),browsers:get(2,null),countries:get(3,null)};
      const denied = requests.find(result=>result.status === "rejected" && [401,403].includes(result.reason.status));
      if (denied) throw denied.reason;
      state.rows = 8;
      render();
      authenticated(true);
      el("password").value = "";
      notice(requests.some(result=>result.status === "rejected") ? "일부 상세 통계를 불러오지 못했습니다. 요약은 확인할 수 있으며 새로고침으로 다시 불러올 수 있습니다." : "");
    } catch (error) {
      if (error.name === "AbortError") return;
      if ([401,403].includes(error.status)) {
        state.authorization = null;
        state.data = null;
        clearRenderedData();
        authenticated(false);
      }
      notice(errorMessage(error),true);
    } finally {
      state.loading = false;
      el("login-submit").disabled = false;
      el("refresh").disabled = false;
      document.body.classList.remove("loading");
    }
  }
  function personalPath(hit) {
    if (!hit.path || typeof hit.path !== "string") return false;
    return hit.path === property || hit.path.startsWith(property + "/");
  }
  function pageHref(hit) {
    if (!personalPath(hit)) return null;
    try {
      const url = new URL("https://" + hit.path);
      return url.hostname === property && !url.username && !url.password ? url.href : null;
    } catch (_) { return null; }
  }
  function pathLabel(path) { return path === property ? "/" : path.slice(property.length) || "/"; }
  function render() {
    const { total, hits } = state.data;
    const views = Math.max(0,total.total - total.total_events);
    el("pageview-count").textContent = number(views);
    el("event-count").textContent = number(total.total_events);
    const pages = hits?.hits.filter(hit=>!isEvent(hit) && personalPath(hit)) || [];
    el("page-count").textContent = hits ? (hits.more ? "≥ " : "") + number(pages.length) : "—";
    el("page-count-note").textContent = hits?.more ? "현재 불러온 페이지 수 · 일부 미포함" : "선택한 기간에 조회된 페이지";
    renderTrend(); renderPages();
    renderRankings("referrers",state.data.referrers,stat=>stat.name && !["(unknown)","unknown"].includes(stat.name) ? stat.name : "직접 방문·미확인");
    renderRankings("countries",state.data.countries,countryName,true);
    renderBrowsers();
    el("updated").textContent = preview ? "가상 예시 데이터 · 실제 방문 기록 없음" : "마지막 조회 " + new Intl.DateTimeFormat("ko-KR",{timeZone:"Asia/Seoul",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date()) + " KST";
  }
  function countryName(stat) {
    const code = String(stat.id || "").toUpperCase();
    if (!/^[A-Z]{2}$/.test(code) || code === "ZZ" || !stat.name || /unknown|미확인/i.test(stat.name)) return "미확인 (IP로 판별 불가)";
    try { return koreanCountries.of(code) || stat.name; } catch (_) { return stat.name; }
  }
  function renderTrend() {
    const holder = el("trend"); holder.replaceChildren();
    if (!state.data.hits || state.data.hits.more) {
      holder.append(textElement("p","추이 표시를 위한 페이지·이벤트 통계를 모두 불러오지 못했습니다.","empty")); return;
    }
    const events = new Map();
    for (const hit of state.data.hits.hits.filter(isEvent)) for (const stat of hit.stats || []) events.set(stat.day,(events.get(stat.day) || 0) + safeCount(stat.daily));
    const dailyTotals = new Map(state.data.total.stats.map(stat=>[stat.day,safeCount(stat.daily)]));
    const days = [];
    for (let day = state.range.start; day <= state.range.end && days.length < 367; day = addDays(day,1)) {
      const event = events.get(day) || 0;
      days.push({day,event,views:Math.max(0,(dailyTotals.get(day) || 0)-event)});
    }
    const maxValue = Math.max(...days.map(day=>Math.max(day.views,day.event)),1);
    const ceiling = maxValue <= 5 ? 5 : Math.ceil(maxValue/5)*5;
    const scale = textElement("div","","chart-scale");
    for (const portion of [1,.5,0]) { const value = textElement("span",number(ceiling*portion)); value.style.top = (1-portion)*100 + "%"; scale.append(value); }
    holder.append(scale);
    const plot = textElement("div","","chart-plot");
    const grid = textElement("div","","chart-grid");
    for (const portion of [0,.5,1]) { const line = textElement("i",""); line.style.top=(portion*100)+"%"; grid.append(line); } plot.append(grid);
    const spacing = days.length > 14 ? Math.ceil(days.length/7) : days.length > 8 ? 2 : 1;
    days.forEach((day,index)=>{
      const button = textElement("button","","chart-day"); button.type="button";
      button.setAttribute("aria-label",`${day.day}, 페이지 조회 ${number(day.views)}, 링크 클릭 ${number(day.event)}`);
      const view = textElement("i","","chart-bar"); view.style.height=(day.views/ceiling*100)+"%";
      const event = textElement("i","","chart-bar event"); event.style.height=(day.event/ceiling*100)+"%";
      if (!day.views) view.style.minHeight="0";
      if (!day.event) event.style.minHeight="0";
      button.append(view,event);
      if(index % spacing === 0 || index === days.length-1) button.append(textElement("span",day.day.slice(5).replace("-","/"),"chart-date"));
      const tip = textElement("span","","chart-tip");tip.append(textElement("strong",day.day));tip.append(textElement("div","페이지 조회  " + number(day.views)),textElement("div","링크 클릭  " + number(day.event)));button.append(tip);
      plot.append(button);
    });
    holder.append(plot);
  }
  function renderPages() {
    const body = el("pages-body");body.replaceChildren();
    if(!state.data.hits){el("pages-empty").textContent="페이지 통계를 불러오지 못했습니다.";el("pages-empty").hidden=false;el("show-pages").hidden=true;return;}
    const search = el("page-search").value.trim().toLocaleLowerCase();
    const pages = state.data.hits.hits.filter(hit=>!isEvent(hit) && personalPath(hit) && (!search || (hit.path+" "+hit.title).toLocaleLowerCase().includes(search))).sort((a,b)=>safeCount(b.count)-safeCount(a.count));
    const total = Math.max(0,state.data.total.total-state.data.total.total_events);
    for (const hit of pages.slice(0,state.rows)) {
      const row = document.createElement("tr"),name = document.createElement("td"),count=document.createElement("td"),percent=document.createElement("td");
      const href = pageHref(hit);
      const title = textElement(href ? "a":"span",hit.title || pathLabel(hit.path),"page-name");
      title.title=hit.title || pathLabel(hit.path);
      if(href){title.href=href;title.target="_blank";title.rel="noopener noreferrer";}
      name.append(title,textElement("span",pathLabel(hit.path),"page-path"));count.textContent=number(hit.count);
      const ratio=total ? Math.min(100,safeCount(hit.count)/total*100) : 0;
      const cell=textElement("span","","percent-cell"),bar=textElement("span","","percent-bar"),fill=document.createElement("i");fill.style.width=ratio+"%";bar.append(fill);cell.append(bar,textElement("span",ratio.toFixed(0)+"%"));percent.append(cell);row.append(name,count,percent);body.append(row);
    }
    el("pages-empty").textContent=search?"검색 조건에 맞는 페이지가 없습니다.":"이 기간에 기록된 페이지 조회가 없습니다.";
    el("pages-empty").hidden=pages.length>0;
    el("show-pages").hidden=pages.length<=state.rows;
    el("show-pages").textContent=`페이지 더 보기 (${number(Math.max(0,pages.length-state.rows))}개)`;
  }
  function renderRankings(id,data,label,countries=false) {
    const holder=el(id);holder.replaceChildren();
    if(!data){holder.append(textElement("p","상세 통계를 불러오지 못했습니다.","empty"));return;}
    const stats=Array.isArray(data.stats)?data.stats:[];
    if(!stats.length){holder.append(textElement("p","이 기간에 기록된 데이터가 없습니다.","empty"));return;}
    const denominator=safeCount(state.data.total.total_utc);
    for(const stat of stats.slice(0,6)){
      const row=textElement("div","","ranking"),heading=textElement("div","","ranking-heading"),name=textElement("span","","ranking-name"),count=textElement("span",number(stat.count),"ranking-count");
      const text=label(stat);name.title=text;
      if(countries && /^[A-Z]{2}$/.test(String(stat.id)) && stat.id!=="ZZ" && !text.startsWith("미확인")){const flag=String(stat.id).split("").map(char=>String.fromCodePoint(127397+char.charCodeAt(0))).join("");name.append(textElement("span",flag));}
      name.append(textElement("span",text));const ratio=denominator?Math.min(100,safeCount(stat.count)/denominator*100):0;count.append(textElement("span",ratio.toFixed(0)+"%"));heading.append(name,count);const track=textElement("div","","ranking-track"),fill=document.createElement("i");fill.style.width=ratio+"%";track.append(fill);row.append(heading,track);holder.append(row);
    }
    if(stats.length>6 || data.more)holder.append(textElement("p","상위 6개 표시 · 비중은 UTC 집계 조회 기준","data-footnote"));
    else holder.append(textElement("p","비중은 UTC 집계 조회 기준","data-footnote"));
  }
  function renderBrowsers() {
    const holder=el("browsers");holder.replaceChildren();
    if(!state.data.browsers){holder.append(textElement("p","브라우저 통계를 불러오지 못했습니다.","empty"));return;}
    const stats=state.data.browsers.stats||[];
    if(!stats.length){holder.append(textElement("p","이 기간에 기록된 데이터가 없습니다.","empty"));return;}
    for(const stat of stats.slice(0,8)){const chip=textElement("div","","browser-chip");chip.append(textElement("span",stat.name || "미확인"),textElement("strong",number(stat.count)));holder.append(chip);}
    holder.append(textElement("p","UTC 일별 집계 기준","data-footnote"));
  }
  function clearRenderedData() {
    for(const id of ["pageview-count","page-count","event-count"])el(id).textContent="—";
    for(const id of ["trend","pages-body","referrers","countries","browsers"])el(id).replaceChildren();
    el("updated").textContent="";el("page-search").value="";
  }
  function mockData() {
    const dayNumbers=[13,18,10,24,36,20,29],days=[];
    for(let day=state.range.start;day<=state.range.end && days.length<367;day=addDays(day,1))days.push(day);
    const stats=days.map((day,i)=>({day,daily:dayNumbers[i%7]+(i%3),hourly:[]}));
    const eventStats=days.map((day,i)=>({day,daily:i%3,hourly:[]}));
    const eventCount=eventStats.reduce((sum,d)=>sum+d.daily,0), total=stats.reduce((sum,d)=>sum+d.daily,0), pageTotal=total-eventCount;
    const names=["Donggyu Lee · Research","Research","EconCausal: Evaluating Causal Reasoning","Publications","Curriculum Vitae","About","COLM Research Project","Contact","Notes"];
    const paths=["/","/research/","/research/econcausal/","/publications/","/cv/","/about/","/research/colm/","/contact/","/notes/"];
    const weights=[.28,.23,.16,.11,.07,.05,.04,.03,.03];let allocated=0;
    const hits=names.map((title,i)=>{const count=i===names.length-1?pageTotal-allocated:Math.floor(pageTotal*weights[i]);allocated+=count;return {path_id:i+1,path:property+paths[i],title,event:false,count,stats:[]};});
    hits.push({path_id:10,path:"link:pdf:"+property+"/research/",title:"PDF link",event:true,count:eventCount,stats:eventStats});
    return {total:{total,total_events:eventCount,total_utc:total,stats},hits:{hits,more:false},referrers:{stats:[{name:"Google",count:Math.round(total*.42)},{name:"직접 방문·미확인",count:Math.round(total*.28)},{name:"github.com",count:Math.round(total*.17)},{name:"scholar.google.com",count:Math.round(total*.13)}],more:false},countries:{stats:[{id:"KR",name:"South Korea",count:Math.round(total*.54)},{id:"US",name:"United States",count:Math.round(total*.29)},{id:"DE",name:"Germany",count:Math.round(total*.10)},{id:"",name:"(unknown)",count:Math.round(total*.07)}],more:false},browsers:{stats:[{name:"Chrome",count:Math.round(total*.58)},{name:"Safari",count:Math.round(total*.25)},{name:"Firefox",count:Math.round(total*.12)},{name:"Edge",count:Math.round(total*.05)}],more:false}};
  }

  el("login-form").addEventListener("submit",async event=>{
    event.preventDefault();
    const username=el("username").value.trim(),password=el("password").value;
    if(!username || !password)return;
    const bytes=new TextEncoder().encode(username+":"+password);
    state.authorization="Basic "+btoa(Array.from(bytes,byte=>String.fromCharCode(byte)).join(""));
    await load();
  });
  el("logout").addEventListener("click",()=>{state.controller?.abort();state.authorization=null;state.data=null;el("password").value="";clearRenderedData();authenticated(false);notice("");el("username").focus();});
  el("refresh").addEventListener("click",load);
  document.querySelectorAll("[data-period]").forEach(button=>button.addEventListener("click",()=>{
    if(state.loading)return;
    const period=button.dataset.period;
    document.querySelectorAll("[data-period]").forEach(item=>{item.classList.toggle("selected",item===button);item.setAttribute("aria-pressed",String(item===button));});
    el("custom-range").hidden=period!=="custom";
    if(period!=="custom"){setRange(makeRange(Number(period)));load();}
  }));
  el("custom-range").addEventListener("submit",event=>{
    event.preventDefault();const start=el("start-date").value,end=el("end-date").value;
    const duration=(new Date(end+"T12:00:00+09:00")-new Date(start+"T12:00:00+09:00"))/86400000;
    if(!start || !end || start>end || end>koreanDate(new Date()) || duration>365){notice("시작일과 종료일을 확인해 주세요. 최대 366일 범위에서 조회할 수 있습니다.",true);return;}
    setRange({start,end});load();
  });
  el("page-search").addEventListener("input",()=>{if(state.data){state.rows=8;renderPages();}});
  el("show-pages").addEventListener("click",()=>{state.rows+=20;renderPages();});
  window.addEventListener("pagehide",()=>{state.controller?.abort();state.authorization=null;state.data=null;el("password").value="";clearRenderedData();authenticated(false);});
  window.addEventListener("pageshow",event=>{if(event.persisted && !preview){state.authorization=null;state.data=null;clearRenderedData();authenticated(false);notice("");}});
  setRange(makeRange(7));
  if(config.geodbAttribution){
    const {label,url}=config.geodbAttribution;
    if(typeof label==="string" && typeof url==="string" && url.startsWith("https://"))for(const id of ["geodb-attribution","country-attribution"]){const link=textElement("a",label);link.href=url;link.target="_blank";link.rel="noopener noreferrer";el(id).append(link);el(id).hidden=false;}
  }
  if(preview){el("preview-notice").hidden=false;load();}
})();
