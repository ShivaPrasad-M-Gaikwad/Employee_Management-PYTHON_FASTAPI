function Select(class_or_id) {
  return document.querySelector(class_or_id);
}
function Selectmany(class_or_id) {
  return document.querySelectorAll(class_or_id);
}
let defaulturl = "http://127.0.0.1:8000/api/";
// let defaulturl = 'https://8jm9zbxb-8000.inc1.devtunnels.ms/api/'
let geturl = defaulturl + "getdata/";
let Posturl = defaulturl + "createdata/";
let Updateurl = defaulturl + "updatedata/";
let Deleteurl = defaulturl + "deletedata/";

//TODO: add Update
// ------------------DisplayData and Delete------------------

let Submitbtn = Select(".Submitbtn");
let Inputvalue = Select(".getuserdetailbyid");
let Showdataonscreen = Select(".DisplayData");

// SUBMIT BTN
Submitbtn.addEventListener("click", async () => {
  let FetchedData = await fetch(geturl + Inputvalue.value);
  let ConvertedJSON = await FetchedData.json();
  Showdataonscreen.innerHTML = "";

  const { id, Error } = ConvertedJSON;
  if (id === undefined) {
    Showdataonscreen.classList.remove("hidden");
    Showdataonscreen.textContent = Error;
  }

  //MAPS THE JSON
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
      "p-0.5"
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
        else alert("Something Went Wrong Data did not Deleted successfully :(");
      } else {
        alert("Transaction CANCLED");
      }
    });

    //CREATES A UPDATE BUTTON
    const updateButton = document.createElement("a");
    updateButton.classList.add(
      "Update",
      "bg-yellow-500",
      "rounded-md",
      "text-2xl",
      "w-fit",
      "p-2",
      "hover:bg-yellow-900"
    );
    updateButton.textContent = "Update";
    updateButton.setAttribute("data-updateid", item.id);
    //UPDATE
    updateButton.addEventListener("click", async () => {
      const upid = Select(".idupdate");
      let Uname = Select(".inputupdatename");
      let Ujob = Select(".inputupdatejob");
      let Usalary = Select(".inputpudatesalary");
      let UpdateFetchedData = await fetch(
        geturl + updateButton.dataset.updateid
      );
      let UpdateConvertedJSON = await UpdateFetchedData.json();
      upid.textContent = `ID : ${updateButton.dataset.updateid} `;
      const { Names, job, salary } = UpdateConvertedJSON[0];
      Uname.value = Names;
      Ujob.value = job;
      Usalary.value = salary;
      updateButton.setAttribute("href", "#Update");
      upid.setAttribute("data-idtoupdate", updateButton.dataset.updateid);
    });

    Showdataonscreen.classList.remove("hidden");
    div.textContent = `ID = ${item.id} : ${item.Names} Working as ${item.job} with salary of ${item.salary}`;
    div.append(updateButton);
    div.append(deleteButton);
    return div;
  });
  Showdataonscreen.append(...mappedData);
});
// ------------------Create------------------

let createpage = Select(".CreateaddupdateBTN");

createpage.addEventListener("click", async () => {
  let name = Select(".inputname").value;
  let job = Select(".inputjob").value;
  let salary = Select(".inputsalary").value;

  // alert(name+"--"+job+"--"+salary)

  let postquery = `?Names=${name}&job=${job}&salary=${salary}`;
  // alert(Posturl+postquery)
  let sub = await fetch(Posturl + postquery, { method: "PUT" });
  if (sub.ok) alert("Data Inserted successfully :)");
  else alert("Something Went Wrong Data did not Inserted successfully :(");
});

// ------------------Update------------------

let Updatepage = Select(".CreateupdateBTN");

Updatepage.addEventListener("click", async () => {
  let upid = Select(".idupdate");

  let idlb = upid.dataset.idtoupdate;
  let name = Select(".inputupdatename").value;
  let job = Select(".inputupdatejob").value;
  let salary = Select(".inputpudatesalary").value;

  // alert(name+"--"+job+"--"+salary)

  let putquery = `${idlb}?Names=${name}&job=${job}&salary=${salary}`;
  // alert(Updateurl+putquery)
  let sub = await fetch(Updateurl + putquery, { method: "PUT" });
  if (sub.ok) {
    alert("Data Updated successfully :)");
    upid.textContent = "";
    Select(".inputupdatename").value = "";
    Select(".inputupdatejob").value = "";
    Select(".inputpudatesalary").value = "";
  } else alert("Something Went Wrong Data did not Updated successfully :(");
});
