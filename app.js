const input_feild = document.querySelector('.input-feild');
const inputName = document.querySelector('#name');
const age = document.querySelector('#age');
const pan = document.querySelector('#pan');
const qualification = document.querySelector('#qualification');
const sort = document.querySelector("#sort");
const sortBtn = document.querySelector(".sortBtn");
const tableBody = document.querySelector('tbody');
const error = document.querySelector('.error');
let count = 0;
// let details = [];


/**----------------Local storage---------- */
let mainArray = JSON.parse(localStorage.getItem('detailsOfCandidate'));
if (!mainArray) {
    mainArray = [];
}else {
    dataRetrive();
}


function dataRetrive(){
    mainArray.map((obj)=>{
        createInfo(obj)
    })
}

/**------------Adding EventListener---------------- */
input_feild.addEventListener('submit',(e)=>{
    e.preventDefault();
    addDetail();
});

/**----------------Reset Form-------- */
function resetForm(){
    inputName.value =""
    age.value = ""
    pan.value = ""
    qualification.value = ""

}


function createInfo(todo){
    tableBody.innerHTML += `<tr>
<td>${todo.Name}</td>
<td>${todo.Age}</td>
<td>${todo.Pan}</td>
<td>${todo.Qualification}</td>
<td> <button class="delete btn">Delete</button>
 </td>
                           
</tr>`
}

/**----------------Deleteing-------------- */
tableBody.addEventListener("click",(e)=>{
    if (e.target.classList.contains("delete")){
        deleteItems(e);
    }
});


function deleteItems(e) {
    mainArray.forEach((ele,ind)=>{
        if(ele.id == parseInt(e.path[2].id)) {
            mainArray.splice(ind, 1);
        }
    });
    e.path[2].remove();

    localStorage.setItem("detailsOfCandidate", JSON.stringify(mainArray));
}


/**------------------Creating Function for adding details to table--------------------------- */
function addDetail(e){
if(inputName.value=='' ||  age.value=='' || pan.value=='' || qualification.value==''){
error.innerText = "Please Fill Full Details";
error.classList.add("error");
setTimeout(()=>{
    error.innerText="";
},1000);
return;
}else{
    const todo = {
        id: count++,
        Name: inputName.value,
        Age: age.value,
        Pan: pan.value,
        Qualification: qualification.value

    }
    createInfo(todo);
    mainArray.push(todo);
    localStorage.setItem("detailsOfCandidate", JSON.stringify(mainArray));
}

resetForm()
}

/**-------------fuction for sorting by name */
sort.addEventListener("change", (e) => {
    if (e.target.value == "inc") {
      tableBody.innerHTML = "";
      mainArray.sort(function (a, b) {
        if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
          return -1;
        }
        if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
  
      dataRetrive();
      // console.log('yes')
    }

    
  if (e.target.value == "dec") {
    tableBody.innerHTML = "";
    mainArray.sort(function (a, b) {
      if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
        return 1;
      }
      if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    dataRetrive();
    //  console.log("no")
  }
})


/**=================================search pan======= */

search.addEventListener("input", () => {
    searchPan();
  });
  
  function searchPan(e) {
    tableBody.innerHTML = "";
  
    let searchValue = search.value;
    // console.log(searchValue);
  
    let result = mainArray.filter((val) => {
      if (val.Pan.includes(searchValue)) {
        return val;
      }
    });
    if (result.length != 0) {
      result.map((val) => {
        createInfo(val);
      });
    } else {
      let val = (error.innerHTML = "No Data Found");
      setTimeout(() => {
        error.innerHTML = "";
      }, 1000);
    }
  }  