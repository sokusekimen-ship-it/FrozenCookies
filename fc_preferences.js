FrozenCookies.preferenceValues = {
    // クリックオプション
    clickingOptions: {
        hint: "自動クリック:",
    },
    autoClick: {
        hint: "大きなクッキーを自動クリックし、速度を設定します。",
        display: ["オートクリック OFF", "オートクリック ON"],
        default: 0,
        extras: '<a class="option" id="cookieClickSpeed" onclick="updateSpeed(\'cookieClickSpeed\');">${cookieClickSpeed} クリック/秒</a>',
    },
    autoFrenzy: {
        hint: "クリックフレンジー中に自動クリックします。",
        display: ["オートフレンジー OFF", "オートフレンジー ON"],
        default: 0,
        extras: '<a class="option" id="frenzyClickSpeed" onclick="updateSpeed(\'frenzyClickSpeed\');">${frenzyClickSpeed} クリック/秒</a>',
    },
    autoGC: {
        hint: "ゴールデン/怒りのクッキーを自動クリックします。",
        display: ["GCオートクリック OFF", "GCオートクリック ON"],
        default: 0,
    },
    autoReindeer: {
        hint: "トナカイを自動クリックします。",
        display: ["トナカイオートクリック OFF", "トナカイオートクリック ON"],
        default: 0,
    },
    autoFortune: {
        hint: "ニューステロップのおみくじを自動クリックします。",
        display: ["オートおみくじ OFF", "オートおみくじ ON"],
        default: 0,
    },

    // 自動購入オプション
    buyingOptions: {
        hint: "自動購入:",
    },
    autoBuy: {
        hint: "最も効率的な建物/アップグレードを自動購入します。",
        display: ["オートバイ OFF", "オートバイ ON"],
        default: 0,
    },
    otherUpgrades: {
        hint: "CpSを直接上げないアップグレードも購入します。",
        display: ["その他アップグレード OFF", "その他アップグレード ON"],
        default: 1,
    },
    autoBlacklistOff: {
        hint: "目標達成時にブラックリストをオフにします。",
        display: ["オートブラックリスト解除 OFF", "オートブラックリスト解除 ON"],
        default: 0,
    },
    blacklist: {
        hint: "ブラックリスト: 実績やチャレンジのために購入を制限します。",
        display: [
            "ブラックリスト OFF",
            "ブラックリスト: スピードラン",
            "ブラックリスト: ハードコア",
            "ブラックリスト: グランマポカリプス",
            "ブラックリスト: 建物なし",
        ],
        default: 0,
    },
    mineLimit: {
        hint: "ゴジャモクコンボ用に炭鉱の数を制限します。",
        display: ["炭鉱上限 OFF", "炭鉱上限 ON"],
        default: 0,
        extras: '<a class="option" id="mineMax" onclick="updateMineMax(\'mineMax\');">${mineMax} 炭鉱</a>',
    },
    factoryLimit: {
        hint: "ゴジャモクコンボ用に工場の数を制限します。",
        display: ["工場上限 OFF", "工場上限 ON"],
        default: 0,
        extras: '<a class="option" id="factoryMax" onclick="updateFactoryMax(\'factoryMax\');">${factoryMax} 工場</a>',
    },
    pastemode: {
        hint: "最も非効率な選択肢を購入します (⚠️ 非推奨)。",
        display: ["ペーストモード OFF", "ペーストモード ON"],
        default: 0,
    },

    // その他の自動オプション
    autoOtherOptions: {
        hint: "その他の自動化:",
    },
    autoBulk: {
        hint: "アセンション後にまとめ買いを設定します。",
        display: ["オートまとめ買い OFF", "オートまとめ買い x10", "オートまとめ買い x100"],
        default: 0,
    },
    autoBuyAll: {
        hint: "チップが得られるまで全アップグレードを自動購入します。",
        display: ["全アップグレード自動購入 OFF", "全アップグレード自動購入 ON"],
        default: 0,
    },
    autoAscendToggle: {
        hint: "目標チップ数でオートアセンション (⚠️ アップグレード画面をスキップ)。",
        display: ["オートアセンション OFF", "オートアセンション ON"],
        default: 0,
    },
    autoAscend: {
        hint: "オートアセンション方式を選択します。",
        display: [
            "オートアセンション OFF",
            "設定チップ数でオートアセンション",
            "プレステージが2倍になったらオートアセンション",
        ],
        default: 0,
        extras: '<a class="option" id="chipsToAscend" onclick="updateAscendAmount(\'HCAscendAmount\');">${HCAscendAmount} ヘブンリーチップ</a>',
    },
    comboAscend: {
        hint: "X以上のフレンジー中はオートアセンションをブロックします。",
        display: ["コンボ中アセンション OFF", "コンボ中アセンション ON"],
        default: 0,
        extras: '<a class="option" id="minCpSMult" onclick="updateCpSMultMin(\'minCpSMult\');">x${minCpSMult} 最低フレンジー倍率</a>',
    },
    autoWrinkler: {
        hint: "リンクラーを自動でポップします。",
        display: [
            "リンクラー自動ポップ OFF",
            "リンクラー自動ポップ (効率的)",
            "リンクラー自動ポップ (即時)",
        ],
        default: 0,
    },
    shinyPop: {
        hint: "光るリンクラーを保護します (⚠️ エルダー誓約が無効になります)。",
        display: ["光るリンクラー保護 OFF", "光るリンクラー保護 ON"],
        default: 0,
    },
    autoSL: {
        hint: "シュガーランプを自動収穫します (リジデルと組み合わせ可)。",
        display: [
            "SL自動収穫 OFF",
            "SL自動収穫 ON",
            "SL自動収穫 ON + オートリジデル",
        ],
        default: 0,
    },
    dragonsCurve: {
        hint: "ランプ収穫時にドラゴンズカーブ (とリアリティベンディング) に切り替えます。",
        display: [
            "オートドラゴンズカーブ OFF",
            "オートドラゴンズカーブ ON",
            "オートドラゴンズカーブ ON + リアリティベンディング",
        ],
        default: 0,
    },
    sugarBakingGuard: {
        hint: "ランプを101未満で使わない (シュガーベーキングボーナスを維持)。",
        display: ["シュガーベーキング保護 OFF", "シュガーベーキング保護 ON"],
        default: 0,
    },
    autoGS: {
        hint: "クリックバフ中にゴールデンスイッチを自動切替します。",
        display: ["オートゴールデンスイッチ OFF", "オートゴールデンスイッチ ON"],
        default: 0,
    },
    autoGodzamok: {
        hint: "クリックバフ中にゴジャモク用に炭鉱/工場を自動売却します。",
        display: ["オートゴジャモク OFF", "オートゴジャモク ON"],
        default: 0,
    },
    autoBank: {
        hint: "銀行オフィスを自動アップグレードします。",
        display: ["オートバンキング OFF", "オートバンキング ON"],
        default: 0,
    },
    autoBroker: {
        hint: "株式ブローカーを自動雇用します。",
        display: ["オートブローカー OFF", "オートブローカー ON"],
        default: 0,
    },
    autoLoan: {
        hint: "クリックフレンジー中にローンを自動利用します。",
        display: ["オートローン OFF", "ローン1と2を借りる", "3つ全て借りる"],
        default: 0,
        extras: '<a class="option" id="minLoanMult" onclick="updateLoanMultMin(\'minLoanMult\');">x${minLoanMult} 最低フレンジー倍率</a>',
    },

    // パンテオンオプション
    worshipOptions: {
        hint: "パンテオン:",
    },
    autoWorshipToggle: {
        hint: "選択した神を自動スロットに配置します (同じ神は2回選択不可)。",
        display: ["オートパンテオン OFF", "オートパンテオン ON"],
        default: 0,
    },
    autoWorship0: {
        hint: "ダイヤモンドスロットに神を自動配置します。",
        display: [
            "なし",
            "ヴォミトラックス",
            "ゴジャモク",
            "サイクリウス",
            "セレブラク",
            "ドットジェイエス",
            "ムリダル",
            "ジェレミー",
            "モカルシウム",
            "スクルーイア",
            "リジデル",
        ],
        default: 0,
    },
    autoWorship1: {
        hint: "ルビースロットに神を自動配置します。",
        display: [
            "なし",
            "ヴォミトラックス",
            "ゴジャモク",
            "サイクリウス",
            "セレブラク",
            "ドットジェイエス",
            "ムリダル",
            "ジェレミー",
            "モカルシウム",
            "スクルーイア",
            "リジデル",
        ],
        default: 0,
    },
    autoWorship2: {
        hint: "ジェイドスロットに神を自動配置します。",
        display: [
            "なし",
            "ヴォミトラックス",
            "ゴジャモク",
            "サイクリウス",
            "セレブラク",
            "ドットジェイエス",
            "ムリダル",
            "ジェレミー",
            "モカルシウム",
            "スクルーイア",
            "リジデル",
        ],
        default: 0,
    },
    autoCyclius: {
        hint: "最大CpSのためにサイクリウスを自動入替します (上で神を設定し、サイクリウスは選ばないこと)。",
        display: [
            "オートサイクリウス OFF",
            "オートサイクリウス (ルビー+ジェイド)",
            "オートサイクリウス (全スロット)",
        ],
        default: 0,
    },

    // 呪文オプション
    spellOptions: {
        hint: "魔法書:",
    },
    towerLimit: {
        hint: "設定した最大マナでウィザードタワーの購入を停止します。",
        display: ["ウィザードタワー上限 OFF", "ウィザードタワー上限 ON"],
        default: 0,
        extras: '<a class="option" id="manaMax" onclick="updateManaMax(\'manaMax\');">${manaMax} 最大マナ</a>',
    },
    autoCasting: {
        hint: "マナが満タンになったら選択した呪文を自動詠唱します。",
        display: [
            "オート詠唱 OFF",
            "オート詠唱: 焼き菓子の召喚",
            "オート詠唱: 運命の手を強制 (シンプル)",
            "オート詠唱: 運命の手を強制 (スマート)",
            "オート詠唱: FTHOF (クリック&建物スペシャルのみ)",
            "オート詠唱: 自発的建築",
            "オート詠唱: 商人の魅力",
        ],
        default: 0,
        extras: '<a class="option" id="minCpSMult" onclick="updateCpSMultMin(\'minCpSMult\');">x${minCpSMult} 最低フレンジー倍率</a>',
    },
    spellNotes: {
        hint: "一度に有効なコンボは1つのみです。readmeを参照してください。",
    },
    autoFTHOFCombo: {
        hint: "FTHOFコンボをダブルキャストします (十分なマナが必要)。",
        display: ["FTHOFダブルキャスト OFF", "FTHOFダブルキャスト ON"],
        default: 0,
    },
    auto100ConsistencyCombo: {
        hint: "⚠️ 実験的: 100%コンシステンシーコンボを自動詠唱します。",
        display: [
            "100%コンシステンシーコンボ OFF",
            "100%コンシステンシーコンボ ON",
        ],
        default: 0,
    },
    autoSugarFrenzy: {
        hint: "X倍フレンジーの最初のコンボ時にシュガーフレンジーを自動購入します。",
        display: [
            "オートシュガーフレンジー OFF",
            "100%コンシステンシーコンボ用",
            "ダブルキャストコンボ用も含む",
        ],
        default: 0,
        extras: '<a class="option" id="minASFMult" onclick="updateASFMultMin(\'minASFMult\');">x${minASFMult} 最低フレンジー倍率</a>',
    },
    autoSweet: {
        hint: "⚠️ 実験的: 「スウィート」呪文が出るまでアセンションを繰り返します。手動停止不可。",
        display: ["オートスウィート OFF", "オートスウィート ON"],
        default: 0,
    },

    // ドラゴンオプション
    dragonOptions: {
        hint: "ドラゴン:",
    },
    autoDragon: {
        hint: "ドラゴンを自動アップグレードします。",
        display: ["ドラゴンアップグレード OFF", "ドラゴンアップグレード ON"],
        default: 0,
    },
    petDragon: {
        hint: "ドロップのためにドラゴンを自動なでます。",
        display: ["ドラゴンなで OFF", "ドラゴンなで ON"],
        default: 0,
    },
    autoDragonToggle: {
        hint: "ドラゴンのオーラを自動設定します。",
        display: ["ドラゴンオーラ OFF", "ドラゴンオーラ ON"],
        default: 0,
    },
    dragonNotes: {
        hint: "希望のオーラを設定してください。同じオーラは2回設定できません。",
    },
    autoDragonAura0: {
        hint: "第1ドラゴンオーラを自動設定します。",
        display: [
            "オーラなし",
            "ミルクの息吹",
            "ドラゴンカーソル",
            "エルダー大隊",
            "フィールドの刈り取り手",
            "大地の粉砕者",
            "武器庫の主",
            "凶暴な蓄積者",
            "ドラゴンゴッド",
            "アルカナオーラ",
            "ドラゴンフライト",
            "先祖の変容",
            "不浄の支配",
            "時代の操り手",
            "精神の支配",
            "輝く食欲",
            "ドラゴンの幸運",
            "ドラゴンズカーブ",
            "リアリティベンディング",
            "ドラゴンオーブ",
            "至高の知性",
            "ドラゴンの内臓",
        ],
        default: 0,
    },
    autoDragonAura1: {
        hint: "第2ドラゴンオーラを自動設定します。",
        display: [
            "オーラなし",
            "ミルクの息吹",
            "ドラゴンカーソル",
            "エルダー大隊",
            "フィールドの刈り取り手",
            "大地の粉砕者",
            "武器庫の主",
            "凶暴な蓄積者",
            "ドラゴンゴッド",
            "アルカナオーラ",
            "ドラゴンフライト",
            "先祖の変容",
            "不浄の支配",
            "時代の操り手",
            "精神の支配",
            "輝く食欲",
            "ドラゴンの幸運",
            "ドラゴンズカーブ",
            "リアリティベンディング",
            "ドラゴンオーブ",
            "至高の知性",
            "ドラゴンの内臓",
        ],
        default: 0,
    },
    autoDragonOrbs: {
        hint: "ドラゴンオーブのオーラが設定されゴジャモクがいない場合、GC用にYouを自動売却します。",
        display: ["オートドラゴンオーブ OFF", "オートドラゴンオーブ ON"],
        default: 0,
    },
    orbLimit: {
        hint: "ドラゴンオーブコンボ用にYouの数を制限します。",
        display: ["You上限 OFF", "You上限 ON"],
        default: 0,
        extras: '<a class="option" id="orbMax" onclick="updateOrbMax(\'orbMax\');">${orbMax} You</a>',
    },

    // シーズンオプション
    seasonOptions: {
        hint: "シーズン:",
    },
    defaultSeasonToggle: {
        hint: "必要なアップグレードがない場合、選択したシーズンに自動切替します。",
        display: ["シーズン自動購入 OFF", "シーズン自動購入 ON"],
        default: 0,
    },
    defaultSeason: {
        hint: "デフォルトのシーズンを選択します。",
        display: [
            "デフォルトシーズン OFF",
            "デフォルトシーズン: ビジネスデー",
            "デフォルトシーズン: クリスマス",
            "デフォルトシーズン: イースター",
            "デフォルトシーズン: ハロウィン",
            "デフォルトシーズン: バレンタインデー",
        ],
        default: 0,
    },
    freeSeason: {
        hint: "必要なアップグレードがない場合、無料のベースシーズンに留まります。",
        display: [
            "フリーシーズン OFF",
            "クリスマスとビジネスデーのみ",
            "全シーズン",
        ],
        default: 1,
    },
    autoEaster: {
        hint: "卵が不足している場合、クッキーストーム中にイースターへ切替します。",
        display: ["オートイースター切替 OFF", "オートイースター切替 ON"],
        default: 0,
    },
    autoHalloween: {
        hint: "リンクラーがいてクッキーが不足している場合、ハロウィンへ切替します。",
        display: ["オートハロウィン切替 OFF", "オートハロウィン切替 ON"],
        default: 0,
    },

    // バンクオプション
    bankOptions: {
        hint: "バンク: (バンクが満タンになるまで自動購入を遅延させます)",
    },
    holdManBank: {
        hint: "手動最低バンク (ベースCpSの分数)",
        display: ["マニュアルバンク OFF", "マニュアルバンク ON"],
        default: 0,
        extras: '<a class="option" id="manBankMins" onclick="updateManBank(\'manBankMins\');">${manBankMins} 分</a>',
    },
    holdSEBank: {
        hint: "自発的建築のためにバンクを確保します。",
        display: ["SEバンク OFF", "SEバンク ON"],
        default: 0,
    },
    setHarvestBankPlant: {
        hint: "選択した植物の収穫のためにバンクを確保します。",
        display: [
            "収穫バンク OFF",
            "収穫バンク: ベイクベリー",
            "収穫バンク: チョコルート",
            "収穫バンク: ホワイトチョコルート",
            "収穫バンク: クイーンビート",
            "収穫バンク: デューケテイター",
            "収穫バンク: クランプスポア",
            "収穫バンク: ドウシュルーム",
        ],
        default: 0,
    },
    setHarvestBankType: {
        hint: "CpSバフ中に植物収穫のためにバンクを増加させます。",
        display: [
            "CpS倍率なし時に収穫",
            "フレンジー中に収穫",
            "建物スペシャル中に収穫",
            "フレンジー+建物スペシャル中に収穫",
        ],
        default: 0,
        extras: '<a class="option" id="maxSpecials" onclick="updateMaxSpecials(\'maxSpecials\');">${maxSpecials} 建物スペシャル数</a>',
    },

    // その他のオプション
    otherOptions: {
        hint: "その他:",
    },
    FCshortcuts: {
        hint: "キーボードショートカットを有効にします (readmeを参照)。",
        display: ["ショートカット OFF", "ショートカット ON"],
        default: 1,
    },
    simulatedGCPercent: {
        hint: "効率計算用にクリックされるGCの割合を設定します (100%推奨)。",
        display: ["GCクリック率 0%", "GCクリック率 100%"],
        default: 1,
    },

    // 表示オプション
    displayOptions: {
        hint: "表示:",
    },
    showMissedCookies: {
        hint: "情報パネルに見逃したゴールデンクッキーを表示します。",
        display: ["見逃しGC表示 OFF", "見逃しGC表示 ON"],
        default: 0,
    },
    numberDisplay: {
        hint: "数値の表示形式を変更します。",
        display: [
            "数値表示: 生数値",
            "数値表示: フル (百万、十億)",
            "数値表示: 略称 (M, B)",
            "数値表示: SI接頭辞 (M, G, T)",
            "数値表示: 科学表記 (6.3e12)",
        ],
        default: 1,
    },
    fancyui: {
        hint: "情報ボックスのスタイル (テキスト、ホイール、または両方)。",
        display: [
            "情報ボックス OFF",
            "情報ボックス: テキストのみ",
            "情報ボックス: ホイールのみ",
            "情報ボックス: ホイール＆テキスト",
        ],
        default: 0,
    },
    logging: {
        hint: "アクションをコンソールに記録します。",
        display: ["ログ OFF", "ログ ON"],
        default: 1,
    },
    purchaseLog: {
        hint: "全ての自動購入を記録します。",
        display: ["購入ログ OFF", "購入ログ ON"],
        default: 0,
    },

    slowOptions: {
        hint: "警告: これらのオプションはゲームを遅くする可能性があります。",
    },
    fpsModifier: {
        hint: "ゲームのフレームレートを設定します (デフォルト 30)。",
        display: [
            "フレームレート 15 fps",
            "フレームレート 24 fps",
            "フレームレート 30 fps",
            "フレームレート 48 fps",
            "フレームレート 60 fps",
            "フレームレート 72 fps",
            "フレームレート 88 fps",
            "フレームレート 100 fps",
            "フレームレート 120 fps",
            "フレームレート 144 fps",
            "フレームレート 200 fps",
            "フレームレート 240 fps",
            "フレームレート 300 fps",
            "フレームレート 5 fps",
            "フレームレート 10 fps",
        ],
        default: 2,
    },
    trackStats: {
        hint: "グラフ用にCpS/HCを記録します (ゲームが遅くなる場合があります)。",
        display: [
            "記録 OFF",
            "60秒ごとに記録",
            "30分ごとに記録",
            "1時間ごとに記録",
            "24時間ごとに記録",
            "アップグレード時に記録",
            "スマートタイミングで記録",
        ],
        default: 0,
        extras: '<a class="option" id="viewStats" onclick="viewStatGraphs();">統計グラフを表示</a>',
    },
    recommendedSettings: {
        hint: "全ての推奨オプションを設定します (⚠️ 即座にゲームをリロードします)。",
        display: ["推奨設定 OFF", "推奨設定 ON"],
        default: 0,
    },
};

