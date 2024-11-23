
var SiteNameInp = document.querySelector('#SiteName');
var SiteUrlInp = document.querySelector('#SiteUrl');
var tableBody = document.querySelector('#tableBody')
var btnForm = document.querySelector('#btnForm')
var btnDelete = document.querySelector('#btnDelete')
var searchInp = document.querySelector('#searchInp')
var btnUpd = document.querySelector('#btnUpd')
var layerErorr = document.querySelector('#layerErorr')
var btnClose = document.querySelector('#btnClose')
var urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i;;
var namePattern = /^[A-Za-zأ-ي]{3,}$/;

// var for update function //
var updateIndex;

//     big array   //
var siteList  = [];






var warningBox = document.querySelector('#warningBox')
var warningBox2 = document.querySelector('#warningBox2')

//         check LS and push in array        //
if(localStorage.getItem('sites') !== null){



   siteList = JSON.parse(localStorage.getItem('sites'));
  
   display()

}  


//            btn add site          //
btnForm.addEventListener('click' , function(e){
    addSite ()

})


//        validation by regex          //
SiteNameInp.addEventListener('input' , function(){

    warningBox.style.opacity = '1'
    
    var nameVal = SiteNameInp.value;

    SiteNameInp.classList.add('invalid')

    if(namePattern.test(nameVal)){

        SiteNameInp.classList.replace( 'invalid','valid' )
        warningBox.style.opacity = '0'

       
    }else{

        SiteNameInp.classList.remove('valid')
        
    }

    
SiteNameInp.addEventListener('blur' , function(){

    SiteNameInp.style.boxShadow = 'none'
    warningBox.style.opacity = '0'

})



})


SiteUrlInp.addEventListener('input' , function(){

     warningBox2.style.opacity = '1'
    
    var inputVal = SiteUrlInp.value;
    SiteUrlInp.classList.add('invalid')

    if(urlPattern.test(inputVal)){
        SiteUrlInp.classList.replace('invalid' ,'valid' )
        warningBox2.style.opacity = '0'
    }else{

        SiteNameInp.classList.remove('valid')
        
    }
       
    SiteUrlInp.addEventListener('blur' , function(){

        SiteUrlInp.style.boxShadow = 'none'
        warningBox2.style.opacity = '0'


})

})


//           add sites in array          //
function addSite (){

    var inputVal = SiteUrlInp.value;
    var nameVal = SiteNameInp.value;

  

    
    
if(urlPattern.test(inputVal) &&  namePattern.test(nameVal)){

    oneSite = {
        name : SiteNameInp.value,
        url : SiteUrlInp.value,

    }

    siteList.push(oneSite)
    localStorage.setItem('sites' , JSON.stringify(siteList))

    display()
    clr()

} else{

    
layerErorr.classList.remove('d-none')

}
}

//          close by x icon               //
btnClose.addEventListener('click' , closeModal)

function closeModal(){
    layerErorr.classList.add('d-none')

}

//             close by press Escape          //
document.addEventListener('keyup' , function(e){
    if(e.key == 'Escape'){
        closeModal()

    }
   })

//                 close by click any place         //
layerErorr.addEventListener('click' ,  function(e){
    if(e.target.getAttribute('id') == 'layerErorr'){
    
        closeModal()
     }
    
      
    
    })

//                   display site info         //
function display(){

    cartona = "";
    for (var i = 0; i < siteList.length; i++) {    

        cartona += `<tr>
            <td>${i+1}</td>
           <td><h6 class="m-0">${siteList[i].name}</h6></td>
            <td><a target="_blank"  class="px-4" href="${siteList[i].url}"> <i class="fa-solid editMedia fa-eye me-2 "></i> Visit</a></td>
            <td><button onclick="deleteSite(${i})"  id="btnDelete" class="btn text-white px-4 btn-danger"><i class="fa-solid editMedia fa-trash-can me-2 "></i> Delete</button></td> 
            <td><button onclick="oneStepUpd(${i})"  type="text" class="btn btn-dark  text-white px-4"><i class="fa-solid  fa-wrench editMedia me-1"></i> Update </button></td></tr>`
           
            
                    
    }

    document.querySelector('#tableBody').innerHTML = cartona;


}

//                   clear inputs          //
function clr(){

      SiteNameInp.value = ""
      SiteUrlInp.value = ""
}

//                   delete site         //
function deleteSite(deleteIndex){



          siteList.splice(deleteIndex , 1)  
       
       localStorage.setItem('sites' ,JSON.stringify(siteList));
     
       display()

}

//                   search site          //
searchInp.addEventListener('input' ,searchSite )

function searchSite(){

    cartona = "";

var temp = searchInp.value;

    
    for (var i = 0; i < siteList.length; i++) {

        if( siteList[i].name.toLowerCase().includes(temp.toLowerCase()) ){

            cartona += `<tr>
            <td>${i+1}</td>
            <td><h6 class="m-0">${siteList[i].name}</h6></td>
            <td><a target="_blank"  class="px-4" href="${siteList[i].url}"> <i class="fa-solid editMedia fa-eye me-2 "></i> Visit</a></td>
            <td><button onclick="deleteSite(${i})" id="btnDelete" class="btn text-white px-4 btn-danger"><i class="fa-solid editMedia fa-trash-can me-2 "></i> Delete</button></td> 
            <td><button onclick="oneStepUpd(${i})"  type="text" class="btn btn-dark  text-white px-4"><i class="fa-solid fa-wrench editMedia me-1"></i> Update </button></td></tr>`
           
    }

    document.querySelector('#tableBody').innerHTML = cartona;

}
 


}

//                   update site          //
function oneStepUpd(demo){

    updateIndex = demo

    btnForm.classList.add('d-none')
    btnUpd.classList.remove('d-none')



    SiteNameInp.value = siteList[demo].name
    SiteUrlInp.value = siteList[demo].url


}

btnUpd.addEventListener('click' ,endUpd )

function endUpd(){

    btnForm.classList.remove('d-none')
    btnUpd.classList.add('d-none')



     siteList[updateIndex].name = SiteNameInp.value 
     siteList[updateIndex].url = SiteUrlInp.value 


     
localStorage.setItem('sites' ,JSON.stringify(siteList));
display()
clr()



}


//                   background Animated          //

VANTA.NET({

    el: ":root",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00
  })


var setVanta = ()=>{
if (window.VANTA) window.VANTA.NET({
  el: ".s-page-1 .s-section-1 .s-section",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00
})
}
_strk.push(function() {
  setVanta()
  window.edit_page.Event.subscribe( "Page.beforeNewOneFadeIn", setVanta )
})







































































