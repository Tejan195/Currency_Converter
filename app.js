
const BASE_URL = "https://v6.exchangerate-api.com/v6/ba8e2fe7d7a707c5fa57fb06/latest";
const Amount  = document.getElementById("Amt");
const btn = document.getElementById("convertBtn");
const fromCurr = document.getElementById("fromCurr");
const toCurr = document.getElementById("toCurr");
const dropdown = document.querySelectorAll(".dropdown select");
const msg = document.querySelector(".msg");
for(let select of dropdown){
for(currCode in countryList ){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name ==="fromCurr" && currCode==="USD"){
        newOption.selected="selected";
    }else if(select.name==="toCurr"&&currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFLag(evt.target);
    });
}
const updateExchangeRate = async ()=>{
    let amount = document.getElementById("Amt");
    let amtVal = amount.value;
    if(amtVal ===""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    if(rate){
    let finalAmount= amtVal *rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
}else{
    msg.innerText="Exchange rate not found for ${toCurr.value}";
}
}
const updateFLag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });
