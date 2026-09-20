const exprEI=document.getElementById('expr');
const resultEI=document.getElementById('result');
let current = "0";
let previous = null;
let operator = null;
function updateDisplay(){
    resultEI.textContent= current;
}
function inputDigit(d){
    if(current==="0"){
        current=d;
    }
    else{
        current = current + d;
    }
}
function chooseOperator(op){
    previous = parseFloat(current);
    operator = op;
    current = "0";
}
function compute(){
    const a = previous;
    const b = parseFloat(current);
    let result;
    if(operator==="add")
        result = a + b;
    if(operator==="subtract")
        result = a-b;
    if(operator==="multiply")
        result = a*b;
    if(operator==="divide")
        result = a/b;
    current = String(result);
    operator = null;
    previous = null;
}
function clearAll(){
    current = "0";
    previous = null;
    operator = null;
}
document.querySelector('.keys').addEventListener('click',function(e){
    const btn  =e.target.closest('button');
    if(!btn)return;
    if(btn.dataset.num!==undefined){
        inputDigit(btn.dataset.num);
    }
    else if(btn.dataset.action==="clear"){
        clearAll();
    }
    else if(btn.dataset.action==="equals"){
        compute();
    }
    else if(["add","subtract","multiply","divide"].includes(btn.dataset.action)){
        chooseOperator(btn.dataset.action);
    }
    updateDisplay();
})
window.addEventListener('keydown',function(e){
const key = e.key;
if(key >='0' && key <='9'){
    inputDigit(key);
} 
else if(key==='+'){
    chooseOperator('add');
}
else if(key==='-'){
    chooseOperator('subtract');
}
else if(key==='*'){
    chooseOperator('multiply');
}
else if(key==='/'){
    chooseOperator('divide');
}
else if(key==='Enter'){
    compute();
}
else if(key==='Escape'){
    clearAll();
}
else if(key==='Backspace'){
if(current.length>1){
    current=current.slice(0, -1);
}
else{
    current = "0"
}}
updateDisplay();
})