var lastfontstyle="font-size:1em;font-weight:normal;color:#000000;text-align:left;text-decoration:none;font-family:\"黑体\",\"sans-serif\";";
var inlabelstyle=""
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
    dargs[0]="1em";
    dargs[1]="normal";
    dargs[2]="#000000";
    dargs[3]="left";
    dargs[4]="none";
    dargs[5]="\"黑体\"&\"sans-serif\"";
    for(i=0;i<6;i++){
        if(i>args.length){break;}
        if(args[i]==""){continue;}
        dargs[i]=args[i];
    }
    lastfontstyle="font-size:"+dargs[0]+";font-weight:"+dargs[1]+";color:"+dargs[2]+";text-align:"+dargs[3]+";text-decoration:"+dargs[4]+";font-family:"+dargs[5]+";";
    inlabelstyle=lastfontstyle.replace(/&/,",").replace(/"/,"&quot;");
    return "</font><font style=\""+inlabelstyle+"\">";
}
function image_parser(t){
    t=t.replace(/[\(\)]/g,"");
    if(t==""){
        return "Argument wrong Exception";
    }
    args=t.split(",");
    if(args.length>2){
        return "Argument wrong Exception";
    }
    if(args.length==1){
        return "<img src=\""+args[0]+"\" width=\"100%\">";
    }
    return "<img src=\""+args[0]+"\" width=\""+args[1]+"\">";
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
        if(i>args.length){break;}
        if(args[i]==""){continue;}
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
    return "EFSOSRAMYUCLOADEPARSERSERIALNO"+toString(countFormula-1);
}
function codeprocessor(str){
    Codes[countCode]=htmlEncode(str.replace(/\\CODE/g,""));
    countCode++;
    return "ECSOSDAEYCODEPARSERSERIALNO"+toString(countCode-1);
}
function inlineprocessor(str){
    inlineCodes[countInlineCode]=htmlEncode(str.replace(/`/g,""));
    countInlineCode++;
    return "ECSOSDAEYICNOLDIENPEARSERSERIALNO"+toString(countInlineCode-1);
}
function formulaback(str){
    for(i=0;i<countFormula;i++){
        str=str.replace("EFSOSRAMYUCLOADEPARSERSERIALNO"+toString(i),("</font> "+Formulas[i]+" <font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function codeback(str){
    for(i=0;i<countCode;i++){
        str=str.replace("ECSOSDAEYCODEPARSERSERIALNO"+toString(i),("</font></p><pre style=\"width:100%;background-color:#1E1E1E;color:#D4D4D4;font-family:&quot;Consolas&quot;,&quot;Courier New&quot;\">"+Codes[i]+"</pre><p><font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function inlinecodeback(str){
    for(i=0;i<countInlineCode;i++){
        str=str.replace("ECSOSDAEYICNOLDIENPEARSERSERIALNO"+toString(i),("</font><font style=\"background-color:#eeeeee;color:#020202;border:1px solid black;font-family:&quot;Consolas&quot;,&quot;Courier New&quot;\">"+inlineCodes[i]+"</font><font style=\""+inlabelstyle+"\">").replace(/\$/g,"$$$$"));
    }
    return str;
}
function parse(str){
    Formulas=new Array();
    Codes=new Array();
    inlineCodes=new Array();
    countFormula=0;
    countCode=0;
    countInlineCode=0;
    lastfontstyle="font-size:1em;font-weight:normal;color:#000000;text-align:left;text-decoration:none;font-family:\"黑体\",\"sans-serif\";";
    inlabelstyle=lastfontstyle.replace(/"/,"&quot;");
    //protects formulas and codes
    str=str.replace(/`[\s\S]*?`/g,inlineprocessor);
    str=str.replace(/\\CODE[\s\S]*?\\CODE/g,codeprocessor);
    str=str.replace(/\$\$[\s\S]*?\$\$/g,formulaprocessor);
    str=str.replace(/\$[\s\S]*?\$/g,formulaprocessor);
    end="<p><font>"+str.replace(/\\[a-zA-Z-\\]+(\([\s\S]*?\))?/g,exp)+"</font></p>";
    end=formulaback(end);
    end=inlinecodeback(end);
    end=codeback(end);
    return end;
}