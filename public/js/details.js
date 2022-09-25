document.getElementById('cal').onclick=function(){
    const height=Number(document.getElementById('h').value);
    // document.getE
    // console.log(document.getElementsByName('h').value)
    const weight=Number(document.getElementById('w').value);
    console.log(weight)
    const bmi=(weight/((height*height)/1000)).toFixed(2);
    console.log(bmi)
    document.getElementById('bmi').innerHTML=bmi;
    console.log(bmi)
}
// document.getElementById('fn').value= 'dskhkh'
// console.log(document.getElementById('fn').value)