function Select(class_or_id) {
  return document.querySelector(class_or_id);
}
function Selectmany(class_or_id) {
  return document.querySelectorAll(class_or_id);
}

let baseurl = "http://127.0.0.1:8000/api/"
let geturl = baseurl + "getdata/";
let Posturl = baseurl + "createdata/";
let Updateurl = baseurl + "updatedata/";
let Deleteurl = baseurl + "deletedata/";

//TODO: add Update
// ------------------DisplayData and Delete------------------

let Submitbtn = Select(".Submitbtn");
let Inputvalue = Select(".getuserdetailbyid");
// let Showdataonscreen = Select(".DisplayData-inner");
let Showdataonscreen = Select(".DisplayData");

// SUBMIT BTN
Submitbtn.addEventListener("click", async () => {
  Showdataonscreen.innerHTML = "";

  let FetchedData = await fetch(geturl + Inputvalue.value);
  let ConvertedJSON = await FetchedData.json();

  //CHECKS THE CONDITION
  if (Inputvalue.value === "all") {
    Showdataonscreen.classList.add("h-[90%]");

    //MAPS THE JSON DATA
    const mappedData = ConvertedJSON.map((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "Virtual-Div",
        "py-5",
        "hover:bg-gray-700",
        "border-t",
        "flex",
        "m-2",
        "justify-between"
      );

      //CREATES A DELETE BUTTON
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "delete",
        "bg-red-500",
        "rounded-md",
        "text-2xl",
        "w-fit",
        "p-2",
        "hover:bg-red-900",
        "p-0.5",
        bg
      );

      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("data-id", item.id);

      //DELETE BUTTON EVENT
      deleteButton.addEventListener("click", async () => {
        if (
          confirm(
            `Are you Sure You want to delete Record of ID :${deleteButton.dataset.id}?`
          ) == true
        ) {
          let retid = deleteButton.dataset.id;
          let APIdelete = await fetch(Deleteurl + retid, { method: "DELETE" });
          if (APIdelete.ok) alert("Data Deleted successfully :)");
          else
            alert("Something Went Wrong Data did not Deleted successfully :(");
        } else {
          alert("Transaction CANCLED");
        }
      });

      Showdataonscreen.classList.remove("hidden");
      div.textContent = `ID = ${item.id} : ${item.Names} Working as ${item.job} with salary of ${item.salary}`;
      div.append(deleteButton);
      return div;
    });
    Showdataonscreen.append(...mappedData);
  }
  // Displays Single data using Specfiv ID
  else {
    //CLEARS THE GARBAGE OR ANY DATA RESIDING ON THE OUTER-DIV
    Showdataonscreen.innerHTML = "";
    const { id, Names, job, salary, Error } = ConvertedJSON;
    if (id === undefined) {
      obj = Error;
      Showdataonscreen.classList.remove("hidden");
      Showdataonscreen.textContent = obj;
    } else {
      Showdataonscreen.classList.remove("h-[90%]");
      Showdataonscreen.classList.remove("hidden");

      Showdataonscreen.classList.add("h-[20%]");
      obj = `ID = ${id} : ${Names} Working as ${job} with salary of ${salary}`;
      //CREATES A DELETE BUTTON
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "delete",
        "bg-red-500",
        "rounded-md",
        "text-2xl",
        "w-fit",
        "p-2",
        "hover:bg-red-900"
      );
      deleteButton.textContent = "Delete";
      //SETS THE ID OF THE DATA
      deleteButton.setAttribute("data-id", id);
      Showdataonscreen.textContent = obj;
      //APPENDS THE DELETE BUTTON
      Showdataonscreen.append(deleteButton);
      //DELETE BUTTON EVENT
      deleteButton.addEventListener("click", async () => {
        if (
          confirm(
            `Are you Sure You want to delete Record of ID :${deleteButton.dataset.id}?`
          ) == true
        ) {
          let retid = deleteButton.dataset.id;
          let APIdelete = await fetch(Deleteurl + retid, { method: "DELETE" });
          if (APIdelete.ok) alert("Data Deleted successfully :)");
          else
            alert("Something Went Wrong Data did not Deleted successfully :(");
        } else {
          alert("Transaction CANCLED");
        }
      });
    }
  }
});

// ------------------Create------------------

let createpage = Select(".CreateSubmitbtn");

createpage.addEventListener("click", async () => {
  let name = Select(".inputname").value;
  let job = Select(".inputjob").value;
  let salary = Select(".inputsalary").value;

  // alert(name+"--"+job+"--"+salary)

  let postquery = `?Names=${name}&job=${job}&salary=${salary}`;
  // alert(Posturl+postquery)
  let sub = await fetch(Posturl + postquery, { method: "POST" });
  if (sub.ok) alert("Data Inserted successfully :)");
  else alert("Something Went Wrong Data did not Inserted successfully :(");
});
