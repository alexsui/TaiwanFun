const reviewForm=document.querySelector('#reviewForm');
const btn=document.querySelector("#submitBtn");
btn.addEventListener('click',(e)=>{
    const radios = document.getElementsByName("review[rating]");
    const fieldset=document.querySelector("fieldset");
    let p = document.createElement("p");
    p.textContent = "請選擇評分";
    p.classList.add("text-danger");
   
    if(radios[0].checked){
        fieldset.appendChild(p);
    }else{
        btn.setAttribute("type","submit");
        btn.click();
    }
})
