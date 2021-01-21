console.log(`weather page`);



const searchForm=document.querySelector("form");
const searchInput=document.querySelector("input");
const messageOne=document.querySelector("#message1");
const message2=document.querySelector("#message2");


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    //console.log(`submt`);
    const location=searchInput.value;
    messageOne.textContent="Loading...";
    fetch(`http://localhost:3001/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
            //console.log(data.error);
        }else{
            messageOne.textContent=data.location;
            message2.textContent=data.forcast;            console.log(data.location);
            //console.log(data.forcast)
        }

    })

});
})