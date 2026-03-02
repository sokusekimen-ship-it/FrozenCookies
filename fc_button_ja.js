// InfoボタンをFrozen Cookiesボタンに置き換え、新しいメニューを追加します

$("#logButton").before(
    $("<div>")
        .attr("id", "fcButton")
        .addClass("button panelButton")
        .html("Frozen<br />Cookies")
        .click(function () {
            Game.ShowMenu("fc_menu");
        })
);

$("#logButton").hide();

$("<style>")
    .prop("type", "text/css")
    .text(
        "#fcEfficiencyTable {width: 100%;}" +
            "#fcButton {top: 0px; right: 0px; padding-top: 12px; font-size: 90%; background-position: -100px 0px;}" +
            ".worst {border-width:1px; border-style:solid; border-color:#330000;}" +
            ".bad {border-width:1px; border-style:solid; border-color:#660033;}" +
            ".average {border-width:1px; border-style:solid; border-color:#663399;}" +
            ".good {border-width:1px; border-style:solid; border-color:#3399FF;}" +
            ".best {border-width:1px; border-style:solid; border-color:#00FFFF;}" +
            ".ui-dialog {z-index:1000000;}"
    )
    .appendTo("head");

function getBuildingTooltip(purchaseRec) {
    var parent = $("<div>").prop("style", "min-width:300px;");
    parent.append(
        $("<div>")
            .addClass("price")
            .prop("style", "float:right;")
            .text(Beautify(purchaseRec.purchase.price))
    );
    parent.append($("<div>").addClass("name").text(purchaseRec.purchase.name));
    parent.append(
        $("<div>")
            .prop("style", "font-size:80%;")
            .text("[所持数: " + purchaseRec.purchase.amount + "]")
    );
    parent.append(
        $("<div>").addClass("description").html(purchaseRec.purchase.desc)
    );
    if (purchaseRec.delta_cps) {
        parent.append(
            $("<div>")
                .addClass("fc_cps")
                .html("Δ CPS: " + Beautify(purchaseRec.delta_cps))
        );
        parent.append(
            $("<div>")
                .addClass("fc_efficiency")
                .text(
                    "効率: " +
                        (
                            Math.floor(purchaseRec.efficiencyScore * 10000) /
                            100
                        ).toString() +
                        "%"
                )
        );
        parent.append(
            $("<div>")
                .addClass("fc_build_time")
                .text(
                    "建設時間: " +
                        timeDisplay(
                            divCps(
                                purchaseRec.cost + delayAmount(),
                                Game.cookiesPs
                            )
                        )
                )
        );
        parent.append(
            $("<div>")
                .addClass("fc_effective_build_time")
                .text(
                    "推定実効建設時間: " +
                        timeDisplay(
                            divCps(
                                purchaseRec.cost + delayAmount(),
                                effectiveCps()
                            )
                        )
                )
        );
    }
    return parent[0].outerHTML;
}

function getUpgradeTooltip(purchaseRec) {
    var parent = $("<div>").prop("style", "min-width:300px;");
    parent.append(
        $("<div>")
            .addClass("price")
            .attr("style", "float:right;")
            .text(Beautify(purchaseRec.purchase.getPrice()))
    );
    parent.append($("<div>").addClass("name").text(purchaseRec.purchase.name));
    parent.append($("<div>").prop("style", "font-size:80%;").text("[アップグレード]"));
    parent.append(
        $("<div>").addClass("description").html(purchaseRec.purchase.desc)
    );
    if (purchaseRec.delta_cps) {
        parent.append(
            $("<div>")
                .addClass("fc_cps")
                .html("Δ CPS: " + Beautify(purchaseRec.delta_cps))
        );
        parent.append(
            $("<div>")
                .addClass("fc_efficiency")
                .text(
                    "効率: " +
                        (
                            Math.floor(purchaseRec.efficiencyScore * 10000) /
                            100
                        ).toString() +
                        "%"
                )
        );
        parent.append(
            $("<div>")
                .addClass("fc_build_time")
                .text(
                    "建設時間: " +
                        timeDisplay(
                            divCps(
                                purchaseRec.cost + delayAmount(),
                                Game.cookiesPs
                            )
                        )
                )
        );
        parent.append(
            $("<div>")
                .addClass("fc_effective_build_time")
                .text(
                    "推定GC建設時間: " +
                        timeDisplay(
                            divCps(
                                purchaseRec.cost + delayAmount(),
                                effectiveCps()
                            )
                        )
                )
        );
    }
    return parent[0].outerHTML;
}

function colorizeScore(score) {
    var classNames = ["best", "good", "average", "bad", "worst"];
    var result;
    if (score == 1) {
        result = classNames[0];
    } else if (score > 0.9) {
        result = classNames[1];
    } else if (score > 0.1) {
        result = classNames[2];
    } else if (score > 0) {
        result = classNames[3];
    } else {
        result = classNames[4];
    }
    return result;
}

function rebuildStore(recalculate) {
    var store = $("#products"),
        recommendations = recommendationList(recalculate);

    store[0].innerHTML = "";
    Game.ObjectsById.forEach(function (me) {
        var purchaseRec = recommendations.filter(function (a) {
                return a.id == me.id && a.type == "building";
            })[0],
            button = $("<div>")
                .addClass("product")
                .addClass(colorizeScore(purchaseRec.efficiencyScore))
                .mouseenter(function () {
                    Game.tooltip.draw(
                        this,
                        escape(getBuildingTooltip(purchaseRec)),
                        0,
                        0,
                        "left"
                    );
                })
                .mouseleave(function () {
                    Game.tooltip.hide();
                })
                .click(function () {
                    Game.ObjectsById[me.id].buy();
                })
                .prop("id", "product" + me.id)
                .append(
                    $("<div>")
                        .addClass("icon")
                        .prop(
                            "style",
                            "background-image:url(img/" + me.icon + ".png);"
                        )
                );
        content = $("<div>").addClass("content");

        content.append($("<div>").addClass("title").html(me.displayName));
        content.append($("<div>").addClass("price").text(Beautify(me.price)));
        if (me.amount) {
            content.append(
                $("<div>").addClass("title owned").text(Beautify(me.amount))
            );
        }
        button.append(content);
        store.append(button);
    });
}

function rebuildUpgrades(recalculate) {
    var store = $("#upgrades"),
        recommendations = recommendationList(recalculate);
    store[0].innerHTML = "";
    Game.UpgradesInStore = Game.UpgradesById.filter(function (a) {
        return !a.bought && a.unlocked;
    }).sort(function (a, b) {
        return a.getPrice() - b.getPrice();
    });
    Game.UpgradesInStore.forEach(function (me) {
        var purchaseRec = recommendations.filter(function (a) {
            return a.id == me.id && a.type == "upgrade";
        })[0];
        if (!purchaseRec) {
            console.log(me.name + " が recommendationList() に見つかりません");
        } else {
            store.append(
                $("<div>")
                    .addClass("crate upgrade")
                    .addClass(colorizeScore(purchaseRec.efficiencyScore))
                    .mouseenter(function () {
                        Game.tooltip.draw(
                            this,
                            escape(getUpgradeTooltip(purchaseRec)),
                            0,
                            16,
                            "bottom-right"
                        );
                    })
                    .mouseleave(function () {
                        Game.tooltip.hide();
                    })
                    .click(function () {
                        Game.UpgradesById[me.id].buy();
                    })
                    .prop("id", "upgrade" + me.id)
                    .prop(
                        "style",
                        "background-position:" +
                            (-me.icon[0] * 48 + 6) +
                            "px " +
                            (-me.icon[1] * 48 + 6) +
                            "px;"
                    )
            );
        }
    });
}

if (typeof Game.oldUpdateMenu != "function") {
    Game.oldUpdateMenu = Game.UpdateMenu;
}

// カスタムスタイルを追加
(function () {
    var style = document.createElement("style");
    style.innerHTML = `
        .fc-multichoice-group-vertical {
            display: flex;
            flex-direction: column;
            gap: 4px;
            margin: 4px 0;
        }
        .fc-multichoice-btn,
        .option {
            background: #111;
            color: #fff;
            border: 1px solid #444;
            border-radius: 4px;
            padding: 4px 10px;
            margin: 0;
            cursor: pointer;
            font-size: 1em;
            text-align: left;
            transition: background 0.2s, color 0.2s, box-shadow 0.2s;
            opacity: 0.7;
            filter: grayscale(30%);
        }
        .fc-multichoice-group-vertical .selected,
        .option.selected {
            background: #222;
            color: #fff;
            font-weight: bold;
            opacity: 1;
            filter: none;
            box-shadow: 0 0 8px 2px #fff, 0 0 2px 1px #fff inset;
        }
        .fc-multichoice-group-2col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            margin: 4px 0;
        }
        .fc-multichoice-group-3col {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 4px;
            margin: 4px 0;
        }
        .fc-multichoice-btn:hover,
        .option:hover {
            background: #222;
            color: #fff;
            opacity: 1;
            filter: none;
            box-shadow: 0 0 8px 2px #fff, 0 0 2px 1px #cfc inset;
        }
        .fc-section-heading {
            font-variant: small-caps;
            font-weight: bold;
            letter-spacing: 1px;
            font-size: 1.1em;
            display: block;
            margin-bottom: 2px;
        }
        .fc-hint-label {
            font-size: smaller;
            color: #aaa;
            margin-bottom: 2px;
        }
        .fc-choose-one-label {
            font-size: smaller;
            color: #aaa;
            margin-bottom: 2px;
            margin-top: 10px;
        }
        .fc-warning {
            font-size: smaller;
            color: #a00;
            margin-bottom: 6px;
        }
    `;
    document.head.appendChild(style);
})();

function FCMenu() {
    Game.UpdateMenu = function () {
        if (Game.onMenu !== "fc_menu") {
            return Game.oldUpdateMenu();
        }
        if (!Game.callingMenu) {
            Game.callingMenu = true;
            setTimeout(() => {
                Game.callingMenu = false;
                Game.UpdateMenu();
            }, 1000);
        }
        var currentCookies,
            maxCookies,
            isTarget,
            isMax,
            targetTxt,
            maxTxt,
            currHC,
            resetHC,
            cps,
            baseChosen,
            frenzyChosen,
            clickStr,
            buildTable,
            bankLucky,
            bankLuckyFrenzy,
            bankChain,
            menu = $("#menu")
                .empty()
                .append(
                    $("<div>")
                        .addClass("section")
                        .text(
                            "Frozen Cookies v " +
                                FrozenCookies.branch +
                                "." +
                                FrozenCookies.version
                        )
                )
                .append(
                    $("<div>")
                        .addClass("listing")
                        .append(
                            $("<button>")
                                .attr("id", "fcOpenLogPanel")
                                .attr("title", "クッキークリッカーのバージョン情報パネルを開く")
                                .text("クッキークリッカー情報")
                                .click(openGameLogPanel)
                        )
                )
                .append(
                    $("<div>")
                        .addClass("listing")
                        .append(
                            $("<button>")
                                .attr("id", "fcOpenDocPage")
                                .attr("title", "Frozen Cookiesのreadme/ドキュメントページを開く")
                                .text("Frozen Cookies README")
                                .click(openDocumentationPage)
                        )
                );

        // --- 自動購入情報セクション ---
        (subsection = $("<div>")
            .addClass("subsection")
            .append($("<div>").addClass("title").text("自動購入情報"))),
            (recommendation = nextPurchase()),
            (chainRecommendation = nextChainedPurchase()),
            (isChained = !(
                recommendation.id == chainRecommendation.id &&
                recommendation.type == chainRecommendation.type
            )),
            (currentFrenzy = cpsBonus() * clickBuffBonus()),
            (bankLevel = bestBank(chainRecommendation.efficiency)),
            (actualCps =
                Game.cookiesPs +
                Game.mouseCps() *
                    FrozenCookies.cookieClickSpeed *
                    FrozenCookies.autoClick),
            (chocolateRecoup =
                (recommendation.type == "upgrade"
                    ? recommendation.cost
                    : recommendation.cost * 0.425) /
                (recommendation.delta_cps * 21));

        function buildListing(label, name) {
            return $("<div>")
                .addClass("listing")
                .append($("<b>").text(label + ":"), " ", name);
        }

        subsection.append(
            buildListing("次の購入", recommendation.purchase.name)
        );
        if (isChained) {
            subsection.append(
                buildListing("建物チェーン先", chainRecommendation.purchase.name)
            );
        }
        subsection.append(
            buildListing(
                "完了まで",
                timeDisplay(
                    divCps(
                        recommendation.cost + bankLevel.cost - Game.cookies,
                        actualCps
                    )
                )
            )
        );
        if (isChained) {
            subsection.append(
                buildListing(
                    "チェーン完了まで",
                    timeDisplay(
                        divCps(
                            Math.max(
                                0,
                                chainRecommendation.cost +
                                    bankLevel.cost -
                                    Game.cookies
                            ),
                            actualCps
                        )
                    )
                )
            );
        }
        if (Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg")) {
            subsection.append(
                buildListing(
                    "チョコレート回収まで",
                    timeDisplay(
                        divCps(
                            recommendation.cost + bankLevel.cost - Game.cookies,
                            effectiveCps()
                        ) + chocolateRecoup
                    )
                )
            );
        }
        subsection.append(buildListing("コスト", Beautify(recommendation.cost)));
        subsection.append(
            buildListing("ゴールデンクッキーバンク", Beautify(bankLevel.cost))
        );
        subsection.append(
            buildListing("ベース Δ CPS", Beautify(recommendation.base_delta_cps))
        );
        subsection.append(
            buildListing("フル Δ CPS", Beautify(recommendation.delta_cps))
        );
        subsection.append(
            buildListing("購入効率", Beautify(recommendation.efficiency))
        );
        if (isChained) {
            subsection.append(
                buildListing("チェーン効率", Beautify(chainRecommendation.efficiency))
            );
        }
        if (bankLevel.efficiency > 0) {
            subsection.append(
                buildListing("ゴールデンクッキー効率", Beautify(bankLevel.efficiency))
            );
        }
        menu.append(subsection);

        // --- オプションセクション ---
        if (FrozenCookies.preferenceValues) {
            subsection = $("<div>").addClass("subsection");
            subsection.append(
                $("<div>").addClass("title").text("Frozen Cookie 設定"),
                $("<div>")
                    .addClass("fc-warning")
                    .text(" ⚠️ 全てのオプションは即座に有効になります。")
            );
            _.keys(FrozenCookies.preferenceValues).forEach(function (preference) {
                var listing,
                    prefVal = FrozenCookies.preferenceValues[preference],
                    hint = prefVal.hint,
                    display = prefVal.display,
                    extras = prefVal.extras,
                    current = FrozenCookies[preference],
                    preferenceButtonId = preference + "Button";
                if (display && display.length > 0 && display.length > current) {
                    listing = $("<div>").addClass("listing");
                    if (hint) {
                        listing.append(
                            $("<label>")
                                .addClass("fc-hint-label")
                                .text(
                                    hint.replace(/\$\{(.+)\}/g, function (s, id) {
                                        return FrozenCookies[id];
                                    })
                                )
                        );
                    }
                    if (display.length === 2) {
                        var buttonGroup = $("<div>").addClass("fc-multichoice-group-2col");
                        display.forEach(function (label, idx) {
                            buttonGroup.append(
                                $("<button>")
                                    .addClass("option fc-multichoice-btn")
                                    .toggleClass("selected", idx === current)
                                    .prop("id", preferenceButtonId + "_" + idx)
                                    .click(function () {
                                        setPreferenceDirect(preference, idx);
                                    })
                                    .text(label)
                            );
                        });
                        listing.append(buttonGroup);
                    } else {
                        listing.append(
                            $("<div>").addClass("fc-choose-one-label").text("ひとつ選択:")
                        );
                        let groupClass = "fc-multichoice-group-vertical";
                        if (display.length > 8) {
                            groupClass = "fc-multichoice-group-3col";
                        } else if (display.length > 4) {
                            groupClass = "fc-multichoice-group-2col";
                        }
                        var buttonGroup = $("<div>").addClass(groupClass);
                        display.forEach(function (label, idx) {
                            buttonGroup.append(
                                $("<button>")
                                    .addClass("option fc-multichoice-btn")
                                    .toggleClass("selected", idx === current)
                                    .prop("id", preferenceButtonId + "_" + idx)
                                    .click(function () {
                                        setPreferenceDirect(preference, idx);
                                    })
                                    .text(label)
                            );
                        });
                        listing.append(buttonGroup);
                    }
                    if (extras) {
                        var extrasHtml =
                            typeof extras === "function"
                                ? extras(FrozenCookies)
                                : extras.replace(/\$\{(.+)\}/g, function (s, id) {
                                      return fcBeautify(FrozenCookies[id]);
                                  });
                        listing.append($(extrasHtml));
                    }
                    subsection.append(listing);
                }
                if (!display) {
                    listing = $("<div>").addClass("fc-section-heading");
                    if (hint) {
                        listing.append(
                            $("<br>"),
                            $("<label>").text(
                                hint.replace(/\$\{(.+)\}/g, function (s, id) {
                                    return FrozenCookies[id];
                                })
                            )
                        );
                    }
                    subsection.append(listing);
                }
            });
            menu.append(subsection);
        }

        // --- ゴールデンクッキー情報セクション ---
        subsection = $("<div>").addClass("subsection");
        subsection.append(
            $("<div>").addClass("title").text("ゴールデンクッキー情報")
        );
        currentCookies = Math.min(Game.cookies, FrozenCookies.targetBank.cost);
        maxCookies = bestBank(Number.POSITIVE_INFINITY).cost;
        isTarget = FrozenCookies.targetBank.cost == FrozenCookies.currentBank.cost;
        isMax = currentCookies == maxCookies;
        targetTxt = isTarget ? "" : " (建物バンク)";
        maxTxt = isMax ? " (最大)" : "";
        subsection.append(buildListing("現在のフレンジー", Beautify(currentFrenzy)));
        subsection.append(
            buildListing(
                "現在の平均クッキー価値" + targetTxt + maxTxt,
                Beautify(cookieValue(currentCookies))
            )
        );
        if (!isTarget) {
            subsection.append(
                buildListing("目標平均クッキー価値", Beautify(cookieValue(FrozenCookies.targetBank.cost)))
            );
        }
        if (!isMax) {
            subsection.append(
                buildListing("最大平均クッキー価値", Beautify(cookieValue(maxCookies)))
            );
        }
        subsection.append(
            buildListing("ラッキークッキー最大価値", Beautify(maxLuckyValue()))
        );
        subsection.append(
            buildListing("ラッキー最大値に必要なバンク", Beautify(maxLuckyValue() * 10))
        );
        subsection.append(
            buildListing(
                "チェーンクッキー最大価値",
                Beautify(calculateChainValue(chainBank(), Game.cookiesPs, 7 - Game.elderWrath / 3))
            )
        );
        subsection.append(
            buildListing("チェーン最大値に必要なバンク", Beautify(chainBank()))
        );
        subsection.append(
            buildListing("推定クッキーCPS", Beautify(gcPs(cookieValue(currentCookies))))
        );
        subsection.append(
            buildListing("ゴールデンクッキークリック数", Beautify(Game.goldenClicks))
        );
        if (FrozenCookies.showMissedCookies == 1) {
            subsection.append(
                buildListing("見逃したゴールデンクッキー", Beautify(Game.missedGoldenClicks))
            );
        }
        subsection.append(
            buildListing("前回のゴールデンクッキー効果", Game.shimmerTypes.golden.last)
        );
        menu.append(subsection);

        // --- フレンジー時間セクション ---
        subsection = $("<div>").addClass("subsection");
        subsection.append($("<div>").addClass("title").text("フレンジー時間"));
        $.each(
            Object.keys(FrozenCookies.frenzyTimes)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .reduce((result, rate) => {
                    result[parseInt(rate)] =
                        (result[parseInt(rate)] || 0) +
                        FrozenCookies.frenzyTimes[rate];
                    return result;
                }, {}),
            (rate, time) => {
                subsection.append(
                    buildListing(
                        "x" + Beautify(rate) + " での合計記録時間",
                        timeDisplay(time / 1000)
                    )
                );
            }
        );
        menu.append(subsection);

        // --- ヘブンリーチップ情報セクション ---
        subsection = $("<div>").addClass("subsection");
        subsection.append(
            $("<div>").addClass("title").text("ヘブンリーチップ情報")
        );
        currHC = Game.heavenlyChips;
        resetHC = Game.HowMuchPrestige(
            Game.cookiesReset + Game.cookiesEarned + wrinklerValue() + chocolateValue()
        );

        var showTiming = Date.now() - FrozenCookies.lastHCTime > 1000 * 60;
        subsection.append(buildListing("現在のHC", Beautify(Game.heavenlyChips)));
        subsection.append(buildListing("リセット後のHC", Beautify(resetHC)));
        if (showTiming) {
            subsection.append(buildListing("次のHCまでの推定時間", nextHC()));
        }
        if (currHC < resetHC) {
            if (showTiming) {
                subsection.append(
                    buildListing(
                        "最後のHCからの経過時間",
                        timeDisplay((Date.now() - FrozenCookies.lastHCTime) / 1000)
                    )
                );
                if (FrozenCookies.lastHCAmount - 1 >= currHC) {
                    subsection.append(
                        buildListing(
                            "最後のHC獲得にかかった時間",
                            timeDisplay(
                                (FrozenCookies.lastHCTime - FrozenCookies.prevLastHCTime) / 1000
                            )
                        )
                    );
                }
            }
            if (FrozenCookies.maxHCPercent > 0) {
                subsection.append(
                    buildListing("最大HC獲得/時", Beautify(FrozenCookies.maxHCPercent))
                );
            }
            subsection.append(
                buildListing(
                    "平均HC獲得/時",
                    Beautify(
                        (60 * 60 * (FrozenCookies.lastHCAmount - currHC)) /
                            ((FrozenCookies.lastHCTime - Game.startDate) / 1000)
                    )
                )
            );
            if (showTiming && FrozenCookies.lastHCAmount - 1 >= currHC) {
                subsection.append(
                    buildListing(
                        "前回の平均HC獲得/時",
                        Beautify(
                            (60 * 60 * (FrozenCookies.lastHCAmount - 1 - currHC)) /
                                ((FrozenCookies.prevLastHCTime - Game.startDate) / 1000)
                        )
                    )
                );
            }
        }
        menu.append(subsection);

        // --- 収穫（バンク）情報セクション ---
        if (FrozenCookies.setHarvestBankPlant) {
            subsection = $("<div>").addClass("subsection");
            subsection.append($("<div>").addClass("title").text("収穫情報"));
            subsection.append(buildListing("ベースCPS", Beautify(baseCps())));
            subsection.append(buildListing("収穫する植物", FrozenCookies.harvestPlant));
            subsection.append(
                buildListing("CpSの分数", FrozenCookies.harvestMinutes + " 分")
            );
            subsection.append(
                buildListing("バンクの最大割合", FrozenCookies.harvestMaxPercent * 100 + " %")
            );
            subsection.append(
                buildListing(
                    FrozenCookies.harvestPlant + " 1個 " +
                        (FrozenCookies.setHarvestBankPlant < 6 ? "収穫" : "爆発"),
                    Beautify(
                        (baseCps() * 60 * FrozenCookies.harvestMinutes *
                            FrozenCookies.harvestFrenzy * FrozenCookies.harvestBuilding) /
                            Math.pow(10, FrozenCookies.maxSpecials)
                    )
                )
            );
            subsection.append(
                buildListing(
                    "フル農園 " + (FrozenCookies.setHarvestBankPlant < 6 ? "収穫" : "爆発") +
                        " (36マス)",
                    Beautify(
                        (36 * baseCps() * 60 * FrozenCookies.harvestMinutes *
                            FrozenCookies.harvestFrenzy * FrozenCookies.harvestBuilding) /
                            Math.pow(10, FrozenCookies.maxSpecials)
                    )
                )
            );
            menu.append(subsection);
        }

        // --- その他情報セクション ---
        subsection = $("<div>").addClass("subsection");
        subsection.append($("<div>").addClass("title").html("その他の情報"));
        cps =
            baseCps() +
            baseClickingCps(FrozenCookies.cookieClickSpeed * FrozenCookies.autoClick);
        baseChosen = Game.hasBuff("Frenzy") ? "" : " (*)";
        frenzyChosen = Game.hasBuff("Frenzy") ? " (*)" : "";
        clickStr = FrozenCookies.autoClick ? " + オートクリック" : "";
        subsection.append(
            buildListing("ベースCPS" + clickStr + baseChosen, Beautify(cps))
        );
        subsection.append(
            buildListing("フレンジーCPS" + clickStr + frenzyChosen, Beautify(cps * 7))
        );
        subsection.append(
            buildListing("推定実効CPS", Beautify(effectiveCps()))
        );
        if (Game.HasUnlocked("Chocolate egg") && !Game.Has("Chocolate egg")) {
            subsection.append(
                buildListing("チョコレートエッグ価値", Beautify(chocolateValue()))
            );
            if (!Game.hasAura("Earth Shatterer")) {
                subsection.append(
                    buildListing("+ 大地の粉砕者", Beautify(chocolateValue(null, true)))
                );
            }
        }
        if (liveWrinklers().length > 0) {
            subsection.append(
                buildListing("リンクラー価値", Beautify(wrinklerValue()))
            );
        }
        subsection.append(buildListing("ゲームシード", Game.seed));
        menu.append(subsection);

        // --- 内部情報セクション ---
        subsection = $("<div>").addClass("subsection");
        subsection.append($("<div>").addClass("title").text("内部情報"));
        buildTable = $("<table>")
            .prop("id", "fcEfficiencyTable")
            .append(
                $("<tr>").append(
                    $("<th>").text("建物"),
                    $("<th>").text("効率%"),
                    $("<th>").text("効率"),
                    $("<th>").text("コスト"),
                    $("<th>").text("Δ CPS")
                )
            );
        recommendationList().forEach(function (rec) {
            var item = rec.purchase,
                chainStr = item.unlocked === 0 ? " (C)" : "";
            buildTable.append(
                $("<tr>").append(
                    $("<td>").append($("<b>").text(item.name + chainStr)),
                    $("<td>").text(
                        (Math.floor(rec.efficiencyScore * 10000) / 100).toString() + "%"
                    ),
                    $("<td>").text(Beautify(rec.efficiency)),
                    $("<td>").text(Beautify(rec.cost)),
                    $("<td>").text(Beautify(rec.delta_cps))
                )
            );
        });

        var dividers = [
            $("<tr>").append($("<td>").attr("colspan", "5").html("&nbsp;")),
            $("<tr>")
                .css("border-top", "2px dashed #999")
                .append($("<td>").attr("colspan", "5").html("&nbsp;")),
        ];

        var banks = [
            {
                name: "ラッキーバンク",
                cost: luckyBank(),
                efficiency: cookieEfficiency(Game.cookies, luckyBank()),
            },
            {
                name: "ラッキーフレンジーバンク",
                cost: luckyFrenzyBank(),
                efficiency: cookieEfficiency(Game.cookies, luckyFrenzyBank()),
            },
            {
                name: "チェーンバンク",
                cost: chainBank(),
                efficiency: cookieEfficiency(Game.cookies, chainBank()),
            },
        ];

        var elderWrathLevels = [
            { name: "誓約済み/なだめられた", level: 0 },
            { name: "一つの心/目覚めた", level: 1 },
            { name: "不満", level: 2 },
            { name: "完全な怒り/激怒", level: 3 },
        ];

        buildTable.append(dividers);
        banks.forEach(function (bank) {
            var deltaCps = effectiveCps(bank.cost) - effectiveCps();
            buildTable.append(
                $("<tr>").append(
                    $("<td>")
                        .attr("colspan", "2")
                        .append($("<b>").text(bank.name + (bank.deltaCps === 0 ? " (*)" : ""))),
                    $("<td>").text(Beautify(bank.efficiency)),
                    $("<td>").text(Beautify(Math.max(0, bank.cost - Game.cookies))),
                    $("<td>").text(Beautify(deltaCps))
                )
            );
        });

        buildTable.append(dividers);
        elderWrathLevels.forEach(function (wrath) {
            buildTable.append(
                $("<tr>").append(
                    $("<td>")
                        .attr("colspan", "2")
                        .append(
                            $("<b>").text(wrath.name + (Game.elderWrath === wrath.level ? " (*)" : ""))
                        ),
                    $("<td>")
                        .attr("colspan", "2")
                        .attr("title", "実効CPS対ベースCPSの比率")
                        .text(Beautify(effectiveCps(Game.cookies, wrath.level) / baseCps())),
                    $("<td>").text(
                        Beautify(effectiveCps(Game.cookies, wrath.level) - effectiveCps())
                    )
                )
            );
        });
        subsection.append($("<div>").addClass("listing").append(buildTable));
        menu.append(subsection);

        if (!Game.HasAchiev("Olden days"))
            subsection.append(
                $(
                    '<div id="oldenDays" style="text-align:right;width:100%;"><div ' +
                        Game.clickStr +
                        "=\"Game.SparkleAt(Game.mouseX,Game.mouseY);PlaySound('snd/tick.mp3');PlaySound('snd/shimmerClick.mp3');Game.Win('Olden days');Game.UpdateMenu();\" class=\"icon\" style=\"display:inline-block;transform:scale(0.5);cursor:pointer;width:48px;height:48px;background-position:" +
                        -12 * 48 +
                        "px " +
                        -3 * 48 +
                        'px;"></div></div>'
                )
            );
    };
}

function cyclePreference(preferenceName) {
    var preference = FrozenCookies.preferenceValues[preferenceName];
    if (preference) {
        var display = preference.display;
        var current = FrozenCookies[preferenceName];
        var preferenceButton = $("#" + preferenceName + "Button");
        if (display && display.length > 0 && preferenceButton && preferenceButton.length > 0) {
            var newValue = (current + 1) % display.length;
            preferenceButton[0].innerText = display[newValue];
            FrozenCookies[preferenceName] = newValue;
            FrozenCookies.recalculateCaches = true;
            Game.RefreshStore();
            Game.RebuildUpgrades();
            FCStart();
        }
    }
}

function setPreferenceDirect(preferenceName, value) {
    var preference = FrozenCookies.preferenceValues[preferenceName];
    if (preference) {
        FrozenCookies[preferenceName] = value;
        FrozenCookies.recalculateCaches = true;
        Game.RefreshStore();
        Game.RebuildUpgrades();
        FCStart();
    }
}

function openGameLogPanel() {
    Game.ShowMenu("log");
}

function openDocumentationPage() {
    window.open(
        "https://github.com/erbkaiser/FrozenCookies?tab=readme-ov-file#frozencookies",
        "_blank",
        "noopener,noreferrer,width=800,height=600"
    );
}
