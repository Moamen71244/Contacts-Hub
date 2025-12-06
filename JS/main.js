
let addBtn = document.getElementById("addBtn");
let formInputs = document.getElementById("formInputs");
let contactImageInput = document.getElementById("contactImageInput");
let nameInput = document.getElementById("nameInput"); 
let phoneNumberInput = document.getElementById("phoneNumberInput"); 
let emailInput = document.getElementById("emailInput"); 
let addressInput = document.getElementById("addressInput"); 
let emergency = document.getElementById("emergency"); 
let favorite = document.getElementById("favorite"); 
let group = document.getElementById("group"); 
let note = document.getElementById("note"); 
let closeBtn = document.getElementById("closeBtn"); 
let cancel = document.getElementById("cancel"); 
let submetAdd = document.getElementById("save"); 
let updateBtn = document.getElementById("update");
let totalContacts = document.getElementById("totalContacts"); 
let fsvoriteContacts = document.getElementById("fsvoriteContacts"); 
let emergencyContacts = document.getElementById("emergencyContacts"); 
let allContactsCards = document.getElementById("allContactsCards"); 
let favContacts = document.getElementById("favContacts"); 
let emyContacts = document.getElementById("emyContacts"); 
let contactImage = document.getElementById("contactImage"); 
let searchInput = document.getElementById("searchInput"); 
let manageNum = document.getElementById("manageNum"); 
var color = "";
var hideImage  ="";
var hideLetter ="";
var globalIndex =-1 ;
var ignoreIndex =-1;
var numOfFav = localStorage.getItem("numberOfFavContacts");
var numOfEmy = localStorage.getItem("numberOfEmyContacts");


var allContacts = [];
if (localStorage.getItem("contactsList")) {
    allContacts =  JSON.parse(localStorage.getItem("contactsList"));
    display();
}





addBtn.addEventListener('click',function(){
    formInputs.classList.remove("d-none");
    contactImage.innerHTML = ' <i class="fa-solid text-white fa-user display-5"></i>'
})


cancel.addEventListener('click',function(){
    formInputs.classList.add("d-none");
})
closeBtn.addEventListener('click',function(){
    formInputs.classList.add("d-none");
})



// -------------------------------------------------------------------------------------------------------------






submetAdd.addEventListener('click',function(){

    if (validationInputs(nameInput,"nameAlert") && validationInputs(emailInput,"emailAlert") && validationInputs(phoneNumberInput,"phoneAlert") && checkDuplicate(phoneNumberInput.value,-1) === -1) {

        var contact = getDataFromTheForm();
         allContacts.push(contact);
         localStorage.setItem("contactsList", JSON.stringify(allContacts) )
         display();
         clearInputs();
         formInputs.classList.add("d-none");
         nameInput.classList.remove("is-valid");
         phoneNumberInput.classList.remove("is-valid");
         emailInput.classList.remove("is-valid");
         Swal.fire({
             title: "Good job!",
             text: "You clicked the button!",
             icon: "success"
           });

    }else if(!validationInputs(nameInput,"nameAlert")){
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Please enter a valid name (letters & spaces only, 2–50 characters).",
        });
      }else if(!validationInputs(phoneNumberInput,"phoneAlert")){
        Swal.fire({
            icon: "error",
            title: "Invalid Phone Number",
            text: "Please enter a valid Egyptian phone number (e.g., 01018971244 or +201018971244)",
        });
      }else if (!validationInputs(emailInput,"emailAlert")){
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email format.",
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${allContacts[checkDuplicate(phoneNumberInput.value,-1)].name}`,
        });

    }
   x =  randomGradient();
})


function getDataFromTheForm(){

    

    var contact = {

            image: contactImageInput.files[0]?.name,
            name: nameInput.value,
            phone: phoneNumberInput.value,
            email:emailInput.value,
            address:addressInput.value,
            emergency:emergency.checked,
            favorite:favorite.checked,
            note:note.value,
            group:group.value,
            gradient: randomGradient()    
       
        
    }

  return contact;
}

function clearInputs(){
    nameInput.value = "";
    phoneNumberInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    emergency.checked = false;
    favorite.checked = false;
    group.value = "";
    note.value = "";
    contactImageInput.value="";
}

function display(){
    var box = "";
    var fav="";
    var emy="";
    totalContacts.innerHTML = allContacts.length;
    addNewCard(box);
    addToFav(fav);
    addToEmy(emy);
    fsvoriteContacts.innerHTML =numOfFav;
    emergencyContacts.innerHTML =numOfEmy;
    manageNum.innerHTML = allContacts.length;
}

function calcFSletters(i){
    var nameWords = allContacts[i].name.split(" ")
    var firstL = nameWords[0][0];
    var secondL = nameWords[1][0];
    return firstL+secondL;
}

function checkFav(i){
    if (allContacts[i].favorite) {
        return " "
    }
    return " d-none "
}
function checkEmy(i){
    if (allContacts[i].emergency) {
        return " "
    }
    return " d-none "
}
function checkUnFav(i){
    if (allContacts[i].favorite) {
       
        return " d-none "
    }
    return " "
}
function checkUnEmy(i){
    if (allContacts[i].emergency) {
        return " d-none "
    }
    return " "
}

function createCards(list){
    var addedCards ="";
    for (let index = 0; index < list.length; index++) {

 
        if (!list[index].image) {
             hideImage = "d-none"
             hideLetter = " "
    
        }else{
             hideImage = " "
              hideLetter = "d-none"
        }
        
        addedCards += 
        
    
        `        
          <div class="card col-12 col-md-6 contact-card p-2 rounded-4 bg-transparent border-0">
                    <div class="contact-details spechial-hover p-3 bg-white rounded-4">
                <div class="d-flex align-items-center">
                                <div id="userImage" class="avatar rounded-3 position-relative  flex-shrink-0 me-3" style="background-image: ${allContacts[index].gradient}">
                        <img src="${list[index].image ? 'images/' + list[index].image : ''}" class="w-100 ${hideImage} rounded-3" alt="">
                        <p class="mb-0 ${hideLetter} ">${calcFSletters(index)}</p>
    
                        <span
                            class="${checkFav(index)} position-absolute d-flex align-items-center justify-content-center fav-flag rounded-circle">
                            <i class="fa-solid fa-star text-white"></i>
                        </span>
                        <span
                            class="${checkEmy(index)} position-absolute d-flex align-items-center justify-content-center em-flag rounded-circle">
                            <i class="fa-solid text-white fa-heart-pulse"></i>
                        </span>
                    </div>
    
                    <div class="user-details">
                        <p class="name fw-bold mb-1 mb-0">${list[index].name}</p>
                        <p class="phone d-flex align-items-center mb-1 text-secondary small ">
                            
                            <span class="rounded-3 user-d me-2"><i class="fa-solid fa-phone tel"></i></span>
                            
                            ${list[index].phone}
                        </p>
                    </div>
                </div>
                <div class="w-100 mt-2">
                    <p class="email d-flex align-items-center mb-1 text-secondary small">
                        <span class="rounded-3 user-d  me-2"><i class="fa-solid fa-envelope mail"></i></span>
                        ${list[index].email}
                    </p>
                    <p class="location d-flex align-items-center mb-0 text-secondary small">
                        <span class="rounded-3 user-d  me-2"><i class="fa-solid fa-location-dot mail"></i></span>
                        ${list[index].address}
    
                    </p>
                </div>
    
                <div class="tags-actions">
                    <div class="tags my-2">
                        <span class="tag tag-${list[index].group.toLocaleLowerCase()} me-2">${list[index].group}</span>
                        <span class="tag tag-emergency ${checkEmy(index)}">Emergency</span>
                    </div>
                    <div class="actions pt-3 border-top d-flex align-items-center text-muted">
                        <span  class=" rounded-3 user-d action-icon2 me-2"><a href="tel:${list[index].phone}"><i class="fa-solid fa-phone mail"></i></a></span>
                        <span  class=" rounded-3 user-d action-icon1  me-2"><a href="mailto:moamenahmed0922@gmail.com"><i class="fa-solid fa-envelope mail"></i></a></span>
                        <div  class=" ms-auto d-flex column-gap-3">
                            <span class=" ${checkUnFav(index)} star-i"    onclick="toggleFav(${index})"  ><i class=" fa-regular fa-star action-icon"></i></span>
                            <span class=" ${checkFav(index)} star-i-fav" onclick="toggleFav(${index})"  ><i class=" fa-solid fa-star action-icon" style="color: #FFD43B;"></i></span>
                            <span class=" ${checkUnEmy(index)} heart-i"    onclick="toggleEmy(${index})"  ><i class=" fa-regular fa-heart action-icon"></i></span>
                            <span class=" ${checkEmy(index)} heart-i-emy" onclick="toggleEmy(${index})"  ><i class=" fa-solid fa-heart-pulse" style="color: red;"></i></span>
                            <span class="pen-i "     onclick="upDataToForm(${index})" ><i class=" fa-solid fa-pen action-icon"></i></span>
                            <span class=" trash-i"    onclick="deleteContact(${index})" ><i class=" fa-solid fa-trash action-icon"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    `
    }

    return addedCards;

}
function addNewCard(box){

box = createCards(allContacts);


allContactsCards.innerHTML = box;

}

function addToFav(fav){
    var numberofFav=0;
    
    for (let index = 0; index < allContacts.length; index++) {
        if (!allContacts[index].image) {
            hideImage = "d-none"
            hideLetter = " "
   
       }else{
             hideImage = " "
             hideLetter = "d-none"
       }
        if (allContacts[index].favorite) {
            
            numberofFav++;
            fav += `
                    <div class="contact p-2 rounded-3 d-flex align-items-center">
                                <div id="userImage" class="avatar rounded-3 position-relative  flex-shrink-0 me-3" style="background-image: ${allContacts[index].gradient}">
                               <img src="${allContacts[index].image ? 'images/' + allContacts[index].image : ''}" class="w-100 ${hideImage} rounded-3" alt="user">
                               <p class="mb-0 ${hideLetter} ">${calcFSletters(index)}</p>
                           </div>
                        <div class="desc text-start">
                            <p class="h7 fw-bold mb-0">${allContacts[index].name}</p>
                            <p class="mb-0 fs-8 text-muted ">${allContacts[index].phone}</p>
                        </div>
                        <span  class="rounded-3 ratio-1x1 d-flex justify-content-center align-items-center action-icon2 fav-icon ms-auto"><a href="tel:${allContacts[index].phone}"><i class="fa-solid fa-phone mail"></i></a></span>
                    </div>
            `;
        }

    }
    if (numberofFav === 0) {
        favContacts.innerHTML = '<p class="text-muted m-0">No favorites Contacts</p>';
    }else{

        favContacts.innerHTML = fav;
    }
    numOfFav = numberofFav;
    localStorage.setItem("numberOfFavContacts",numOfFav)

}

function addToEmy(emy){
    var emynumbers = 0
    for (let index = 0; index < allContacts.length; index++) {
        if (!allContacts[index].image) {
            hideImage = "d-none"
            hideLetter = " "
   
       }else{
             hideImage = " "
             hideLetter = "d-none"
       }
        if (allContacts[index].emergency) {

            emynumbers++;
            
            emy += `
                    <div class="contact p-2 rounded-3 d-flex align-items-center">
                                <div id="userImage" class="avatar rounded-3 position-relative  flex-shrink-0 me-3" style="background-image: ${allContacts[index].gradient}">
                               <img src="${allContacts[index].image ? 'images/' + allContacts[index].image : ''}" class="w-100 ${hideImage} rounded-3" alt="user">
                               <p class="mb-0 ${hideLetter} ">${calcFSletters(index)}</p>
                           </div>
                        <div class="desc text-start">
                            <p class="h7 fw-bold mb-0">${allContacts[index].name}</p>
                            <p class="mb-0 fs-8 text-muted">${allContacts[index].phone}</p>
                        </div>
                        <span  class="rounded-3 ratio-1x1 d-flex justify-content-center align-items-center action-icon2 fav-icon ms-auto"><a href="tel:${allContacts[index].phone}"><i class="fa-solid fa-phone mail"></i></a></span>
                    </div>
            `
        }

    }
    if (emynumbers === 0) {
        emyContacts.innerHTML = '<p class="text-muted m-0">No emergency Contacts</p>';
    }else{

       emyContacts.innerHTML = emy;
       
    }
    numOfEmy = emynumbers;
    localStorage.setItem("numberOfEmyContacts",numOfEmy)

}

function toggleFav(i){
    allContacts[i].favorite = !allContacts[i].favorite ;
    display();
    localStorage.setItem("contactsList", JSON.stringify(allContacts) )
}
function toggleEmy(i){
    allContacts[i].emergency = !allContacts[i].emergency ;
    display();
    localStorage.setItem("contactsList", JSON.stringify(allContacts) )
}


function upDataToForm(index){
    if (!allContacts[index].image) {
        hideImage = "d-none"
        hideLetter = " "

   }else{
         hideImage = " "
         hideLetter = "d-none"
   }
    contactImage.innerHTML = `
                    <img src="${allContacts[index].image ? 'images/' + allContacts[index].image : ''}" class="w-100 ${hideImage} rounded-circle" alt="">
                    <p class="mb-0 ${hideLetter} text-white h2 ">${calcFSletters(index)}</p>
    `
    globalIndex = index;
    submetAdd.classList.add('d-none');
    updateBtn.classList.remove('d-none');

    formInputs.classList.remove("d-none");

    nameInput.value = allContacts[index].name ;
    phoneNumberInput.value = allContacts[index].phone ;
    emailInput.value = allContacts[index].email ;
    addressInput.value = allContacts[index].address ;
    emergency.checked = allContacts[index].emergency ;
    favorite.checked = allContacts[index].favorite ;
    note.value = allContacts[index].note ;
    group.value = allContacts[index].group ;

}

updateBtn.addEventListener('click',function(){
    var updatedContact = getDataFromTheForm();
    
  if (validationInputs(nameInput,"nameAlert") && validationInputs(emailInput,"emailAlert") && validationInputs(phoneNumberInput,"phoneAlert") && checkDuplicate(phoneNumberInput.value,globalIndex) === -1) {
    
 
    
    if (!contactImageInput.files[0]) {
        updatedContact.image = allContacts[globalIndex].image;
    }
    allContacts.splice(globalIndex,1,updatedContact);
    localStorage.setItem("contactsList", JSON.stringify(allContacts) )
    formInputs.classList.add("d-none");
    clearInputs();
    display();
    updateBtn.classList.add("d-none")
    submetAdd.classList.remove("d-none")
    nameInput.classList.remove("is-valid");
    phoneNumberInput.classList.remove("is-valid");
    emailInput.classList.remove("is-valid");
    Swal.fire({
        title: "Updated Successfully",
        text: "The contact has been updated.",
        icon: "success",
        confirmButtonText: "OK"
      });
  }else if(!validationInputs(nameInput,"nameAlert")){
    Swal.fire({
        icon: "error",
        title: "Invalid Name",
        text: "Please enter a valid name (letters & spaces only, 2–50 characters).",
    });
  }else if(!validationInputs(phoneNumberInput,"phoneAlert")){
      Swal.fire({
          icon: "error",
          title: "Invalid Phone Number",
          text: "Please enter a valid Egyptian phone number (e.g., 01018971244 or +201018971244)",
      });
    }else if (!validationInputs(emailInput,"emailAlert")){
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email format.",
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Duplicate Phone Number",
            text: `A contact with this phone number already exists: ${allContacts[checkDuplicate(phoneNumberInput.value,-1)].name}`,
        });
  }
      

})

function deleteContact(i){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            allContacts.splice(i,1);
            localStorage.setItem("contactsList", JSON.stringify(allContacts) );
            Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
        display();
        }
      });
}  

searchInput.addEventListener('input',function (){
    var mathcedList=[]
    for (let index = 0; index < allContacts.length; index++) {
        if (allContacts[index].name.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()) || searchInput.value === " "  || allContacts[index].email.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()) || allContacts[index].phone.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())) {
            
            mathcedList.push(allContacts[index])
           
        }
        
    }
    console.log(mathcedList);
    
    allContactsCards.innerHTML = createCards(mathcedList);
}) 



function validationInputs(element , msgId){

    var term = element.value;    

    var regex = {
    nameInput : /^[A-Za-z ]{2,50}$/,
    phoneNumberInput : /^(\+?2)?(\+?20)?01[1250]{1}\d{8}$/,
    emailInput : /^[A-Za-z0-9._%+-]{3,30}@[A-Za-z0-9.-]{3,20}\.[A-Za-z]{2,10}$/,
    }

    if(regex[element.id].test(term)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        document.getElementById(msgId).classList.add("d-none");
        return true
    }else{
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        document.getElementById(msgId).classList.remove("d-none");
        return false
    }


      
        

}

function checkDuplicate(number,indextoignor){
 
   for (let index = 0; index < allContacts.length; index++) {
    if ( index !== indextoignor && allContacts[index].phone === number) {
        return index;
    }
    
   }
   return -1;
}






const gradientColors = [
    ["#ff9800", "#ffaa2c"],
    ["#642fde", "#3900bf"],
    ["#ee058d", "#ee058d"],
    ["#7501c2", "#a73cee"],
];


function randomGradient() {
    let g = gradientColors[Math.floor(Math.random() * gradientColors.length)];
    return `linear-gradient(135deg, ${g[0]}, ${g[1]})`;
}
