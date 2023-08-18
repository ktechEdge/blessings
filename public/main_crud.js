var video_data;
function hideForms(){
    document.getElementById("AddForm").style.display="none";
    document.getElementById("EditForm").style.display="none";
}
async function fetchTable() {
    let response = await fetch('/managed_video/List');
    // console.log("response=",response);
    let data = await response.json();
    console.log("data=",data);
    video_data=[];

    let str="";
    for(let line of data){
        video_data[line.id]=line;
        str+="<tr>";
        str+=`<td><button onclick='showEditForm(${line.id});'>edit</button></td>`;
        str+=`<td>${line.name}</td>`;
        str+=`<td><button onclick='deleteVideo(${line.id});'>delete</button></td>`;
        str+="</tr>";
    }
    document.getElementById("mainTable").innerHTML=str;
    hideForms();
}
function showAddForm(){
    hideForms();
    document.getElementById("AddForm").style.display="block";
}
function showEditForm(id){
    hideForms();
    document.getElementById("ed_vid_id").value=id;
    document.getElementById("ed_vid_name").value=video_data[id].name;
    let str=video_data[id].abstract;
    // console.log("str=",str);
    str=str.replace(/<br\s*\/?>/mg,"\n");
    // console.log("str(2)=",str);
    document.getElementById("ed_vid_desc").innerHTML=str;
    document.getElementById("EditForm").style.display="block";
}
async function sendVideo() {
    let input=document.getElementById("vid_path");
    var data = new FormData();
    data.append('video', input.files[0]);
    data.append('name', document.getElementById("vid_name").value);
    data.append('abstract', document.getElementById("vid_desc").value);
    let response = await fetch('/managed_video/Add', {
            method: 'POST',
            body: data
        }
    );
    // let res = await response.json();
    let R = await response.json();
    //console.log(response);
    fetchTable();
}
async function editVideoTextData() {
    let id=document.getElementById("ed_vid_id").value;
    let name=document.getElementById("ed_vid_name").value;
    let abstract=document.getElementById("ed_vid_desc").value;
    let response = await fetch('/managed_video/Edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({NAME: name, ABSTEACT: abstract, ID: id})
        }
    );
    let data = await response.json();
    // console.log(response);
    fetchTable();
}
async function deleteVideo(id) {
    let response = await fetch('/managed_video/Delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ID: id})
        }
    );
    let data = await response.json();
    console.log(response);
    fetchTable();
}

fetchTable();