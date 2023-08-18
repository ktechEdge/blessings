var video = document.getElementsByTagName("video")[0];
//  vidSrc = document.getElementById("videoSrc"),
// index = 0;

showData().then((item)=>{
  let index = 0;

  function pleyVideo(){
    index = (index + 1) % item.length;
    video.src = item[index]['path'];
    video.play();
  }

  video.addEventListener("ended", pleyVideo);
 /* for(let V of item){
    video.addEventListener("ended",async function () {
      video.src = V['path'];
      await video.play();
    //  if (index == (item.length - 1)) index = 0;
    });
  }*/
  video.src = item[index]['path'];
  video.play();
});



 /* video.addEventListener("ended", function () {
  index++;
  console.log(index);
  video.play();
  if (index == (srcArr.length - 1)) index = 0;
  video.src = srcArr[index];
});*/


async function showData(){
  let res = await fetch('/managed_video/List');
  let data = await res.json();
  return data;
}