var essayCodeParserVersion = "1.5.2";
var essayCodeVersion = "1.1";
var lastfontstyle = "";
var defaultfontstyle = new Array();
var dargs;
var lastpstyle = "text-align:justify;";
defaultfontstyle[0] = "15px";
defaultfontstyle[1] = "normal";
defaultfontstyle[2] = "#000000";
defaultfontstyle[3] = "justify";
defaultfontstyle[4] = "none";
defaultfontstyle[5] =
    "-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif";
var inlabelstyle = "";
var curLang = "";
function existFunction(funcName) {
    try {
        if (typeof eval(funcName) == "function") {
            return true;
        }
    } catch (e) {}
    return false;
}
function setfontstyle(t) {
    t = t.replace(/[\(\)]/g, "");
    args = t.split(",");
    if (args.length < 4 || args[3] != dargs[3]) {
        dargs = new Array();
        dargs[0] = defaultfontstyle[0];
        dargs[1] = defaultfontstyle[1];
        dargs[2] = defaultfontstyle[2];
        dargs[3] = defaultfontstyle[3];
        dargs[4] = defaultfontstyle[4];
        dargs[5] = defaultfontstyle[5];
        for (i = 0; i < 6; i++) {
            if (i >= args.length) {
                break;
            }
            if (args[i] === "") {
                continue;
            } else {
                dargs[i] = args[i];
            }
        }
        lastpstyle = "text-align:" + dargs[3] + ";";
        lastfontstyle =
            "font-size:" +
            dargs[0] +
            ";font-weight:" +
            dargs[1] +
            ";color:" +
            dargs[2] +
            ";text-decoration:" +
            dargs[4] +
            ";font-family:" +
            dargs[5] +
            ";";
        inlabelstyle = lastfontstyle.replace(/%/, ",").replace(/"/, "&quot;");
        return (
            '</span></p><p style="' +
            lastpstyle +
            '"><span style="' +
            inlabelstyle +
            '">'
        );
    }
    dargs = new Array();
    dargs[0] = defaultfontstyle[0];
    dargs[1] = defaultfontstyle[1];
    dargs[2] = defaultfontstyle[2];
    dargs[3] = defaultfontstyle[3];
    dargs[4] = defaultfontstyle[4];
    dargs[5] = defaultfontstyle[5];
    for (i = 0; i < 6; i++) {
        if (i >= args.length) {
            break;
        }
        if (args[i] === "") {
            continue;
        } else {
            dargs[i] = args[i];
        }
    }
    lastfontstyle =
        "font-size:" +
        dargs[0] +
        ";font-weight:" +
        dargs[1] +
        ";color:" +
        dargs[2] +
        ";text-decoration:" +
        dargs[4] +
        ";font-family:" +
        dargs[5] +
        ";";
    inlabelstyle = lastfontstyle.replace(/%/, ",").replace(/"/, "&quot;");
    return '</span><span style="' + inlabelstyle + '">';
}
function image_parser(t) {
    t = t.replace(/[\(\)]/g, "");
    if (t == "") {
        return "Argument wrong Exception";
    }
    args = t.split(",");
    if (args.length > 3) {
        return "Argument wrong Exception";
    }
    if (args.length == 1) {
        return '<img src="' + args[0] + '" width="100%" alt="image">';
    } else if (args.length == 2) {
        return (
            '<img src="' + args[0] + '" width="' + args[1] + '" alt="image">'
        );
    }
    return (
        '<img src="' +
        args[0] +
        '" width="' +
        args[1] +
        '" alt="' +
        args[2] +
        '">'
    );
}
function title_parser(t) {
    t = t.replace(/[\(\)]/g, "");
    if (t == "") {
        title = "sample";
    } else {
        title = t;
    }
    return (
        "</span></p><center><h1>" +
        title +
        '</h1></center><p style="' +
        lastpstyle +
        '"><span style="' +
        inlabelstyle +
        '">'
    );
}
function smalltitle_parser(t) {
    t = t.replace(/[\(\)]/g, "");
    if (t == "") {
        title = "sample";
    } else {
        title = t;
    }
    return (
        "</span></p><center><h3>" +
        title +
        '</h3></center><p style="' +
        lastpstyle +
        '"><span style="' +
        inlabelstyle +
        '">'
    );
}
function beginbox_parser(t) {
    t = t.replace(/[\(\)]/g, "");
    if (t == "") {
        return '</span></p><div><p style="' + lastpstyle + '"><span>';
    }
    args = t.split(",");
    dargs = new Array();
    dargs[0] = "100%";
    dargs[1] = "center";
    dargs[2] = "transparent";
    for (i = 0; i < 3; i++) {
        if (i >= args.length) {
            break;
        }
        if (args[i] === "") {
            continue;
        }
        dargs[i] = args[i];
    }
    if (dargs[1] != "center" && dargs[1] != "default") {
        return "PARSE ERROR";
    }
    arg =
        "width:" +
        dargs[0] +
        ";" +
        (dargs[1] == "center" ? "margin:0 auto 0 auto;" : "") +
        "background-color:" +
        dargs[2] +
        ";";
    return (
        '</span></p><div style="' +
        arg +
        '"><p style="' +
        lastpstyle +
        '"><span style="' +
        inlabelstyle +
        '">'
    );
}
function exp(code) {
    code = code.replace(/ /g, "");
    if (code == "\\\\") {
        return "<br>";
    } else if (code == "\\par") {
        return (
            '</span></p><p style="text-indent:2em;' +
            lastpstyle +
            '"><span style="' +
            inlabelstyle +
            '">'
        );
    } else if (code == "\\backslash") {
        return "\\";
    } else if (code == "\\backquote") {
        return "`";
    } else if (code == "\\dollar") {
        return "$";
    } else if (code == "\\endbox()") {
        return (
            '</span></p></div><p style="' +
            lastpstyle +
            '"><span style="' +
            inlabelstyle +
            '">'
        );
    } else if (code.substr(0, 6) == "\\image") {
        return (
            "</span>" +
            image_parser(code.substr(6, code.length)) +
            '<span style="' +
            inlabelstyle +
            '">'
        );
    } else if (code.substr(0, 6) == "\\title") {
        return title_parser(code.substr(6, code.length));
    } else if (code.substr(0, 8) == "\\setfont") {
        return setfontstyle(code.substr(8, code.length));
    } else if (code.substr(0, 8) == "\\setlang") {
        return setlanguage(code.substr(8, code.length));
    } else if (code.substr(0, 9) == "\\beginbox") {
        return beginbox_parser(code.substr(9, code.length));
    } else if (code.substr(0, 11) == "\\smalltitle") {
        return smalltitle_parser(code.substr(11, code.length));
    }
}
var countFormula;
var countCode;
var countInlineCode;
var Formulas;
var Codes;
var CodesLang;
var inlineCodes;
function htmlEncode(html) {
    var temp = document.createElement("div");
    temp.textContent != undefined
        ? (temp.textContent = html)
        : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    //output=output.replace(/ /g,"&nbsp;");
    return output;
}
function formulaprocessor(str) {
    Formulas[countFormula] = str;
    countFormula++;
    return (
        "EFSOSRAMYUCLOADEPARSERSERIALNO" +
        (countFormula - 1).toString() +
        "ENDPPPVF"
    );
}
var ci;
function langprocessor(str) {
    if (str.replace(/\\CODE/g, "").replace(/[\(\)]/g, "") != "") {
        CodesLang[ci] = str.replace(/\\CODE/g, "").replace(/[\(\)]/g, "");
        // remove \n at start
        CodesLang[ci] = CodesLang[ci].replace(/^\n+/, "");
    }
    return "";
}
function codeprocessor(str) {
    ci = countCode;
    CodesLang[ci] = "";
    Codes[countCode] = htmlEncode(
        str.replace(/\\CODE(\([\s\S]*?\))?/g, langprocessor)
    );
    countCode++;
    return (
        "ECSOSDAEYCODEPARSERSERIALNO" + (countCode - 1).toString() + "ENDPPPVF"
    );
}
function inlineprocessor(str) {
    inlineCodes[countInlineCode] = htmlEncode(str.replace(/`/g, ""));
    countInlineCode++;
    return (
        "ECSOSDAEYICNOLDIENPEARSERSERIALNO" +
        (countInlineCode - 1).toString() +
        "ENDPPPVF"
    );
}
function formulaback(str) {
    for (i = 0; i < countFormula; i++) {
        str = str.replace(
            "EFSOSRAMYUCLOADEPARSERSERIALNO" + i.toString() + "ENDPPPVF",
            (
                "</span> " +
                Formulas[i] +
                ' <span style="' +
                inlabelstyle +
                '">'
            ).replace(/\$/g, "$$$$")
        );
    }
    return str;
}
function trim(str) {
    return str.replace(/^\n+|\n+$/g, "");
}
function codeback(str) {
    for (i = 0; i < countCode; i++) {
        str = str.replace(
            "ECSOSDAEYCODEPARSERSERIALNO" + i.toString() + "ENDPPPVF",
            (
                '</span></p><pre style="width:100%;overflow-x:auto;"><code class="language-' +
                CodesLang[i] +
                '">' +
                trim(Codes[i]) +
                '</code></pre><p style="' +
                lastpstyle +
                '"><span style="' +
                inlabelstyle +
                '">'
            ).replace(/\$/g, "$$$$")
        );
    }
    return str;
}
function inlinecodeback(str) {
    for (i = 0; i < countInlineCode; i++) {
        str = str.replace(
            "ECSOSDAEYICNOLDIENPEARSERSERIALNO" + i.toString() + "ENDPPPVF",
            (
                '</span><span style="display:inline-block;background-color:#eeeeee;color:#020202;border:1px solid black;font-family:Consolas,Courier New;text-indent:0;">' +
                inlineCodes[i] +
                '</span><span style="' +
                inlabelstyle +
                '">'
            ).replace(/\$/g, "$$$$")
        );
    }
    return str;
}
function parse(str) {
    Formulas = new Array();
    Codes = new Array();
    CodesLang = new Array();
    inlineCodes = new Array();
    countFormula = 0;
    countCode = 0;
    countInlineCode = 0;
    dargs = new Array();
    dargs[0] = defaultfontstyle[0];
    dargs[1] = defaultfontstyle[1];
    dargs[2] = defaultfontstyle[2];
    dargs[3] = defaultfontstyle[3];
    dargs[4] = defaultfontstyle[4];
    dargs[5] = defaultfontstyle[5];
    lastfontstyle =
        "font-size:" +
        dargs[0] +
        ";font-weight:" +
        dargs[1] +
        ";color:" +
        dargs[2] +
        ";text-decoration:" +
        dargs[4] +
        ";font-family:" +
        dargs[5] +
        ";";
    inlabelstyle = lastfontstyle.replace(/"/, "&quot;");
    //protects formulas and codes
    str = str.replace(/`[\s\S]*?`/g, inlineprocessor);
    str = str.replace(/\\CODE[\s\S]*?\\CODE/g, codeprocessor);
    str = str.replace(/\$\$[\s\S]*?\$\$/g, formulaprocessor);
    str = str.replace(/\$[\s\S]*?\$/g, formulaprocessor);
    end =
        '<p style="' +
        lastpstyle +
        '"><span style="' +
        inlabelstyle +
        '">' +
        str.replace(/\\[a-zA-Z-\\]+(\([\s\S]*?\))?/g, exp) +
        "</span></p>";
    end = formulaback(end);
    end = inlinecodeback(end);
    end = codeback(end);
    return end;
}
