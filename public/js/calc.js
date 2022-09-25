
let totalcal=0;
let reqcal=1200
const breakfast=new Map();
breakfast.set("eggs(1 serve)",32);
breakfast.set("milk(1 cup)",64);
breakfast.set("bread(1 slice)",66);
breakfast.set("cereal(1 bowl)",100);

const lunch=new Map();
lunch.set("not had yet",0);
lunch.set("roti(1 serve)",70);
lunch.set("bowl of rice(1 bowl)",189);
lunch.set("vegetable sabzi(1 bowl)",145);

const dinner=new Map();
dinner.set("not had yet",0);
dinner.set("roti(1 serve)",70);
dinner.set("bowl of rice(1 bowl)",189);
dinner.set("vegetable sabzi(1 bowl)",145);
dinner.set("paneer(100g)",270);
dinner.set("soya(100g)",330);



let ans
let output
let q
document.getElementById("submitfood1").onclick=function () {
        console.log('gyfyfytfs');
        selectElement = document.querySelector('#optionsel1');
        output = selectElement.value;
        console.log(output)
        ans=breakfast.get(output);
        console.log(ans);
        q=document.getElementById("dinq1").value
        console.log(q)
        totalcal+=ans*q;
        console.log(totalcal)
    }

    document.getElementById("submitfood2").onclick=function () {
        console.log('gyfyfytfs');
        selectElement = document.querySelector('#optionsel2');
        output = selectElement.value;
        console.log(output)
        ans=lunch.get(output);
        console.log(ans);
        totalcal+=ans;
        q=document.getElementById("dinq2").value
        console.log(q)
        totalcal+=ans*q;
        console.log(totalcal)
    }

    document.getElementById("submitfood3").onclick=function () {
        console.log('gyfyfytfs');
        selectElement = document.querySelector('#optionsel3');
        output = selectElement.value;
        console.log(output)
        ans=dinner.get(output);
        console.log(ans);
        totalcal+=ans;
        q=document.getElementById("dinq3").value
        console.log(q)
        totalcal+=ans*q;
        console.log(totalcal)
    }
    
    document.getElementById("finalsubmit").onclick=function(){
        document.getElementById("progresscal").innerHTML=`Calories Intake uptill Now:${totalcal} <br> Goal: 1200 <br> Remaining:${1200-totalcal}`;
        if(1200-totalcal<0) {
            window.alert("OOOPS!!! YOU HAVE CROSSED THE DESIRED LIMIT! ")
        }
    }
    
  
    
  
  