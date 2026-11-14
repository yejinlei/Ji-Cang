/**
 * 集藏本体论 TBox Schema v3.0.0
 * 四轴 × 七层正交本体
 * 参考范式：佛学本体论 TBox v3.0.0
 *
 * 四轴：
 *   A1 文体典要轴：经史子集 → 九流十家 → 文体（诗/文/词/曲/小说/戏曲…）→ 流派 → 体例 → 版本
 *   A2 义理意象轴：文道 → 文论 → 意象 → 文体范畴 → 技法 → 章法 → 句/字/韵
 *   A3 人物传承轴：圣王/圣贤 → 宗师/大家 → 名家/作家 → 评点家/注家 → 学者/读者 → 民艺人物
 *   A4 时代事件轴：朝代 → 文运/党争/结社/科举/出版 → 交游/雅集/唱和 → 创作/成书/刊刻/流传
 *
 * 七层：
 *   L0 元模型层  （轴/层/类/属性/关系/实例）
 *   L1 文道本体层 （道/气/理/文/言/意/象/情/性/才/学/识）
 *   L2 文论范畴层（文体/文法/文气/文心/神思/风骨/滋味/意境/格调/神韵/肌理/性灵）
 *   L3 流派体系层（诸子百家 → 汉魏风骨 → 唐宋八家 → 江西诗派 → 桐城派 → 同光体…）
 *   L4 文本载体层（典籍 → 别集/总集/选集/诗文评/小说/话本/演义/宝卷/笑话/谜语 → 卷/篇/章/回/则 → 段/句/字）
 *   L5 人物传承层（圣王圣贤 → 宗师 → 大家 → 名家 → 注家评点家 → 学者；师徒/交游/姻亲/同社/同年/同僚）
 *   L6 文化外延层（民间文学/俗文学/说唱/戏曲/宝卷/谶纬；意象/典故/民俗；刻本/版本流传域外）
 */

const JICANG_TBOX = {
  version: "3.0.0",
  name: "集藏本体论 (JiCang Ontology)",
  description: "中国古典文学集部本体论，四轴×七层正交架构，TBox/ABox分离",

  // ─────────── 四轴 ───────────
  axes: [
    { id: "A1", name: "文体典要轴", en: "Genre Axis",
      desc: "横向分类轴：九流十家 → 文体（诗/文/词/曲/小说…）→ 流派 → 体例 → 版本。回答「这部书属于哪一类、何体例」。",
      color: "#8B2500", cls: 24 },
    { id: "A2", name: "义理意象轴", en: "Imagery & Theory Axis",
      desc: "纵向内容轴：文道 → 文论 → 意象 → 文体范畴 → 技法 → 章法 → 句/字/韵。回答「写什么、怎么写、以何意趣」。",
      color: "#B8860B", cls: 24 },
    { id: "A3", name: "人物传承轴", en: "Figure Lineage Axis",
      desc: "人物传承轴：圣贤 → 宗师 → 大家 → 名家 → 评点家/注家 → 民艺人物。回答「谁写、谁传、谁评」。",
      color: "#2F4F4F", cls: 16 },
    { id: "A4", name: "时代事件轴", en: "Era & Event Axis",
      desc: "事件缘起轴：朝代 → 文运/党争/结社/科举/出版 → 交游/雅集/唱和 → 创作/成书/刊刻/流传。回答「何时、何缘、何背景」。",
      color: "#5C4033", cls: 13 }
  ],

  // ─────────── 七层 ───────────
  layers: [
    { id: "L0", name: "元模型层", abstract: 6,
      desc: "描述本体所用的元语言：轴、层、类、属性、关系、实例。", cls: 7 },
    { id: "L1", name: "文道本体层", abstract: 5,
      desc: "中国文学最顶层的形而上学核心概念（道、气、理、文、言、意、象、情、性、才、学、识）。", cls: 1 },
    { id: "L2", name: "文论范畴层", abstract: 4,
      desc: "文论核心范畴（风骨、神思、滋味、意境、格调、神韵、性灵、肌理；诗言志、文以载道…）。", cls: 1 },
    { id: "L3", name: "流派体系层", abstract: 3,
      desc: "诸子百家、时代风气、文学流派、文社、以及体例（乐府/古体/近体/词/曲/话本/演义…）。", cls: 12 },
    { id: "L4", name: "文本载体层", abstract: 2,
      desc: "典籍（别集/总集/选集/诗文评/小说/话本/演义/宝卷/笑话/谜语）→ 卷/篇/章/回/则 → 段/句/字/韵。版本、注疏、选本。", cls: 26 },
    { id: "L5", name: "人物传承层", abstract: 1,
      desc: "圣王圣贤、宗师、大家、名家、注家/评点家/选家、学者/读者；师徒、交游、姻亲、同社、同年、同僚。", cls: 8 },
    { id: "L6", name: "文化外延层", abstract: 0,
      desc: "俗文学（宝卷/说唱/笑话/谜语/弹词/戏曲）、民俗意象、域外流传、刻本/雕版/书坊/出版文化。", cls: 4 }
  ],

  // ─────────── 类体系（Class Hierarchy）───────────
  classes: [
    // L0 元模型
    { id: "jc:Entity",        label: "本体元素",      axes: ["A1","A2","A3","A4"], layer: "L0", parent: null },
    { id: "jc:Axis",          label: "轴",            axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },
    { id: "jc:Layer",         label: "层",            axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },
    { id: "jc:OntologyClass", label: "类",            axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },
    { id: "jc:DatatypeProperty", label: "数据属性",    axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },
    { id: "jc:ObjectProperty", label: "关系谓词",      axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },
    { id: "jc:Individual",    label: "个体",          axes: ["A1","A2","A3","A4"], layer: "L0", parent: "jc:Entity" },

    // L1 文道本体
    { id: "jc:WenDao",        label: "文道核心概念",  axes: ["A2"], layer: "L1", parent: "jc:Entity" },

    // L2 文论范畴
    { id: "jc:WenLun",        label: "文论范畴",      axes: ["A2"], layer: "L2", parent: "jc:Entity" },

    // L3 流派/体系/体例
    { id: "jc:SchoolOfThought", label: "诸子百家流派", axes: ["A1"], layer: "L3", parent: "jc:Entity", tag: "sect" },
    { id: "jc:LiterarySchool", label: "文学流派",     axes: ["A1"], layer: "L3", parent: "jc:Entity", tag: "sect" },
    { id: "jc:LiterarySociety", label: "文社/结社",   axes: ["A1","A3"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:Style",         label: "文体体例",      axes: ["A1"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:DynastyStyle",  label: "时代文风",      axes: ["A1","A4"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:Form",          label: "体裁/诗体/词牌/曲牌", axes: ["A1"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:ThemeMotif",    label: "题材母题",      axes: ["A2"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:Technique",     label: "文法技法",      axes: ["A2"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:Imagery",       label: "意象",          axes: ["A2"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:Allusion",      label: "典故",          axes: ["A2"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:ImageCategory", label: "意象类属",      axes: ["A2"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:PoetryTalk",    label: "诗话/文论作品", axes: ["A2"], layer: "L3", parent: "jc:Entity" },

    // L4 文本载体
    { id: "jc:SiKuChuJi",     label: "四库分类",      axes: ["A1"], layer: "L4", parent: "jc:Entity" },
    { id: "jc:JiBu",          label: "集部",          axes: ["A1"], layer: "L4", parent: "jc:SiKuChuJi" },
    // ── 九类集藏主类 ──
    { id: "jc:BieJi",         label: "别集",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"bieji" },
    { id: "jc:ZongJi",        label: "总集",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"zongji" },
    { id: "jc:ShiWenPing",    label: "诗文评",        axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"wenping" },
    { id: "jc:CiQu",          label: "词曲",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"ciqu" },
    { id: "jc:Novel",         label: "小说",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"xiaoshuo" },
    { id: "jc:YanYi",         label: "演义",          axes: ["A1"], layer: "L4", parent: "jc:Novel", code:"yanyi" },
    { id: "jc:HuaBen",        label: "话本",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"huaben" },
    { id: "jc:BaoJuan",       label: "宝卷",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"baojuan" },
    { id: "jc:XiaoHua",       label: "笑话",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"xiaohua" },
    { id: "jc:MiYu",          label: "谜语",          axes: ["A1"], layer: "L4", parent: "jc:JiBu", code:"miyu" },
    { id: "jc:Anthology",     label: "选本/评点本",   axes: ["A1"], layer: "L4", parent: "jc:JiBu" },

    // ── B1 别集专属子类：诗词赋分体、编年、应酬纪行题材 ──
    { id: "jc:BieJiShi",      label: "别集·诗卷",    axes: ["A1","A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiCi",       label: "别集·词卷",    axes: ["A1","A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiFu",       label: "别集·赋卷",    axes: ["A1","A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiWen",      label: "别集·文卷",    axes: ["A1","A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiAn",       label: "别集·应酬诗",  axes: ["A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiXingLv",   label: "别集·纪行诗",  axes: ["A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiYongWu",   label: "别集·咏物诗",  axes: ["A2"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiBianNian", label: "别集·编年体",  axes: ["A1"], layer: "L4", parent: "jc:BieJi" },
    { id: "jc:BieJiFenTi",    label: "别集·分分体",  axes: ["A1"], layer: "L4", parent: "jc:BieJi" },

    // ── B2 总集专属子类：选录标准、断代范围 ──
    { id: "jc:ZongJiDai",     label: "总集·通代",    axes: ["A1","A4"], layer: "L4", parent: "jc:ZongJi" },
    { id: "jc:ZongJiDuanDai", label: "总集·断代",    axes: ["A1","A4"], layer: "L4", parent: "jc:ZongJi" },
    { id: "jc:ZongJiDiFang",  label: "总集·地方",    axes: ["A1"], layer: "L4", parent: "jc:ZongJi" },
    { id: "jc:ZongJiZongLei", label: "总集·总类",    axes: ["A1"], layer: "L4", parent: "jc:ZongJi" },
    { id: "jc:ZongJiTiCai",   label: "总集·按体",    axes: ["A1"], layer: "L4", parent: "jc:ZongJi" },

    // ── B3 诗文评专属子类：诗话/文话/评点 ──
    { id: "jc:ShiHua",        label: "诗话",          axes: ["A1","A2"], layer: "L4", parent: "jc:ShiWenPing" },
    { id: "jc:WenHua",        label: "文话",          axes: ["A1","A2"], layer: "L4", parent: "jc:ShiWenPing" },
    { id: "jc:CiHua",         label: "词话",          axes: ["A1","A2"], layer: "L4", parent: "jc:ShiWenPing" },
    { id: "jc:ShiFa",         label: "诗法/诗格",    axes: ["A2"], layer: "L4", parent: "jc:ShiWenPing" },
    { id: "jc:WenPingDian",   label: "评点本",        axes: ["A2","A3"], layer: "L4", parent: "jc:ShiWenPing" },

    // ── B4 小说专属子类：章回/笔记/世情/神魔/侠义 ──
    { id: "jc:ZhangHui",      label: "章回体小说",    axes: ["A1"], layer: "L4", parent: "jc:Novel" },
    { id: "jc:BiJiXiaoShuo",  label: "笔记小说",      axes: ["A1"], layer: "L4", parent: "jc:Novel" },
    { id: "jc:WenYanXiaoShuo",label: "文言小说",      axes: ["A1"], layer: "L4", parent: "jc:Novel" },
    { id: "jc:BaiHuaXiaoShuo",label: "白话小说",      axes: ["A1"], layer: "L4", parent: "jc:Novel" },
    { id: "jc:ShiQing",       label: "世情小说",      axes: ["A2"], layer: "L4", parent: "jc:ZhangHui" },
    { id: "jc:ShenMo",        label: "神魔小说",      axes: ["A2"], layer: "L4", parent: "jc:ZhangHui" },
    { id: "jc:XiaYi",         label: "侠义小说",      axes: ["A2"], layer: "L4", parent: "jc:ZhangHui" },
    { id: "jc:YanYiShi",      label: "历史演义",      axes: ["A2"], layer: "L4", parent: "jc:YanYi" },
    { id: "jc:HuiMu",         label: "回目",          axes: ["A1","A2"], layer: "L4", parent: "jc:ZhangHui" },

    // ── B5 话本专属子类：入话正话、说书体制 ──
    { id: "jc:RuHua",         label: "入话/头回",     axes: ["A2"], layer: "L4", parent: "jc:HuaBen" },
    { id: "jc:ZhengHua",      label: "正话",          axes: ["A2"], layer: "L4", parent: "jc:HuaBen" },
    { id: "jc:HuaBenJieWei",  label: "结尾/散场诗",  axes: ["A2"], layer: "L4", parent: "jc:HuaBen" },
    { id: "jc:NiHuaBen",      label: "拟话本",        axes: ["A1"], layer: "L4", parent: "jc:HuaBen" },

    // ── B6 宝卷专属子类：品/分、科仪、教派 ──
    { id: "jc:BaoJuanPin",    label: "品/分",         axes: ["A1"], layer: "L4", parent: "jc:BaoJuan" },
    { id: "jc:BaoJuanKeYi",   label: "科仪/仪式卷",  axes: ["A2"], layer: "L4", parent: "jc:BaoJuan" },
    { id: "jc:BaoJuanJiaoPai",label: "教派宝卷",      axes: ["A2"], layer: "L4", parent: "jc:BaoJuan" },
    { id: "jc:BaoJuanSuJiang",label: "俗讲宝卷",      axes: ["A2"], layer: "L4", parent: "jc:BaoJuan" },
    { id: "jc:XuanJuan",      label: "宣卷场合",      axes: ["A2","A4"], layer: "L4", parent: "jc:BaoJuan" },

    // ── B7 笑话专属子类：集本体例 ──
    { id: "jc:XiaoHuaTi",     label: "笑话集·题解",  axes: ["A2"], layer: "L4", parent: "jc:XiaoHua" },
    { id: "jc:XiaoHuaTiao",   label: "笑话条目",      axes: ["A2"], layer: "L4", parent: "jc:XiaoHua" },
    { id: "jc:YouLuXiaoHua",  label: "语录体笑话",    axes: ["A1"], layer: "L4", parent: "jc:XiaoHua" },
    { id: "jc:XiaoFuXiaoHua", label: "笑赋/俳谐文",  axes: ["A1"], layer: "L4", parent: "jc:XiaoHua" },

    // ── B8 谜语专属子类：谜面谜底谜格谜目 ──
    { id: "jc:MiMian",        label: "谜面",          axes: ["A2"], layer: "L4", parent: "jc:MiYu" },
    { id: "jc:MiDi",          label: "谜底",          axes: ["A2"], layer: "L4", parent: "jc:MiYu" },
    { id: "jc:MiGe",          label: "谜格",          axes: ["A2"], layer: "L4", parent: "jc:MiYu" },
    { id: "jc:MiMu",          label: "谜目",          axes: ["A2"], layer: "L4", parent: "jc:MiYu" },
    { id: "jc:DengMi",        label: "灯谜",          axes: ["A2"], layer: "L4", parent: "jc:MiYu" },
    { id: "jc:Text",          label: "典籍/作品",     axes: ["A2"], layer: "L4", parent: "jc:Entity" },
    { id: "jc:Commentary",    label: "注/疏/评点/笺", axes: ["A2"], layer: "L4", parent: "jc:Text" },
    { id: "jc:Edition",       label: "版本/刻本",     axes: ["A1"], layer: "L4", parent: "jc:Entity" },
    { id: "jc:Juan",          label: "卷/篇/回/则",   axes: ["A2"], layer: "L4", parent: "jc:Text" },
    { id: "jc:Chapter",       label: "章/节",         axes: ["A2"], layer: "L4", parent: "jc:Juan" },
    { id: "jc:Paragraph",     label: "段",            axes: ["A2"], layer: "L4", parent: "jc:Chapter" },
    { id: "jc:Sentence",      label: "句/韵",         axes: ["A2"], layer: "L4", parent: "jc:Paragraph" },
    { id: "jc:Character",     label: "字/词",         axes: ["A2"], layer: "L4", parent: "jc:Sentence" },
    { id: "jc:Preface",       label: "序/跋/题辞",    axes: ["A2"], layer: "L4", parent: "jc:Text" },
    { id: "jc:Compiler",      label: "编者/选家",     axes: ["A1","A4"], layer: "L4", parent: "jc:Entity" },
    { id: "jc:Publisher",     label: "书坊/刻家",     axes: ["A1","A4"], layer: "L4", parent: "jc:Entity" },
    { id: "jc:PrintingEra",   label: "刊刻时代",      axes: ["A1"], layer: "L4", parent: "jc:Entity" },

    // L5 人物
    { id: "jc:Person",        label: "人物",          axes: ["A3"], layer: "L5", parent: "jc:Entity" },
    { id: "jc:SageKing",      label: "圣王/圣贤",     axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:Master",        label: "宗师/文坛宗匠", axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:GreatWriter",   label: "大家/名家",     axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:Writer",        label: "作家/文人",     axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:Critic",        label: "评点家/文论家", axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:Commentator",   label: "注家/笺疏家",   axes: ["A3"], layer: "L5", parent: "jc:Person" },
    { id: "jc:Scholar",       label: "学者/读者",     axes: ["A3"], layer: "L5", parent: "jc:Person" },

    // L6 文化外延
    { id: "jc:FolkLiterature", label: "俗文学/说唱",  axes: ["A1"], layer: "L6", parent: "jc:Entity" },
    { id: "jc:FolkFigure",    label: "民间传说人物",  axes: ["A3"], layer: "L6", parent: "jc:Person" },
    { id: "jc:CulturalElement", label: "文化外延元素", axes: ["A1"], layer: "L6", parent: "jc:Entity" },
    { id: "jc:SpreadEvent",   label: "域外流传",      axes: ["A4"], layer: "L6", parent: "jc:Entity" },

    // L3/L4 事件轴
    { id: "jc:Event",         label: "事件",          axes: ["A4"], layer: "L3", parent: "jc:Entity" },
    { id: "jc:EraEvent",      label: "朝代/文运事件", axes: ["A4"], layer: "L3", parent: "jc:Event" },
    { id: "jc:GatheringEvent", label: "雅集/唱和事件",axes: ["A4"], layer: "L3", parent: "jc:Event" },
    { id: "jc:CreationEvent", label: "创作/成书事件", axes: ["A4"], layer: "L3", parent: "jc:Event" },
    { id: "jc:PublicEvent",   label: "刊刻/出版事件", axes: ["A4"], layer: "L3", parent: "jc:Event" },
    { id: "jc:ReceptionEvent",label: "评点/流传事件", axes: ["A4"], layer: "L3", parent: "jc:Event" }
  ],

  // ─────────── 对象属性（关系谓词）───────────
  objectProperties: [
    // === A1 文体分类关系类 ===
    { id: "belongs_to_category", name: "属类别",   axis: "A1",
      domain: "jc:Text", range: "jc:JiBu",
      desc: "A 典籍归属于集部下某一类别（别集/总集/小说/话本…）。",
      inverse: "contains_text" },
    { id: "part_of", name: "部分属于", axis: "A1",
      domain: "jc:Juan/jc:Chapter", range: "jc:Text/jc:Juan",
      desc: "卷/章属于某作品或更大结构。",
      aliases: ["shuyu"], inverse: "has_part" },
    { id: "of_style", name: "属文体", axis: "A1",
      domain: "jc:Text", range: "jc:Style",
      desc: "典籍属于某一文体体例（诗/文/词/曲/赋/小说…）。" },
    { id: "of_form", name: "属体裁", axis: "A1",
      domain: "jc:Text", range: "jc:Form",
      desc: "作品属于具体体裁（乐府/古体/近体/绝句/律诗/词牌/曲牌/章回/笔记…）。" },
    { id: "of_dynasty_style", name: "属时代文风", axis: "A1",
      domain: "jc:Text/jc:Person", range: "jc:DynastyStyle",
      desc: "作品/作家属于某时代文风（建安风骨/盛唐气象/宋调/明文秦汉…）。" },
    { id: "belongs_to_school", name: "属流派", axis: "A1",
      domain: "jc:Person/jc:Text", range: "jc:LiterarySchool",
      desc: "作家/作品归属某文学流派（江西诗派/桐城派/唐宋派/竟陵派…）。" },
    { id: "based_on_edition", name: "据版本", axis: "A1",
      domain: "jc:Text", range: "jc:Edition",
      desc: "A 作品所据底本为某刻本/版本（宋刻/元刻/汲古阁/四库本…）。" },
    { id: "variant_of", name: "异文/版本对", axis: "A1",
      domain: "jc:Text", range: "jc:Text",
      desc: "A 与 B 为同一作品之不同版本/异文。", symmetric: true },
    { id: "anthologized_in", name: "收入选本", axis: "A1",
      domain: "jc:Text", range: "jc:Anthology",
      desc: "单篇作品被收入某选本（文选/唐诗三百首/古文观止…）。",
      inverse: "anthologizes" },
    { id: "printed_in", name: "刊于", axis: "A1",
      domain: "jc:Edition", range: "jc:PrintingEra",
      desc: "某版本刊刻于某时代。" },

    // === A2 义理内容/文本结构关系类 ===
    { id: "expounds_concept", name: "阐发", axis: "A2",
      domain: "jc:Text/jc:Paragraph", range: "jc:WenDao/jc:WenLun",
      desc: "A 文本/段落阐发某一文道/文论概念。",
      inverse: "expounded_in" },
    { id: "uses_imagery", name: "用意象", axis: "A2",
      domain: "jc:Sentence/jc:Paragraph/jc:Text", range: "jc:Imagery",
      desc: "句/段/篇中使用某意象。", inverse: "imagery_in" },
    { id: "alludes_to", name: "用典", axis: "A2",
      domain: "jc:Sentence/jc:Paragraph", range: "jc:Allusion",
      desc: "句段使用某典故。" },
    { id: "employs_technique", name: "用技法", axis: "A2",
      domain: "jc:Text/jc:Paragraph", range: "jc:Technique",
      desc: "作品/段落运用某文法技法（比兴/用事/对仗/声律…）。" },
    { id: "has_juan", name: "含卷", axis: "A2",
      domain: "jc:Text", range: "jc:Juan", desc: "作品包含若干卷/篇/回/则。" },
    { id: "has_chapter", name: "含章", axis: "A2",
      domain: "jc:Juan", range: "jc:Chapter", desc: "卷包含章/节。" },
    { id: "has_paragraph", name: "含段", axis: "A2",
      domain: "jc:Chapter", range: "jc:Paragraph", desc: "章包含段落。" },
    { id: "has_sentence", name: "含句", axis: "A2",
      domain: "jc:Paragraph", range: "jc:Sentence", desc: "段包含句子/韵句。" },
    { id: "commentary_on", name: "评/注/笺", axis: "A2",
      domain: "jc:Commentary", range: "jc:Text",
      desc: "A 评点/注/笺是对 B 作品的诠释。", inverse: "commented_by" },
    { id: "quotation", name: "引用", axis: "A2",
      domain: "jc:Text", range: "jc:Text",
      desc: "A 文引用/化用 B 文之句。", aliases: ["quotes"], inverse: "quoted_by" },
    { id: "preface_for", name: "序跋于", axis: "A2",
      domain: "jc:Preface", range: "jc:Text",
      desc: "序跋为某作品而作。" },

    // === A3 人物关系类 ===
    { id: "authorship", name: "著有", axis: "A3",
      domain: "jc:Person", range: "jc:Text/jc:Commentary",
      desc: "A 撰写/创作 B 作品。", aliases: ["author_of"], inverse: "authored_by" },
    { id: "compilation", name: "编选", axis: "A3",
      domain: "jc:Compiler", range: "jc:Anthology/jc:ZongJi",
      desc: "A 编纂/选辑 B 总集/选本。", inverse: "compiled_by" },
    { id: "teacher_student", name: "师徒", axis: "A3",
      domain: "jc:Person", range: "jc:Person",
      desc: "A 与 B 为师徒（师→弟）。", aliases: ["teacherOf","studentOf"] },
    { id: "friendship", name: "交游", axis: "A3",
      domain: "jc:Person", range: "jc:Person",
      desc: "A 与 B 有交游/唱和往来。", symmetric: true },
    { id: "same_society", name: "同社", axis: "A3",
      domain: "jc:Person", range: "jc:Person",
      desc: "A 与 B 同属一文社/诗社。", symmetric: true },
    { id: "same_year", name: "同年", axis: "A3",
      domain: "jc:Person", range: "jc:Person",
      desc: "A 与 B 为科举同年。", symmetric: true },
    { id: "family_relation", name: "亲属/姻亲", axis: "A3",
      domain: "jc:Person", range: "jc:Person",
      desc: "A 与 B 有亲属/姻亲关系（父子/兄弟/夫妻/叔侄…）。", symmetric: true },
    { id: "founding_of_school", name: "开创流派", axis: "A3",
      domain: "jc:Person", range: "jc:LiterarySchool",
      desc: "A 开创 B 文学流派。", inverse: "founded_by" },
    { id: "leader_of_school", name: "领袖流派", axis: "A3",
      domain: "jc:Person", range: "jc:LiterarySchool",
      desc: "A 为 B 流派的领袖/代表人物。" },
    { id: "criticizes", name: "评/批", axis: "A3",
      domain: "jc:Person/jc:Text", range: "jc:Person/jc:Text",
      desc: "A 对 B 有所品评/批评/赞誉。" },

    // === A4 时代事件关系类 ===
    { id: "in_era", name: "属时代", axis: "A4",
      domain: "jc:Person/jc:Text/jc:Event", range: "jc:EraEvent",
      desc: "人物/作品/事件所属的朝代/时代。" },
    { id: "participates_in", name: "参与", axis: "A4",
      domain: "jc:Person", range: "jc:Event",
      desc: "人物参与某雅集/结社/事件。" },
    { id: "writes_at", name: "创作于", axis: "A4",
      domain: "jc:CreationEvent", range: "jc:Text",
      desc: "创作事件产出某作品。" },
    { id: "hosts_gathering", name: "主持/参与雅集", axis: "A4",
      domain: "jc:Person", range: "jc:GatheringEvent",
      desc: "A 主持/参与 B 雅集（兰亭/西园/玉山雅集…）。" },
    { id: "publishes", name: "刊刻", axis: "A4",
      domain: "jc:Publisher/jc:Person", range: "jc:Edition",
      desc: "书坊/刻家刊刻某版本。" },
    { id: "spreads_to", name: "流传至", axis: "A4",
      domain: "jc:Text", range: "jc:SpreadEvent",
      desc: "作品流传至某地/某时代/域外。" },

    // === 九类专业分区专属关系谓词 ===
    // B1 别集
    { id: "contains_poem", name: "含诗", axis: "A1", domain: "jc:BieJi", range: "jc:BieJiShi",
      desc: "别集内含诗卷。", inverse: "poem_in" },
    { id: "chronicle_orders", name: "编年编排", axis: "A1", domain: "jc:BieJi", range: "jc:BieJiBianNian",
      desc: "别集按作者生平年份编排。" },
    { id: "genre_divides", name: "分体编排", axis: "A1", domain: "jc:BieJi", range: "jc:BieJiFenTi",
      desc: "别集按诗/文/词/赋体裁分卷编排。" },
    // B2 总集
    { id: "covers_era", name: "覆盖时代", axis: "A4", domain: "jc:ZongJi", range: "jc:EraEvent",
      desc: "总集收辑某一或数个时代作品。" },
    { id: "selects_author", name: "选录作者", axis: "A3", domain: "jc:ZongJi", range: "jc:Person",
      desc: "总集选录某作家作品。", inverse: "selected_in" },
    // B3 诗文评
    { id: "criticizes_work", name: "品评作品", axis: "A3", domain: "jc:ShiWenPing", range: "jc:Text",
      desc: "诗话/文话品评某作品。" },
    { id: "criticizes_person", name: "品评作家", axis: "A3", domain: "jc:ShiWenPing", range: "jc:Person",
      desc: "诗话/文话品评某作家。" },
    // B4 小说
    { id: "has_huimu", name: "有回目", axis: "A1", domain: "jc:ZhangHui", range: "jc:HuiMu",
      desc: "章回体小说具有对仗回目。" },
    { id: "narrates_story", name: "叙述故事", axis: "A2", domain: "jc:Novel", range: "jc:ThemeMotif",
      desc: "小说叙述某类故事母题（世情/神魔/侠义…）。" },
    { id: "based_on_history", name: "演义史事", axis: "A2", domain: "jc:YanYi", range: "jc:EraEvent",
      desc: "历史演义基于某段史事敷演。" },
    // B5 话本
    { id: "has_ruhua", name: "有入话", axis: "A2", domain: "jc:HuaBen", range: "jc:RuHua",
      desc: "话本开头有入话/头回。" },
    { id: "spoken_by", name: "说书人", axis: "A3", domain: "jc:HuaBen", range: "jc:Person",
      desc: "话本由某说书人讲述。" },
    // B6 宝卷
    { id: "serves_sect", name: "属教派", axis: "A2", domain: "jc:BaoJuan", range: "jc:BaoJuanJiaoPai",
      desc: "宝卷服务于某教派（白莲/罗教/弘阳…）。" },
    { id: "performed_at", name: "宣卷于", axis: "A4", domain: "jc:BaoJuan", range: "jc:XuanJuan",
      desc: "宝卷在某场合宣卷（法会/斋醮/丧仪…）。" },
    // B7 笑话
    { id: "contains_joke", name: "含笑条", axis: "A2", domain: "jc:XiaoHua", range: "jc:XiaoHuaTiao",
      desc: "笑话集包含若干笑话条目。" },
    // B8 谜语
    { id: "has_mimian", name: "谜面为", axis: "A2", domain: "jc:MiYu", range: "jc:MiMian", desc: "谜语谜面。" },
    { id: "has_midi",   name: "谜底为", axis: "A2", domain: "jc:MiYu", range: "jc:MiDi", desc: "谜语谜底。" },
    { id: "uses_mige",  name: "用谜格", axis: "A2", domain: "jc:MiYu", range: "jc:MiGe", desc: "谜语所用谜格。" },
    { id: "has_mimu",   name: "谜目为", axis: "A2", domain: "jc:MiYu", range: "jc:MiMu", desc: "谜语谜目（打一字/打一物…）。" }
  ],

  // ─────────── 数据属性（Datatype Properties）───────────
  datatypeProperties: [
    { id: "title",        label: "题名",    domain: "jc:Text",         range: "xsd:string" },
    { id: "authorName",   label: "著者",    domain: "jc:Person",       range: "xsd:string" },
    { id: "zi",           label: "字",      domain: "jc:Person",       range: "xsd:string" },
    { id: "hao",          label: "号",      domain: "jc:Person",       range: "xsd:string" },
    { id: "birthDeath",   label: "生卒年",  domain: "jc:Person",       range: "xsd:string" },
    { id: "dynasty",      label: "朝代",    domain: "jc:Person/jc:Text", range: "xsd:string" },
    { id: "juanCount",    label: "卷数",    domain: "jc:Text",         range: "xsd:integer" },
    { id: "characterCount", label: "字数",  domain: "jc:Text",         range: "xsd:integer" },
    { id: "genre",        label: "文体",    domain: "jc:Text",         range: "xsd:string" },
    { id: "form",         label: "体裁",    domain: "jc:Text",         range: "xsd:string" },
    { id: "era",          label: "时代",    domain: "jc:Event",        range: "xsd:string" },
    { id: "year",         label: "年份",    domain: "jc:Event",        range: "xsd:gYear" },
    { id: "location",     label: "地点",    domain: "jc:Event",        range: "xsd:string" },
    { id: "schoolName",   label: "流派名",  domain: "jc:LiterarySchool", range: "xsd:string" },
    { id: "coreIdea",     label: "核心主张", domain: "jc:WenLun",     range: "xsd:string" },
    { id: "imageMeaning", label: "意象意蕴", domain: "jc:Imagery",     range: "xsd:string" },
    { id: "sourceText",   label: "原文",    domain: "jc:Sentence",     range: "xsd:string" },

    // ── 九类专属数据属性 ──
    // B1 别集
    { id: "arrangement",  label: "编排体例", domain: "jc:BieJi",        range: "xsd:string", note:"编年/分体/分类" },
    { id: "themeLabel",   label: "题材标签", domain: "jc:BieJi",        range: "xsd:string", note:"纪行/咏物/应酬/酬赠/边塞/山水/田园" },
    // B2 总集
    { id: "scope",        label: "选录范围", domain: "jc:ZongJi",       range: "xsd:string", note:"通代/断代/地方/总类" },
    { id: "selectionCriterion", label: "选录标准", domain: "jc:ZongJi", range: "xsd:string" },
    // B3 诗文评
    { id: "criticismForm",label: "评论形式", domain: "jc:ShiWenPing",   range: "xsd:string", note:"诗话/文话/词话/诗法/评点" },
    { id: "criticObject", label: "评骘对象", domain: "jc:ShiWenPing",   range: "xsd:string" },
    // B4 小说
    { id: "huiMuCount",   label: "回数",     domain: "jc:ZhangHui",     range: "xsd:integer" },
    { id: "subGenre",     label: "小说子类", domain: "jc:Novel",        range: "xsd:string", note:"世情/神魔/侠义/历史演义/才子佳人/公案" },
    { id: "pingDianBen",  label: "评点本",   domain: "jc:Novel",        range: "xsd:string", note:"脂评本/毛宗岗评本/金圣叹评本" },
    { id: "narrator",     label: "叙事视角", domain: "jc:Novel",        range: "xsd:string" },
    // B5 话本
    { id: "storyTeller",  label: "说书人",   domain: "jc:HuaBen",       range: "xsd:string" },
    { id: "hasRuhua",     label: "有入话",   domain: "jc:HuaBen",       range: "xsd:boolean" },
    { id: "niHuaBenFlag", label: "拟话本",   domain: "jc:HuaBen",       range: "xsd:boolean" },
    // B6 宝卷
    { id: "pinCount",     label: "品数",     domain: "jc:BaoJuan",      range: "xsd:integer" },
    { id: "sect",         label: "所属教派", domain: "jc:BaoJuan",      range: "xsd:string", note:"罗教/弘阳教/白莲教/无为教…" },
    { id: "ritualScene",  label: "宣卷场合", domain: "jc:BaoJuan",      range: "xsd:string", note:"法会/斋醮/丧仪/庙会" },
    // B7 笑话
    { id: "jokeCount",    label: "笑话条数", domain: "jc:XiaoHua",      range: "xsd:integer" },
    { id: "jokeStyle",    label: "笑话体式", domain: "jc:XiaoHua",      range: "xsd:string", note:"语录/笑赋/俳谐/戏谑" },
    // B8 谜语
    { id: "riddleCount",  label: "谜语条数", domain: "jc:MiYu",         range: "xsd:integer" },
    { id: "miGeUsed",     label: "常用谜格", domain: "jc:MiYu",         range: "xsd:string", note:"秋千/卷帘/解铃/徐妃/白头…" },
    { id: "miMuRange",    label: "谜目范围", domain: "jc:MiYu",         range: "xsd:string", note:"打一字/打一物/打一古人" }
  ],

  // ─────────── ABox 实例规模（统计）───────────
  abox: {
    books:        { label: "典籍/作品",      count: 2692, cls: "jc:Text" },
    juan:         { label: "卷/回/篇/则",    count: 9842, cls: "jc:Juan" },
    persons:      { label: "人物",           count: 286,  cls: "jc:Person",
                    breakdown: { "宗师":12, "大家":45, "作家":158, "评点家":31, "注家":18, "学者":22 }},
    schools:      { label: "文学流派",       count: 38,  cls: "jc:LiterarySchool" },
    wenLun:       { label: "文论概念",       count: 48,  cls: "jc:WenLun" },
    wenDao:       { label: "文道核心概念",   count: 12,  cls: "jc:WenDao" },
    imageries:    { label: "意象",           count: 156, cls: "jc:Imagery" },
    imageryCats:  { label: "意象类属",       count: 10,  cls: "jc:ImageCategory" },
    allusions:    { label: "典故",           count: 320, cls: "jc:Allusion" },
    techniques:   { label: "技法",           count: 42,  cls: "jc:Technique" },
    forms:        { label: "体裁",           count: 56,  cls: "jc:Form" },
    events:       { label: "事件",           count: 186, cls: "jc:Event" },
    editions:     { label: "版本/刻本",      count: 210, cls: "jc:Edition" },
    folkWorks:    { label: "俗文学作品",     count: 105, cls: "jc:FolkLiterature" },
    commentaries: { label: "注/评/笺/疏",    count: 340, cls: "jc:Commentary" },
    anthologies:  { label: "选本",           count: 24,  cls: "jc:Anthology" }
  }
};

const JICANG_LAYERS = JICANG_TBOX.layers;

// 向后兼容别名（供旧版页面使用）
const JICANG_CLASSES = [
  { name:'文道本体', icon:'道', color:'#8B2500', total:JICANG_TBOX.abox.wenDao.count,
    desc:'中国文学最顶层的形而上学核心概念：道、气、理、文、言、意、象、情、性、才、学、识。',
    members:['道','气','理','文','言','意','象','情','性','才'] },
  { name:'文论范畴', icon:'论', color:'#B8860B', total:JICANG_TBOX.abox.wenLun.count,
    desc:'文论核心范畴：风骨、神思、滋味、意境、格调、神韵、性灵、肌理、诗言志、文以载道。',
    members:['风骨','神思','滋味','意境','格调','神韵','性灵','肌理','文以载道','诗言志'] },
  { name:'流派体系', icon:'派', color:'#2F4F4F', total:JICANG_TBOX.abox.schools.count,
    desc:'诸子百家、汉魏风骨、唐宋八家、江西诗派、桐城派、同光体等文学流派与体例。',
    members:['诸子百家','汉魏风骨','唐宋八家','江西诗派','台阁体','唐宋派','公安派','竟陵派','桐城派','同光体'] },
  { name:'文体体裁', icon:'体', color:'#5C4033', total:JICANG_TBOX.abox.forms.count,
    desc:'诗/文/词/曲/小说/戏曲/话本/演义等文体与乐府/古体/近体等体例。',
    members:['诗','文','词','曲','小说','戏曲','话本','演义','宝卷','笑话'] },
  { name:'人物传承', icon:'人', color:'#2f6b5f', total:JICANG_TBOX.abox.persons.count,
    desc:'圣王圣贤→宗师→大家→名家→评点家→学者，以及师徒/交游/姻亲/同社/同年/同僚。',
    members:['宗师','大家','作家','评点家','注家','学者','民艺人物','师徒','交游','同社'] },
  { name:'典籍文本', icon:'籍', color:'#6b3fa0', total:JICANG_TBOX.abox.books.count,
    desc:'别集/总集/选集/诗文评/小说/话本/演义/宝卷/笑话/谜语等典籍及其卷篇回则。',
    members:['别集','总集','选集','诗文评','小说','话本','演义','宝卷','笑话','谜语'] },
  { name:'技法章法', icon:'法', color:'#b5651d', total:JICANG_TBOX.abox.techniques.count,
    desc:'用字、造句、章法、韵律、对仗、用典、比兴、寄托等具体技法。',
    members:['比兴','用典','对仗','声律','章法','炼字','寄托','讽喻','含蓄','铺陈'] },
  { name:'意象典故', icon:'象', color:'#a9801f', total:JICANG_TBOX.abox.imageries.count,
    desc:'月、柳、梅、雁、酒、剑、青山、浮云等文化意象及相关典故。',
    members:['月','柳','梅','雁','酒','剑','青山','浮云','落花','流水'] },
  { name:'文化外延', icon:'俗', color:'#7a736a', total:JICANG_TBOX.abox.folkWorks.count,
    desc:'俗文学（说唱/弹词/戏曲/宝卷）、民俗意象、刻本出版、域外流传。',
    members:['说唱','弹词','戏曲','宝卷','谶纬','刻本','书坊','域外','民俗','弹词'] }
];
const JICANG_RELATIONS = JICANG_TBOX.objectProperties;
// JICANG_STATS 由各页面自行基于 JICANG_BOOKS 动态计算，保留空占位以免报错
const JICANG_STATS = { cats:{}, dyn:{}, topAuthors:[] };

// ───────────────────────────────────────────────
// 九类专业分区配置（v3.1 扩展）
// ───────────────────────────────────────────────
const JICANG_PARTITIONS = [
  {
    code: "bieji", name: "别集", icon: "集", color: "#8B2500",
    parentClass: "jc:BieJi",
    desc: "个人著作全集，按编年或分体编排，含诗、词、文、赋、应酬、纪行、咏物等题材。",
    subclasses: ["BieJiShi","BieJiCi","BieJiFu","BieJiWen","BieJiAn","BieJiXingLv","BieJiYongWu","BieJiBianNian","BieJiFenTi"],
    rels: ["contains_poem","chronicle_orders","genre_divides","authorship","of_style","belongs_to_school"],
    props: ["arrangement","themeLabel","juanCount","characterCount"],
    reps: [
      { title:"东坡全集",   author:"苏轼",  dynasty:"宋", arrangement:"分体", themeLabel:"纪行/咏物/酬赠/题跋", juanCount:115 },
      { title:"晦庵集",     author:"朱熹",  dynasty:"宋", arrangement:"分体", themeLabel:"理学/题跋/书信",     juanCount:100 },
      { title:"弇州山人四部稿",author:"王世贞",dynasty:"明", arrangement:"四部", themeLabel:"诗文/说部/赋部",    juanCount:174 },
      { title:"牧斋初学集", author:"钱谦益",dynasty:"明", arrangement:"分体", themeLabel:"诗/文/序跋",         juanCount:110 },
      { title:"惜抱轩诗文集",author:"姚鼐",  dynasty:"清", arrangement:"分体", themeLabel:"桐城派/古文/诗",     juanCount:18 }
    ]
  },
  {
    code: "zongji", name: "总集", icon: "总", color: "#B8860B",
    parentClass: "jc:ZongJi",
    desc: "汇编多人作品的合集，按通代/断代/地方/总类/按体等标准选录，形成作品网络。",
    subclasses: ["ZongJiDai","ZongJiDuanDai","ZongJiDiFang","ZongJiZongLei","ZongJiTiCai"],
    rels: ["covers_era","selects_author","anthologized_in","compilation"],
    props: ["scope","selectionCriterion","juanCount"],
    reps: [
      { title:"文选",       author:"萧统",  dynasty:"南朝梁", scope:"通代", selectionCriterion:"事出于沉思，义归乎翰藻", juanCount:60 },
      { title:"文苑英华",   author:"李昉",  dynasty:"宋",     scope:"通代", selectionCriterion:"续文选，上继萧梁",       juanCount:1000 },
      { title:"全唐文",     author:"董诰",  dynasty:"清",     scope:"断代", selectionCriterion:"唐代全文",               juanCount:1000 },
      { title:"全上古三代秦汉三国六朝文", author:"严可均", dynasty:"清", scope:"断代", selectionCriterion:"唐前全文", juanCount:746 },
      { title:"古文观止",   author:"吴楚材",dynasty:"清",     scope:"通代", selectionCriterion:"初学读本，选222篇",     juanCount:12 }
    ]
  },
  {
    code: "wenping", name: "诗文评", icon: "评", color: "#2F4F4F",
    parentClass: "jc:ShiWenPing",
    desc: "文论批评著作，含诗话、文话、词话、诗法、评点本，品评作品与作家，提出文论主张。",
    subclasses: ["ShiHua","WenHua","CiHua","ShiFa","WenPingDian"],
    rels: ["criticizes_work","criticizes_person","commentary_on","expounds_concept"],
    props: ["criticismForm","criticObject","coreIdea"],
    reps: [
      { title:"文心雕龙",   author:"刘勰",  dynasty:"南朝梁", criticismForm:"文论", criticObject:"历代文体与作家", coreIdea:"原道、征圣、宗经、神思、风骨" },
      { title:"诗品",       author:"钟嵘",  dynasty:"南朝梁", criticismForm:"诗品", criticObject:"汉魏至梁五言诗", coreIdea:"三品论诗，滋味说" },
      { title:"沧浪诗话",   author:"严羽",  dynasty:"宋",     criticismForm:"诗话", criticObject:"唐宋诗人",       coreIdea:"妙悟说、以禅喻诗" },
      { title:"人间词话",   author:"王国维",dynasty:"近代",   criticismForm:"词话", criticObject:"历代词人",       coreIdea:"境界说" },
      { title:"原诗",       author:"叶燮",  dynasty:"清",     criticismForm:"诗话", criticObject:"诗道源流",       coreIdea:"理、事、情；才、胆、识、力" }
    ]
  },
  {
    code: "xiaoshuo", name: "小说", icon: "说", color: "#5C4033",
    parentClass: "jc:Novel",
    desc: "中国古典叙事文学，含章回体、笔记体、文言/白话，涵盖世情、神魔、侠义、历史演义、才子佳人、公案等题材。",
    subclasses: ["ZhangHui","BiJiXiaoShuo","WenYanXiaoShuo","BaiHuaXiaoShuo","ShiQing","ShenMo","XiaYi","HuiMu"],
    rels: ["has_huimu","narrates_story","authorship","based_on_edition","variant_of"],
    props: ["huiMuCount","subGenre","pingDianBen","narrator"],
    reps: [
      { title:"红楼梦",     author:"曹雪芹",dynasty:"清", subGenre:"世情", huiMuCount:120, pingDianBen:"脂砚斋评本", narrator:"第三人称·石头视角" },
      { title:"金瓶梅",     author:"兰陵笑笑生",dynasty:"明", subGenre:"世情", huiMuCount:100, pingDianBen:"崇祯本/张竹坡评本" },
      { title:"西游记",     author:"吴承恩",dynasty:"明", subGenre:"神魔", huiMuCount:100, pingDianBen:"世德堂本" },
      { title:"水浒传",     author:"施耐庵",dynasty:"明", subGenre:"侠义", huiMuCount:100, pingDianBen:"金圣叹评本(70回)" },
      { title:"儒林外史",   author:"吴敬梓",dynasty:"清", subGenre:"讽刺", huiMuCount:56,  pingDianBen:"卧闲草堂本" }
    ]
  },
  {
    code: "yanyi", name: "演义", icon: "演", color: "#8B4513",
    parentClass: "jc:YanYi",
    desc: "历史演义小说，以正史为骨架铺陈敷演，多用回目对仗、评点本流传。",
    subclasses: ["YanYiShi","HuiMu"],
    rels: ["based_on_history","has_huimu","authorship","variant_of"],
    props: ["huiMuCount","subGenre","pingDianBen"],
    reps: [
      { title:"三国演义",   author:"罗贯中",dynasty:"明", subGenre:"历史演义", huiMuCount:120, pingDianBen:"毛宗岗评本" },
      { title:"东周列国志", author:"冯梦龙",dynasty:"明", subGenre:"历史演义", huiMuCount:108 },
      { title:"封神演义",   author:"许仲琳",dynasty:"明", subGenre:"神魔演义", huiMuCount:100 },
      { title:"隋唐演义",   author:"褚人获",dynasty:"清", subGenre:"历史演义", huiMuCount:100 }
    ]
  },
  {
    code: "huaben", name: "话本", icon: "话", color: "#6b3fa0",
    parentClass: "jc:HuaBen",
    desc: "说书人底本，有入话/头回、正话、结尾诗三段式结构，拟话本为文人仿作。",
    subclasses: ["RuHua","ZhengHua","HuaBenJieWei","NiHuaBen"],
    rels: ["has_ruhua","spoken_by","narrates_story","authorship"],
    props: ["storyTeller","hasRuhua","niHuaBenFlag"],
    reps: [
      { title:"喻世明言",   author:"冯梦龙",dynasty:"明", hasRuhua:true, niHuaBenFlag:false, storyTeller:"说话人" },
      { title:"警世通言",   author:"冯梦龙",dynasty:"明", hasRuhua:true, niHuaBenFlag:false },
      { title:"醒世恒言",   author:"冯梦龙",dynasty:"明", hasRuhua:true, niHuaBenFlag:false },
      { title:"初刻拍案惊奇",author:"凌濛初",dynasty:"明", hasRuhua:true, niHuaBenFlag:true },
      { title:"二刻拍案惊奇",author:"凌濛初",dynasty:"明", hasRuhua:true, niHuaBenFlag:true }
    ]
  },
  {
    code: "baojuan", name: "宝卷", icon: "卷", color: "#a9801f",
    parentClass: "jc:BaoJuan",
    desc: "民间宗教说唱文本，按品/分编排，用于教派宣卷、法会斋醮场合，融合佛道与俗讲。",
    subclasses: ["BaoJuanPin","BaoJuanKeYi","BaoJuanJiaoPai","BaoJuanSuJiang","XuanJuan"],
    rels: ["serves_sect","performed_at","authorship","has_part"],
    props: ["pinCount","sect","ritualScene"],
    reps: [
      { title:"五部六册",   author:"罗清",  dynasty:"明", sect:"罗教（无为教）", pinCount:24, ritualScene:"法会/斋醮" },
      { title:"弘阳教宝卷", author:"飘高祖",dynasty:"明", sect:"弘阳教",          pinCount:0,  ritualScene:"道场" },
      { title:"香山宝卷",   author:"佚名",  dynasty:"明", sect:"民间佛教",        pinCount:0,  ritualScene:"观音法会" },
      { title:"刘香宝卷",   author:"佚名",  dynasty:"清", sect:"民间宗教",        pinCount:0,  ritualScene:"还愿" }
    ]
  },
  {
    code: "xiaohua", name: "笑话", icon: "笑", color: "#b5651d",
    parentClass: "jc:XiaoHua",
    desc: "谐谑讽喻之书，收录笑话条目，体式含语录、笑赋、俳谐文等，多源于稗官笔记。",
    subclasses: ["XiaoHuaTi","XiaoHuaTiao","YouLuXiaoHua","XiaoFuXiaoHua"],
    rels: ["contains_joke","authorship"],
    props: ["jokeCount","jokeStyle"],
    reps: [
      { title:"笑林",       author:"邯郸淳",dynasty:"三国魏", jokeCount:0,  jokeStyle:"语录体·古俳谐" },
      { title:"启颜录",     author:"侯白",  dynasty:"隋",     jokeCount:0,  jokeStyle:"语录体" },
      { title:"艾子杂说",   author:"苏轼",  dynasty:"宋",     jokeCount:0,  jokeStyle:"寓言体笑话" },
      { title:"笑林广记",   author:"游戏主人",dynasty:"清",   jokeCount:970,jokeStyle:"语录体·通俗笑话" }
    ]
  },
  {
    code: "miyu", name: "谜语", icon: "谜", color: "#2f6b5f",
    parentClass: "jc:MiYu",
    desc: "隐语游戏之书，由谜面、谜底、谜格、谜目四要素构成，灯谜为主要形式。",
    subclasses: ["MiMian","MiDi","MiGe","MiMu","DengMi"],
    rels: ["has_mimian","has_midi","uses_mige","has_mimu","authorship"],
    props: ["riddleCount","miGeUsed","miMuRange"],
    reps: [
      { title:"隐语",       author:"佚名",  dynasty:"先秦", riddleCount:0, miGeUsed:"无格古谜", miMuRange:"多类" },
      { title:"文戏游戏",   author:"佚名",  dynasty:"宋",   riddleCount:0, miGeUsed:"商谜",     miMuRange:"打物/打字" },
      { title:"黄山谜",     author:"冯梦龙",dynasty:"明",   riddleCount:0, miGeUsed:"秋千/卷帘",miMuRange:"打古人/打字" },
      { title:"春灯谜",     author:"阮大铖",dynasty:"明",   riddleCount:0, miGeUsed:"杂格",     miMuRange:"灯谜" }
    ]
  }
];

// ───────────────────────────────────────────────
// 4 轴 × 7 层 × 9 类 正交网格（供 Three.js 3D 可视化使用）
//   x = axis 索引 (0..3)   A1/A2/A3/A4
//   y = layer 索引 (0..6)  L6→L0（L6 在下方，L0 在上方）
//   z = class 索引 (0..8)  九类分区
// 共 4×7×9 = 252 个节点
// ───────────────────────────────────────────────
const JICANG_ORTHO = {
  axes: ["A1","A2","A3","A4"],
  layers: ["L6","L5","L4","L3","L2","L1","L0"],  // y 由低到高
  partitions: ["bieji","zongji","wenping","xiaoshuo","yanyi","huaben","baojuan","xiaohua","miyu"],
  // 节点语义：在 (axis,layer,partition) 坐标处，该分区是否在该轴该层有本体节点
  // 标记 true = 存在专属类/关系/属性；false = 共享上层（无专属节点，但仍在网格中作为共享占位）
  grid: {
    //              L6 L5 L4 L3 L2 L1 L0
    bieji:   { A1:[0, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[0, 0, 1, 1, 0, 0, 1] },
    zongji:  { A1:[0, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 0, 1, 1, 1],
               A3:[0, 1, 1, 1, 0, 0, 1],
               A4:[1, 0, 1, 1, 0, 0, 1] },
    wenping: { A1:[0, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 1, 0, 0, 1],
               A4:[0, 0, 1, 1, 0, 0, 1] },
    xiaoshuo:{ A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[1, 0, 1, 1, 0, 0, 1] },
    yanyi:   { A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[1, 0, 1, 1, 0, 0, 1] },
    huaben:  { A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[1, 0, 1, 1, 0, 0, 1] },
    baojuan: { A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 1, 0, 0, 1],
               A4:[1, 0, 1, 1, 0, 0, 1] },
    xiaohua: { A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[0, 0, 1, 1, 0, 0, 1] },
    miyu:    { A1:[1, 0, 1, 1, 0, 0, 1],
               A2:[1, 0, 1, 1, 1, 1, 1],
               A3:[0, 1, 1, 0, 0, 0, 1],
               A4:[0, 0, 1, 1, 0, 0, 1] }
  },
  // 每个 (layer,axis) 交点在该层该轴上的"主轴概念"标签（7×4=28 个）
  layerAxisLabels: {
    L0:{ A1:"类/关系/属性", A2:"元语言",  A3:"元主体",  A4:"元时空" },
    L1:{ A1:"文道之体",     A2:"文·道·气·理·言·意·象·情·性·才·学·识", A3:"圣贤立道", A4:"文运发端" },
    L2:{ A1:"文体论",       A2:"风骨·神思·滋味·意境·格调·神韵·性灵·肌理", A3:"宗师开宗", A4:"思潮代兴" },
    L3:{ A1:"流派/体例/时代文风", A2:"技法·意象·典故·题材母题", A3:"大家领袖", A4:"结社/雅集/党争/科举" },
    L4:{ A1:"典籍分类·版本", A2:"卷/章/段/句/字/韵·注疏", A3:"作家/选家/评点家/刻家", A4:"创作/成书/刊刻/出版" },
    L5:{ A1:"—",            A2:"—",       A3:"文人交游·师徒·姻亲·同社·同年", A4:"事件参与" },
    L6:{ A1:"俗文学/说唱/弹词/戏曲", A2:"民俗意象·谶纬", A3:"民间传说人物", A4:"域外流传·刻本传播" }
  }
};

// 向后兼容别名：供 ontology.html 快速读取九类分区
const JICANG_PARTITION_MAP = {};
JICANG_PARTITIONS.forEach(p => { JICANG_PARTITION_MAP[p.code] = p; });

// 显式挂载到 window，保证模块脚本也能读取
window.JICANG_TBOX = JICANG_TBOX;
window.JICANG_THEORY = JICANG_THEORY;
window.JICANG_LAYERS = JICANG_LAYERS;
window.JICANG_CLASSES = JICANG_CLASSES;
window.JICANG_RELATIONS = JICANG_RELATIONS;
window.JICANG_STATS = JICANG_STATS;
window.JICANG_PARTITIONS = JICANG_PARTITIONS;
window.JICANG_PARTITION_MAP = JICANG_PARTITION_MAP;
window.JICANG_ORTHO = JICANG_ORTHO;
