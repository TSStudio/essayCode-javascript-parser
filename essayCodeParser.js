var defaultlastfontstyle="font-size:15px;font-weight:normal;color:#000000;text-align:justify;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;";
var lastfontstyle="font-size:15px;font-weight:normal;color:#000000;text-align:justify;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;";
var inlabelstyle="";
var curLang="";
var essayCodeParserVersion="1.4.3";
var essayCodeVersion="1.1";
function existFunction(funcName){
    try{
        if(typeof(eval(funcName))=="function"){
            return true;
        }
    }catch(e){}
    return false;
}
function setfontstyle(t){
    t=t.replace(/[\(\)]/g,"");
    args=t.split(",");
    dargs=new Array();
    dargs[0]="15px";
    dargs[1]="normal";
    dargs[2]="#000000";
    dargs[3]="justify";
    dargs[4]="none";
    dargs[5]="-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif";
    for(i=0;i<6;i++){
        if(i>=args.length){break;}
        if(args[i]===""){continue;}
        else{dargs[i]=args[i];}
    }
    lastfontstyle="font-size:"+dargs[0]+";font-weight:"+dargs[1]+";color:"+dargs[2]+";text-align:"+dargs[3]+";text-decoration:"+dargs[4]+";font-family:"+dargs[5]+";";
    inlabelstyle=lastfontstyle.replace(/#/,",").replace(/"/,"&quot;");
    return "</font><font style=\""+inlabelstyle+"\">";
}
function image_parser(t){
    t=t.replace(/[\(\)]/g,"");
    if(t==""){
        return "Argument wrong Exception";
    }
    args=t.split(",");
    if(args.length>3){
        return "Argument wrong Exception";
    }
    if(args.length==1){
        return "<img src=\""+args[0]+"\" width=\"100%\" alt=\"image\">";
    }else if(args.length==2){
        return "<img src=\""+args[0]+"\" width=\""+args[1]+"\" alt=\"image\">";
    }
    return "<img src=\""+args[0]+"\" width=\""+args[1]+"\" alt=\""+args[2]+"\">";
}
function title_parser(t){
    t=t.replace(/[\(\)]/g,"");
    if(t==""){
        title="sample";
    }else{
        title=t;
    }
    return "</font></p><center><h1>"+title+"</h1></center><p><font style=\""+inlabelstyle+"\">";
}
function smalltitle_parser(t){
    t=t.replace(/[\(\)]/g,"");
    if(t==""){
        title="sample";
    }else{
        title=t;
    }
    return "</font></p><center><h3>"+title+"</h3></center><p><font style=\""+inlabelstyle+"\">";
}
function beginbox_parser(t){
    t=t.replace(/[\(\)]/g,"");
    if(t==""){
        return "</font></p><div><p><font>";
    }
    args=t.split(",");
    dargs=new Array();
    dargs[0]="100%";
    dargs[1]="center";
    dargs[2]="transparent";
    for(i=0;i<3;i++){
        if(i>=args.length){break;}
        if(args[i]===""){continue;}
        dargs[i]=args[i];
    }
    if(dargs[1]!="center"&&dargs[1]!="default"){
        return "PARSE ERROR";
    }
    arg="width:"+dargs[0]+";"+(dargs[1]=="center"?"margin:0 auto 0 auto;":"")+"background-color:"+dargs[2]+";";
    return "</font></p><div style=\""+arg+"\"><p><font style=\""+inlabelstyle+"\">";
}
function exp(code){
    code=code.replace(/ /g,"");
    if(code=="\\\\"){
        return "<br>";
    }else if(code=="\\par"){
        return "</font></p><p style=\"text-indent:2em\"><font style=\""+inlabelstyle+"\">";
    }else if(code=="\\backslash"){
        return "\\";
    }else if(code=="\\backquote"){
        return "`";
    }else if(code=="\\dollar"){
        return "$";
    }else if(code=="\\endbox()"){
        return "</font></p></div><p><font style=\""+inlabelstyle+"\">";
    }else if(code.substr(0,6)=="\\image"){
        return "</font>"+image_parser(code.substr(6,code.length))+"<font style=\""+inlabelstyle+"\">";
    }else if(code.substr(0,6)=="\\title"){
        return title_parser(code.substr(6,code.length));
    }else if(code.substr(0,8)=="\\setfont"){
        return setfontstyle(code.substr(8,code.length));
    }else if(code.substr(0,8)=="\\setlang"){
        return setlanguage(code.substr(8,code.length));
    }else if(code.substr(0,9)=="\\beginbox"){
        return beginbox_parser(code.substr(9,code.length));
    }else if(code.substr(0,11)=="\\smalltitle"){
        return smalltitle_parser(code.substr(11,code.length));
    }
}
var countFormula;
var countCode;
var countInlineCode;
var Formulas;
var Codes;
var CodesLang;
var inlineCodes;
function htmlEncode(html){
    var temp=document.createElement("div");
    (temp.textContent!=undefined)?(temp.textContent=html):(temp.innerText=html);
    var output=temp.innerHTML;
    temp=null;
    //output=output.replace(/ /g,"&nbsp;");
    return output;
}
function formulaprocessor(str){
    Formulas[countFormula]=str;
    countFormula++;
    return "EFSOSRAMYUCLOADEPARSERSERIALNO"+(countFormula-1).toString()+"ENDPPPVF";
}
var ci;
function langprocessor(str){
    if(str.replace(/\\CODE/g,"").replace(/[\(\)]/g,"")!=""){
        CodesLang[ci]=str.replace(/\\CODE/g,"").replace(/[\(\)]/g,"");
    }
    return "";
}
function codeprocessor(str){
    ci=countCode;
    CodesLang[ci]="";
    Codes[countCode]=htmlEncode(str.replace(/\\CODE(\([\s\S]*?\))?/g,langprocessor));
    countCode++;
    return "ECSOSDAEYCODEPARSERSERIALNO"+(countCode-1).toString()+"ENDPPPVF";
}
function inlineprocessor(str){
    inlineCodes[countInlineCode]=htmlEncode(str.replace(/`/g,""));
    countInlineCode++;
    return "ECSOSDAEYICNOLDIENPEARSERSERIALNO"+(countInlineCode-1).toString()+"ENDPPPVF";
}
function formulaback(str){
    for(i=0;i<countFormula;i++){
        str=str.replace("EFSOSRAMYUCLOADEPARSERSERIALNO"+i.toString()+"ENDPPPVF",("</font> "+Formulas[i]+" <font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function trim(str){
    return str.replace(/^\n+|\n+$/g,"");
}
function codeback(str){
    for(i=0;i<countCode;i++){
        str=str.replace("ECSOSDAEYCODEPARSERSERIALNO"+i.toString()+"ENDPPPVF",("</font></p><pre style=\"width:100%;overflow-x:auto;\"><code class=\"language-"+CodesLang[i]+"\">"+trim(Codes[i])+"</code></pre><p><font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function inlinecodeback(str){
    for(i=0;i<countInlineCode;i++){
        str=str.replace("ECSOSDAEYICNOLDIENPEARSERSERIALNO"+i.toString()+"ENDPPPVF",("</font><font style=\"background-color:#eeeeee;color:#020202;border:1px solid black;font-family:Consolas,Courier New;\">"+inlineCodes[i]+"</font><font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function parse(str){
    Formulas=new Array();
    Codes=new Array();
    CodesLang=new Array();
    inlineCodes=new Array();
    countFormula=0;
    countCode=0;
    countInlineCode=0;
    lastfontstyle=defaultlastfontstyle;
    inlabelstyle=lastfontstyle.replace(/"/,"&quot;");
    //protects formulas and codes
    str=str.replace(/`[\s\S]*?`/g,inlineprocessor);
    str=str.replace(/\\CODE[\s\S]*?\\CODE/g,codeprocessor);
    str=str.replace(/\$\$[\s\S]*?\$\$/g,formulaprocessor);
    str=str.replace(/\$[\s\S]*?\$/g,formulaprocessor);
    end="<p><font style=\""+inlabelstyle+"\">"+str.replace(/\\[a-zA-Z-\\]+(\([\s\S]*?\))?/g,exp)+"</font></p>";
    end=end+"<p>Rendered by essayCode Javascript Parser "+essayCodeParserVersion+" in essayCode "+essayCodeVersion+"</p>";
    end=formulaback(end);
    end=inlinecodeback(end);
    end=codeback(end);
    return end;
}