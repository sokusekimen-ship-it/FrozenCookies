// ============================================================
// fc_main_ja_patch.js
// fc_main.js の UI テキスト日本語化パッチ
// frozen_cookies.js の script_list で fc_main.js の後にこのファイルを追加してください
// ============================================================

// --- updateSpeed ダイアログ ---
function updateSpeed(base) {
    userInputPrompt(
        "オートクリック設定",
        "1秒あたり何回クリックしますか？ (250推奨、最大1000)",
        FrozenCookies[base],
        storeNumberCallback(base, 0, 1000)
    );
}

// --- updateCpSMultMin ダイアログ ---
function updateCpSMultMin(base) {
    userInputPrompt(
        "オート詠唱設定",
        'オート詠唱のトリガーとなるCpS倍率を入力してください。(例: "7" でフレンジー時に発動、"1" でクロット中の発動を防止)',
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateAscendAmount ダイアログ ---
function updateAscendAmount(base) {
    userInputPrompt(
        "オートアセンション設定",
        "何枚のヘブンリーチップで自動アセンションしますか？",
        FrozenCookies[base],
        storeNumberCallback(base, 1)
    );
}

// --- updateManaMax ダイアログ ---
function updateManaMax(base) {
    userInputPrompt(
        "マナ上限設定",
        "最大マナ量を設定してください (100以下推奨)",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateMaxSpecials ダイアログ ---
function updateMaxSpecials(base) {
    userInputPrompt(
        "収穫バンク設定",
        "収穫バンクに重ねる建物スペシャルの数を設定してください",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateMineMax ダイアログ ---
function updateMineMax(base) {
    userInputPrompt(
        "炭鉱上限設定",
        "オートバイを停止する炭鉱の数を入力してください",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateFactoryMax ダイアログ ---
function updateFactoryMax(base) {
    userInputPrompt(
        "工場上限設定",
        "オートバイを停止する工場の数を入力してください",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateOrbMax ダイアログ ---
function updateOrbMax(base) {
    userInputPrompt(
        "You上限設定",
        "オートバイを停止するYouの数を入力してください",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateLoanMultMin ダイアログ ---
function updateLoanMultMin(base) {
    userInputPrompt(
        "ローン設定",
        'ローンを借りるトリガーとなるCpS倍率を入力してください。(例: "7" で通常フレンジー時、"500" で巨大建物バフコンボ時)',
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateASFMultMin ダイアログ ---
function updateASFMultMin(base) {
    userInputPrompt(
        "シュガーフレンジー設定",
        'シュガーフレンジーを購入するトリガーとなるCpS倍率を入力してください。(例: "100" で普通の序盤コンボ時、"1000" で巨大建物バフコンボ時)',
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- updateManBank ダイアログ ---
function updateManBank(base) {
    userInputPrompt(
        "マニュアルバンク設定",
        "常に確保しておくベースCpSの分数を入力してください",
        FrozenCookies[base],
        storeNumberCallback(base, 0)
    );
}

// --- キーボードショートカット: Wキーのリンクラー通知 ---
// キーボードイベントリスナーを上書きして日本語通知にする
document.removeEventListener("keydown", document._fcKeydownHandler);
document._fcKeydownHandler = function (event) {
    if (!Game.promptOn && FrozenCookies.FCshortcuts) {
        if (event.keyCode == 65) {
            Game.Toggle("autoBuy", "autobuyButton", "オートバイ OFF", "オートバイ ON");
            toggleFrozen("autoBuy");
        }
        if (event.keyCode == 66) copyToClipboard(getBuildingSpread());
        if (event.keyCode == 67) {
            Game.Toggle("autoGC", "autogcButton", "GCオートクリック OFF", "GCオートクリック ON");
            toggleFrozen("autoGC");
        }
        if (event.keyCode == 69) copyToClipboard(Game.WriteSave(true));
        if (event.keyCode == 82) Game.Reset();
        if (event.keyCode == 83) Game.WriteSave();
        if (event.keyCode == 87) {
            Game.Notify(
                "リンクラー情報",
                "全リンクラーをポップすると " +
                    Beautify(wrinklerValue()) +
                    ' クッキーが得られます。<input type="button" value="ここをクリックして全リンクラーをポップ" onclick="Game.CollectWrinklers()"></input>',
                [19, 8],
                7
            );
        }
    }
};
document.addEventListener("keydown", document._fcKeydownHandler);
